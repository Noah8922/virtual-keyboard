import { VirtualKeyboard } from "noah-virtual-keyboard";
import { useRef, type RefObject } from "react";
import "./App.css";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input ref={inputRef} />
      <VirtualKeyboard inputRef={inputRef as RefObject<HTMLInputElement>} />
    </>
  );
}

export default App;
