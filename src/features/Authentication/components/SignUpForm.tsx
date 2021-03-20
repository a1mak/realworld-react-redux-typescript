import { unwrapResult } from "@reduxjs/toolkit";
import { isValidationError } from "api/types";
import { AppDispatch } from "app/store";
import ErrorMessages from "components/ErrorMessages";
import TextField from "components/TextField";
import { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { withValue } from "utils/withValue";
import { register } from "../authSlice";
import { useHistory } from "react-router-dom";

const SignUpForm: FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      unwrapResult(await dispatch(register({ username, email, password })));
      history.push("/");
    } catch (err) {
      if (isValidationError(err)) {
        setFieldErrors(err.errors);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <>
      <h1 className="text-xs-center">Sign up</h1>
      <p className="text-xs-center">
        <NavLink to="/login">Have an account?</NavLink>
      </p>
      <ErrorMessages errors={fieldErrors} />
      <form onSubmit={submit}>
        <TextField
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={withValue(setUsername)}
        />
        <TextField
          type="email"
          placeholder="Email"
          value={email}
          onChange={withValue(setEmail)}
        />
        <TextField
          type="password"
          placeholder="Password"
          value={password}
          onChange={withValue(setPassword)}
        />
        <button className="btn btn-lg btn-primary pull-xs-right">
          Sign up
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
