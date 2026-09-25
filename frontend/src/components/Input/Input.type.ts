import { HTMLInputTypeAttribute } from "react";
import { IconType } from "react-icons";

type InputProps = {
  minLength?: number | undefined;
  maxLength?: number | undefined;
  disabled?: boolean | undefined;
  type?: HTMLInputTypeAttribute | undefined;
  name?: string | undefined;
  value?: string | undefined;
  onClick?: React.MouseEventHandler<HTMLInputElement> | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder?: string | undefined;
  labelText: string;
  Icon: IconType;
  error?: string | undefined;
};

export default InputProps;
