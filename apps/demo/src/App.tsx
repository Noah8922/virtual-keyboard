import { VirtualKeyboard, ENTER_KEY } from "virtual-keyboard-noahko";
import { useRef, useState, type RefObject } from "react";

function BasicExample() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState("");

  return (
    <section className="example">
      <h2>기본 사용</h2>
      <p className="desc">
        자모를 누르면 한글로 조합되고, <b>한영</b> 키로 언어를 바꿉니다. 입력창 중간에
        커서를 두고 입력·삭제해도 됩니다.
      </p>
      <input ref={inputRef} placeholder="키보드를 눌러 입력해 보세요" />
      <div className="keyboard" style={{ height: 240 }}>
        <VirtualKeyboard
          inputRef={inputRef as RefObject<HTMLInputElement>}
          onClickEnter={() => setSubmitted(inputRef.current?.value ?? "")}
        />
      </div>
      <p className="result">
        확인 키로 제출한 값: <b>{submitted || "(아직 없음)"}</b>
      </p>
    </section>
  );
}

function CustomStyleExample() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="example">
      <h2>스타일·키 커스텀</h2>
      <p className="desc">
        <code>keyboardFrameStyle</code>로 프레임을, <code>components</code>로 특정 키(여기서는
        확인 키)를 직접 그립니다. 영문 자판으로 시작합니다.
      </p>
      <input ref={inputRef} placeholder="Type here" />
      <div className="keyboard" style={{ height: 240 }}>
        <VirtualKeyboard
          inputRef={inputRef as RefObject<HTMLInputElement>}
          initialLanguage="en"
          keyboardFrameStyle={{
            backgroundColor: "#1f2937",
            borderRadius: "0.75rem",
            padding: "0.75rem",
          }}
          components={({ key, onClick }) =>
            key === ENTER_KEY ? (
              <button key={key} className="enter-key" onPointerDown={onClick}>
                완료
              </button>
            ) : undefined
          }
        />
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main>
      <header>
        <h1>virtual-keyboard-noahko</h1>
        <p>
          키오스크·태블릿용 React 한글 가상 키보드 ·{" "}
          <a href="https://www.npmjs.com/package/virtual-keyboard-noahko">npm</a> ·{" "}
          <a href="https://github.com/Noah8922/virtual-keyboard">GitHub</a>
        </p>
      </header>
      <BasicExample />
      <CustomStyleExample />
    </main>
  );
}
