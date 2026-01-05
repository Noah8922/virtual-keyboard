import { DeleteIcon } from "lucide-react";
import { ReactNode } from "react";

const basicKeyStyle: React.CSSProperties = {
  display: "flex",
  flex: "1",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: "0.5rem",
  paddingRight: "0.5rem",
  fontSize: "0.75rem",
  fontWeight: "normal",
  borderRadius: "0.25rem",
  transition: "all 0.15s ease-in-out",
  userSelect: "none",
  touchAction: "manipulation",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  border: "1px solid #d3d3d3",
  backgroundColor: "white",
  color: "#444",
  borderColor: "#d3d3d3",
};

const KEY_LABEL_MAP: Record<string, ReactNode> = {
  "{bksp}": <DeleteIcon style={{ width: "1rem", height: "1rem" }} />,
  "{tab}": "Tab",
  "{capslock}": "Caps",
  "{shift}": "Shift",
  "{enter}": "확인",
  "{space}": "",
  "{lang}": "한영",
};

export const getKeyLabel = (key: string): ReactNode => {
  return KEY_LABEL_MAP[key] ?? key;
};

const KEY_FLEX_MAP: Record<
  string,
  { label: ReactNode; style: React.CSSProperties }
> = {
  "{bksp}": {
    label: <DeleteIcon style={{ width: "1rem", height: "1rem" }} />,
    style: { flex: "3" },
  },
  "{tab}": { label: "Tab", style: { flex: "1.5" } },
  "{capslock}": { label: "Caps", style: { flex: "2.5" } },
  "{shift}": { label: "Shift", style: { flex: "2" } },
  "{enter}": { label: "확인", style: { flex: "3" } },
  "{space}": { label: "", style: { flex: "7" } },
  "{lang}": { label: "한영", style: { flex: "1" } },
};

export { basicKeyStyle, KEY_FLEX_MAP };
