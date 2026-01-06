import { RefObject } from "react";
import {
  CustomKeyboardComponentsType,
  KeyboardFrameStyleType,
  KeyboardKeyRawLayoutType,
  KeyboardLanguage,
} from "../types";
import { VirtualKeyboardProvider } from "./VirtualKeyboardContext";
import { VirtualKeyboardFrame } from "./VirtualKeyboardFrame";
import { VirtualKeyboardInnerKeys } from "./VirtualKeyboardInnerKeys";

export const VirtualKeyboard = ({
  inputRef,
  onClikEnter,
  initialLanguage,
  keyboardFrameStyle,
  layout,
  components,
}: {
  inputRef: RefObject<HTMLInputElement>;
  onClikEnter?: () => void;
  initialLanguage?: KeyboardLanguage;
  keyboardFrameStyle?: Partial<KeyboardFrameStyleType>;
  layout?: Record<KeyboardLanguage, KeyboardKeyRawLayoutType>;
  components?: CustomKeyboardComponentsType | undefined;
}) => {
  return (
    <VirtualKeyboardProvider
      inputRef={inputRef}
      onClikEnter={onClikEnter}
      initialLanguage={initialLanguage}
      keyboardFrameStyle={keyboardFrameStyle}
      layout={layout}
      components={components}
    >
      <VirtualKeyboardFrame>
        <VirtualKeyboardInnerKeys />
      </VirtualKeyboardFrame>
    </VirtualKeyboardProvider>
  );
};
