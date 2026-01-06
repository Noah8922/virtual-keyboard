import { Fragment } from "react/jsx-runtime";
import { useKeyboardContext } from "./VirtualKeyboardContext";

export const VirtualKeyboardInnerKeys = () => {
  const { currentLayout, handleKeyPress, keyboardFrameStyle } =
    useKeyboardContext();

  return (
    <>
      {currentLayout.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            gap: keyboardFrameStyle?.rowGap ?? "0.25rem",
          }}
        >
          {row.map((key, keyIndex) => (
            <Fragment key={`${rowIndex}-${keyIndex}`}>
              {key.isCustomed ? (
                key.component
              ) : (
                <button
                  onPointerDown={() => handleKeyPress(key.key)}
                  style={key.style}
                >
                  {key.label}
                </button>
              )}
            </Fragment>
          ))}
        </div>
      ))}
    </>
  );
};
