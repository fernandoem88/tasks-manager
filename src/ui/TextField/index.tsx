import type { ChangeEvent } from "react";
import { Input, Root } from "./styled";

interface Props {
  placeholder?: string;
  isTextArea?: boolean;
  type?: "text" | "number" | "date" | "password";
  label?: string;
  value?: string;
  onChange?: (
    value: string,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const UiTextField = ({
  label,
  onChange,
  value,
  placeholder,
  type,
  isTextArea,
}: Props) => {
  return (
    <Root>
      {!!label && <span>{label}</span>}
      <Input
        isTextArea={isTextArea}
        placeholder={placeholder}
        as={isTextArea ? "textarea" : undefined}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value, e)}
      />
    </Root>
  );
};
