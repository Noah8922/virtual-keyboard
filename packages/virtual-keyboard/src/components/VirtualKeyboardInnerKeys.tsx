import { getKeyLabel } from "../utils";
import { useKeyboardContext } from "./VirtualKeyboardContext";

export const VirtualKeyboardInnerKeys = () => {
  const { currentLayout, handleKeyPress, keyboardRowStyle } =
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
            gap: keyboardRowStyle?.gap ?? "0.25rem",
          }}
        >
          {row.map((key, keyIndex) => (
            <button
              key={`${rowIndex}-${keyIndex}`}
              onPointerDown={() => handleKeyPress(key.label)}
              style={key.style}
            >
              {getKeyLabel(key.label)}
            </button>
          ))}
        </div>
      ))}
    </>
  );
};
