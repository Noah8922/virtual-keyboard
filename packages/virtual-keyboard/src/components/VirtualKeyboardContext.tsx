import { assemble, disassemble } from "hangul-js";
import {
  createContext,
  PropsWithChildren,
  RefObject,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { CurrentLayoutType, getCurrentLayout } from "../const";
import {
  KeyboardKeyRawLayoutType,
  KeyboardLanguage,
  KeyboardFrameStyleType,
  CustomKeyboardComponentsType,
} from "../types";

type VirtualKeyboardContextType = {
  currentLayout: CurrentLayoutType;
  handleKeyPress: (key: string) => void;
  keyboardFrameStyle?: Partial<KeyboardFrameStyleType>;
};

const VirtualKeyboardContext = createContext<VirtualKeyboardContextType | null>(
  null
);

export const useKeyboardContext = () => {
  const context = useContext<VirtualKeyboardContextType | null>(
    VirtualKeyboardContext
  );
  if (context === null) {
    throw new Error(
      "useKeyboardContext must be used within a VirtualKeyboardProvider"
    );
  }
  return context;
};

export const VirtualKeyboardProvider = ({
  inputRef,
  onClikEnter,
  initialLanguage = "ko",
  keyboardFrameStyle,
  layout,
  components,
  children,
}: PropsWithChildren<{
  inputRef: RefObject<HTMLInputElement>;
  onClikEnter?: () => void;
  initialLanguage?: KeyboardLanguage;
  keyboardFrameStyle?: Partial<KeyboardFrameStyleType>;
  layout?: Record<KeyboardLanguage, KeyboardKeyRawLayoutType>;
  components?: CustomKeyboardComponentsType | undefined;
}>) => {
  const [lang, setLang] = useState<KeyboardLanguage>(initialLanguage);
  const [isShift, setIsShift] = useState(false);
  const cursorPositionRef = useRef<number>(0);

  const setFocusAndCursor = useCallback(
    (cursorPosition: number) => {
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
        }
      });
    },
    [inputRef]
  );

  const handleKeyPress = useCallback(
    (key: string) => {
      if (!inputRef.current) return;

      const inputEl = inputRef.current;
      const start = inputEl.selectionStart || 0;
      const end = inputEl.selectionEnd || 0;

      if (key === "{shift}") {
        setIsShift((prev) => !prev);
        setFocusAndCursor(start);
        return;
      }

      if (key === "{capslock}") {
        setIsShift((prev) => !prev);
        setFocusAndCursor(start);
        return;
      }

      if (key === "{lang}") {
        cursorPositionRef.current = start;
        inputEl.focus();
        setLang((prev) => (prev === "ko" ? "en" : "ko"));
        return;
      }

      if (key === "{enter}") {
        onClikEnter && onClikEnter();
        return;
      }

      if (key === "{bksp}") {
        const currentValue = inputEl.value;
        if (start === 0 && end === 0) return;

        let newValue: string;
        let newCursorPosition: number;

        if (start === end) {
          const isAtEnd = start === currentValue.length;

          if (isAtEnd) {
            const disassembled = disassemble(currentValue);
            if (disassembled.length === 0) return;
            const newDisassembled = disassembled.slice(0, -1);
            newValue = assemble(newDisassembled);
            newCursorPosition = newValue.length;
          } else {
            const beforeCursor = currentValue.slice(0, start);
            const afterCursor = currentValue.slice(start);
            const chars = Array.from(beforeCursor);
            if (chars.length === 0) return;
            chars.pop();
            newValue = chars.join("") + afterCursor;
            newCursorPosition = chars.length;
          }
        } else {
          newValue = currentValue.slice(0, start) + currentValue.slice(end);
          newCursorPosition = start;
        }

        inputEl.value = newValue;
        setFocusAndCursor(newCursorPosition);
        return;
      }

      if (key === "{space}") {
        const currentValue = inputEl.value;
        const newValue =
          currentValue.slice(0, start) + " " + currentValue.slice(end);
        inputEl.value = newValue;

        const newCursorPosition = start + 1;
        setFocusAndCursor(newCursorPosition);
        return;
      }

      const currentValue = inputEl.value;
      const beforeCursor = currentValue.slice(0, start);
      const afterCursor = currentValue.slice(end);
      const newValue = beforeCursor + key + afterCursor;

      const assembledValue = assemble(disassemble(newValue));
      inputEl.value = assembledValue;

      const assembledBefore = assemble(disassemble(beforeCursor + key));
      const newCursorPosition = assembledBefore.length;

      setFocusAndCursor(newCursorPosition);

      if (isShift && key !== "{shift}" && key !== "{capslock}") {
        setIsShift(false);
      }
    },
    [inputRef, isShift, onClikEnter, setFocusAndCursor]
  );

  return (
    <VirtualKeyboardContext.Provider
      value={{
        currentLayout: getCurrentLayout({
          lang,
          isShift,
          layout,
          components,
          handleKeyPress,
        }),
        handleKeyPress,
        keyboardFrameStyle,
      }}
    >
      {children}
    </VirtualKeyboardContext.Provider>
  );
};
