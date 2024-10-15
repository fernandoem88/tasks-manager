import type { ChangeEvent } from "react";
import { Input, Root } from "./styled";
import { UiTypography } from "../Typography";

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
      {!!label && <UiTypography variant="body1">{label}</UiTypography>}
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
