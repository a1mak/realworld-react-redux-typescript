import { unwrapResult } from "@reduxjs/toolkit";
import { isValidationError } from "api/types";
import { AppDispatch } from "app/store";
import ErrorMessages from "components/ErrorMessages";
import TextField from "components/TextField";
import { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { withValue } from "utils/withValue";
import { login } from "../authSlice";

const SignInForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      unwrapResult(await dispatch(login({ email, password })));
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
      <h1 className="text-xs-center">Sign in</h1>
      <p className="text-xs-center">
        <NavLink to="/register">Or create an account</NavLink>
      </p>
      <ErrorMessages errors={fieldErrors} />
      <form onSubmit={submit}>
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
          Sign in
        </button>
      </form>
    </>
  );
};

export default SignInForm;
