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

export type VirtualKeyboardProps = {
  /** 키 입력을 받을 input 요소의 ref */
  inputRef: RefObject<HTMLInputElement>;
  /** 확인(Enter) 키를 눌렀을 때 호출 */
  onClickEnter?: () => void;
  /** @deprecated `onClickEnter`를 사용하세요. 1.x 호환을 위해 남겨 둔 prop입니다. */
  onClikEnter?: () => void;
  /** 처음 표시할 언어. 기본값은 `"ko"` */
  initialLanguage?: KeyboardLanguage;
  /** 키보드 바깥 프레임 스타일 */
  keyboardFrameStyle?: Partial<KeyboardFrameStyleType>;
  /** 한글·영문 자판 배열을 바꿀 때 사용 */
  layout?: Record<KeyboardLanguage, KeyboardKeyRawLayoutType>;
  /** 특정 키를 직접 렌더링할 때 사용. `undefined`를 반환하면 기본 키를 그림 */
  components?: CustomKeyboardComponentsType | undefined;
};

export const VirtualKeyboard = ({
  inputRef,
  onClickEnter,
  onClikEnter,
  initialLanguage,
  keyboardFrameStyle,
  layout,
  components,
}: VirtualKeyboardProps) => {
  return (
    <VirtualKeyboardProvider
      inputRef={inputRef}
      onClickEnter={onClickEnter ?? onClikEnter}
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
