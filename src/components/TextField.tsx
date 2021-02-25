import { ChangeEvent, FC } from "react";

interface ITextFieldProps {
  type: "text" | "email" | "password";
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextField: FC<ITextFieldProps> = (props) => {
  return (
    <fieldset className="form-group">
      <input className="form-control form-control-lg" {...props} />
    </fieldset>
  );
};

export default TextField;
