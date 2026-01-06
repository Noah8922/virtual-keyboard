import { PropsWithChildren } from "react";
import { useKeyboardContext } from "./VirtualKeyboardContext";
import { KeyboardFrameStyleType } from "../types";

export const VirtualKeyboardFrame = ({ children }: PropsWithChildren<{}>) => {
  const { keyboardFrameStyle } = useKeyboardContext();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: keyboardFrameStyle?.width ?? DEFAULT_KEYBOARD_FRAME_STYLE.width,
        height:
          keyboardFrameStyle?.height ?? DEFAULT_KEYBOARD_FRAME_STYLE.height,
        borderRadius:
          keyboardFrameStyle?.borderRadius ??
          DEFAULT_KEYBOARD_FRAME_STYLE.borderRadius,
        backgroundColor:
          keyboardFrameStyle?.backgroundColor ??
          DEFAULT_KEYBOARD_FRAME_STYLE.backgroundColor,
        padding:
          keyboardFrameStyle?.padding ?? DEFAULT_KEYBOARD_FRAME_STYLE.padding,
        gap: keyboardFrameStyle?.rowGap ?? DEFAULT_KEYBOARD_FRAME_STYLE.rowGap,
      }}
    >
      {children}
    </div>
  );
};

const DEFAULT_KEYBOARD_FRAME_STYLE: KeyboardFrameStyleType = {
  width: "100%",
  height: "100%",
  backgroundColor: "#ececec",
  padding: "0.5rem",
  borderRadius: "0.375rem",
  rowGap: "0.25rem",
};
