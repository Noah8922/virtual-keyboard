import { RefObject } from "react";
import {
  CustomKeyStylesType,
  KeyboardKeyRawLayoutType,
  KeyboardLanguage,
  KeyboardLayoutType,
  KeyboardStyleType,
} from "../types";
import { VirtualKeyboardProvider } from "./VirtualKeyboardContext";
import { VirtualKeyboardFrame } from "./VirtualKeyboardFrame";
import { VirtualKeyboardInnerKeys } from "./VirtualKeyboardInnerKeys";

export const VirtualKeyboard = ({
  inputRef,

  // 기능 CUSTOM
  onClikEnter,

  // 언어 선택
  initialLanguage,

  // style custom
  keyboardFrameStyle,
  keyboardRowStyle,
  customKeyboardKeyStyles,
  customKeyboardLayout,
}: {
  inputRef: RefObject<HTMLInputElement>;
  onClikEnter?: () => void;
  initialLanguage?: KeyboardLanguage;
  keyboardFrameStyle?: Partial<KeyboardStyleType>;
  keyboardRowStyle?: Partial<{
    gap: React.CSSProperties["gap"];
  }>;
  customKeyboardKeyStyles?: CustomKeyStylesType;
  customKeyboardLayout?: Record<KeyboardLanguage, KeyboardKeyRawLayoutType>;
}) => {
  return (
    <VirtualKeyboardProvider
      inputRef={inputRef}
      onClikEnter={onClikEnter}
      initialLanguage={initialLanguage}
      keyboardFrameStyle={keyboardFrameStyle}
      keyboardRowStyle={keyboardRowStyle}
      customKeyboardKeyStyles={customKeyboardKeyStyles}
      customKeyboardLayout={customKeyboardLayout}
    >
      <VirtualKeyboardFrame>
        <VirtualKeyboardInnerKeys />
      </VirtualKeyboardFrame>
    </VirtualKeyboardProvider>
  );
};
