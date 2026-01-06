export type KeyboardLanguage = "ko" | "en";

export type KeyboardFrameStyleType = {
  width: React.CSSProperties["width"];
  height: React.CSSProperties["height"];
  backgroundColor: React.CSSProperties["backgroundColor"];
  padding: React.CSSProperties["padding"];
  borderRadius: React.CSSProperties["borderRadius"];
  rowGap: React.CSSProperties["gap"];
};

type KeyboardKeyType = string[];

export type KeyboardKeyRawLayoutType = {
  default: KeyboardKeyType[];
  shift: KeyboardKeyType[];
};

export type KeyboardLayoutRowType = {
  component?: React.ReactNode;
  key: string;
  label: string;
  style?: React.CSSProperties;
};

export type KeyboardLayoutType = {
  default: KeyboardLayoutRowType[][];
  shift: KeyboardLayoutRowType[][];
};

export type CustomKeyboardComponentsType = (props: {
  key: string;
  onClick: () => void;
}) => React.ReactNode;
