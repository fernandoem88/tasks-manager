import type { ChangeEvent } from "react";
import { Input, Root } from "./styled";

interface Props {
  type?: "text" | "number" | "date" | "password";
  label?: string;
  value?: string;
  onChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
}

export const UiTextField = ({ label, onChange, value, type }: Props) => {
  return (
    <Root>
      {label}
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value, e)}
      />
    </Root>
  );
};
