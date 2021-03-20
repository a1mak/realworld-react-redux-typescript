import { ChangeEvent } from "react";

type TextFieldProps = {
  /**
   * Supports `text`, `email`, `password` input types
   * @type {("text" | "email" | "password")}
   */
  type: "text" | "email" | "password";
  placeholder: string;
  value: string;
  /**
   * Accepts only input change event object.
   * Accesses `event.target.value`
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const TextField: React.FC<TextFieldProps> = (props) => {
  return (
    <fieldset className="form-group">
      <input className="form-control form-control-lg" {...props} />
    </fieldset>
  );
};

export default TextField;
