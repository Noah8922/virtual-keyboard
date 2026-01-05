export type KeyboardLanguage = "ko" | "en";

export type KeyboardStyleType = {
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
  label: string;
  style: React.CSSProperties;
};

export type KeyboardLayoutType = {
  default: KeyboardLayoutRowType[][];
  shift: KeyboardLayoutRowType[][];
};

export const CommonKeyTypeArray = [
  "{bksp}",
  "{tab}",
  "{capslock}",
  "{shift}",
  "{enter}",
  "{space}",
  "{lang}",
] as const;
export type CommonKeyType = (typeof CommonKeyTypeArray)[number];

export type CustomKeyStylesType = {
  targetKey: string | CommonKeyType;
  style: React.CSSProperties;
};
