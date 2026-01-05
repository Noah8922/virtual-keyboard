import {
  CustomKeyStylesType,
  KeyboardKeyRawLayoutType,
  KeyboardLanguage,
  KeyboardLayoutRowType,
} from "../types";
import { basicKeyStyle, KEY_FLEX_MAP } from "../utils";

const KOREAN_KEYS: KeyboardKeyRawLayoutType = {
  default: [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "{bksp}"],
    [
      "{tab}",
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
      "{capslock}",
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
      "{enter}",
    ],
    [
      "{shift}",
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
      "{shift}",
    ],
    ["{space}", "{lang}"],
  ],
  shift: [
    ["`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "{bksp}"],
    [
      "{tab}",
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
      "{capslock}",
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
      "{enter}",
    ],
    [
      "{shift}",
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
      "{shift}",
    ],
    ["{space}", "{lang}"],
  ],
};

const ENGLISH_KEYS: KeyboardKeyRawLayoutType = {
  default: [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "{bksp}"],
    ["{tab}", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
    [
      "{capslock}",
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
      "{enter}",
    ],
    ["{shift}", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "{shift}"],
    ["{space}", "{lang}"],
  ],
  shift: [
    ["`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "{bksp}"],
    ["{tab}", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    [
      "{capslock}",
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
      "{enter}",
    ],
    ["{shift}", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "{shift}"],
    ["{space}", "{lang}"],
  ],
};

export const getCurrentLayout = ({
  lang,
  isShift,
  customKeyboardKeyStyles,
  customKeyboardLayout,
}: {
  lang: KeyboardLanguage;
  isShift: boolean;
  customKeyboardKeyStyles?: CustomKeyStylesType;
  customKeyboardLayout?: Record<KeyboardLanguage, KeyboardKeyRawLayoutType>;
}): KeyboardLayoutRowType[][] => {
  const targetLayout = customKeyboardLayout
    ? customKeyboardLayout[lang][isShift ? "shift" : "default"]
    : lang === "ko"
      ? KOREAN_KEYS[isShift ? "shift" : "default"]
      : ENGLISH_KEYS[isShift ? "shift" : "default"];

  return targetLayout.map((row) =>
    row.map((key) => {
      if (
        customKeyboardKeyStyles &&
        customKeyboardKeyStyles.targetKey === key
      ) {
        return {
          label: key,
          style: customKeyboardKeyStyles.style,
        };
      } else {
        return {
          label: key,
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
