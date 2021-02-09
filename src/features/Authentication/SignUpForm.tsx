import React, { Dispatch, FC, useState } from "react";
import { NavLink } from "react-router-dom";

interface ISignUpFormProps {}

const SignUpForm: FC<ISignUpFormProps> = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const dispatch = useDispatch();
  const withValue = (d: Dispatch<string>) => (event: {
    target: { value: string };
  }) => d(event.target.value);

  return (
    <>
      <h1 className="text-xs-center">Sign up</h1>
      <p className="text-xs-center">
        <NavLink to="/login">Have an account?</NavLink>
      </p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          // dispatch(registerUser({ username, email, password }));
        }}
      >
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Your Name"
            value={username}
            onChange={withValue(setUsername)}
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Email"
            value={email}
            onChange={withValue(setEmail)}
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={withValue(setPassword)}
          />
        </fieldset>
        <button className="btn btn-lg btn-primary pull-xs-right">
          Sign up
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
