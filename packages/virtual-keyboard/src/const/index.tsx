import {
  CustomKeyboardComponentsType,
  KeyboardKeyRawLayoutType,
  KeyboardLanguage,
} from "../types";
import { basicKeyStyle, getKeyLabel, KEY_FLEX_MAP } from "../utils";

export const ENTER_KEY = "{enter}";
export const SPACE_KEY = "{space}";
export const LANG_KEY = "{lang}";
export const BKSB_KEY = "{bksp}";
export const TAB_KEY = "{tab}";
export const CAPSLOCK_KEY = "{capslock}";
export const SHIFT_KEY = "{shift}";

const KOREAN_KEYS: KeyboardKeyRawLayoutType = {
  default: [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", BKSB_KEY],
    [
      TAB_KEY,
      "ㅂ",
      "ㅈ",
      "ㄷ",
      "ㄱ",
      "ㅅ",
      "ㅛ",
      "ㅕ",
      "ㅑ",
      "ㅐ",
      "ㅔ",
      "[",
      "]",
      "\\",
    ],
    [
      CAPSLOCK_KEY,
      "ㅁ",
      "ㄴ",
      "ㅇ",
      "ㄹ",
      "ㅎ",
      "ㅗ",
      "ㅓ",
      "ㅏ",
      "ㅣ",
      ";",
      "'",
      ENTER_KEY,
    ],
    [
      SHIFT_KEY,
      "ㅋ",
      "ㅌ",
      "ㅊ",
      "ㅍ",
      "ㅠ",
      "ㅜ",
      "ㅡ",
      ",",
      ".",
      "/",
      SHIFT_KEY,
    ],
    [SPACE_KEY, LANG_KEY],
  ],
  shift: [
    ["`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", BKSB_KEY],
    [
      TAB_KEY,
      "ㅃ",
      "ㅉ",
      "ㄸ",
      "ㄲ",
      "ㅆ",
      "ㅛ",
      "ㅕ",
      "ㅑ",
      "ㅒ",
      "ㅖ",
      "[",
      "]",
      "\\",
    ],
    [
      CAPSLOCK_KEY,
      "ㅁ",
      "ㄴ",
      "ㅇ",
      "ㄹ",
      "ㅎ",
      "ㅗ",
      "ㅓ",
      "ㅏ",
      "ㅣ",
      ":",
      '"',
      ENTER_KEY,
    ],
    [
      SHIFT_KEY,
      "ㅋ",
      "ㅌ",
      "ㅊ",
      "ㅍ",
      "ㅠ",
      "ㅜ",
      "ㅡ",
      "<",
      ">",
      "?",
      SHIFT_KEY,
    ],
    [SPACE_KEY, LANG_KEY],
  ],
};

const ENGLISH_KEYS: KeyboardKeyRawLayoutType = {
  default: [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", BKSB_KEY],
    [TAB_KEY, "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
    [
      CAPSLOCK_KEY,
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      ";",
      "'",
      ENTER_KEY,
    ],
    [SHIFT_KEY, "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", SHIFT_KEY],
    [SPACE_KEY, LANG_KEY],
  ],
  shift: [
    ["`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", BKSB_KEY],
    [TAB_KEY, "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    [
      CAPSLOCK_KEY,
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      ":",
      '"',
      ENTER_KEY,
    ],
    [SHIFT_KEY, "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", SHIFT_KEY],
    [SPACE_KEY, LANG_KEY],
  ],
};

export type CurrentLayoutType = (
  | { isCustomed: true; component: React.ReactNode }
  | {
      isCustomed: false;
      key: string;
      label: React.ReactNode;
      style: React.CSSProperties;
    }
)[][];

export const getCurrentLayout = ({
  lang,
  isShift,
  layout,
  components,
  handleKeyPress,
}: {
  lang: KeyboardLanguage;
  isShift: boolean;
  layout?: Record<KeyboardLanguage, KeyboardKeyRawLayoutType>;
  components?: CustomKeyboardComponentsType | undefined;
  handleKeyPress: (key: string) => void;
}): CurrentLayoutType => {
  const targetLayout = layout
    ? layout[lang][isShift ? "shift" : "default"]
    : lang === "ko"
      ? KOREAN_KEYS[isShift ? "shift" : "default"]
      : ENGLISH_KEYS[isShift ? "shift" : "default"];

  return targetLayout.map((row, rowIndex) =>
    row.map((key) => {
      if (components?.({ key, onClick: () => handleKeyPress(key) })) {
        return {
          isCustomed: true,
          component: components?.({
            key,
            onClick: () => handleKeyPress(key),
          }),
        };
      } else {
        return {
          isCustomed: false,
          key,
          label: getKeyLabel(key),
          style: {
            ...basicKeyStyle,
            ...KEY_FLEX_MAP[key]?.style,
          },
        };
      }
    })
  );
};

export const KoreanDefaultLayout = KOREAN_KEYS;
export const EnglishDefaultLayout = ENGLISH_KEYS;
