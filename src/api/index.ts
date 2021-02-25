import { User } from "app/models/User";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ValidationError } from "./types";

axios.defaults.baseURL = "https://conduit.productionready.io/api";

export const registerUser = (user: {
  email: string;
  username: string;
  password: string;
}) =>
  axios
    .post<User>("/users", { user })
    .then((response: AxiosResponse<User>) => response)
    .catch(
      (error: AxiosError<ValidationError>) =>
        error.response as AxiosResponse<ValidationError>
    );

export const loginUser = (user: { email: string; password: string }) =>
  axios
    .post<User>("/users", { user })
    .then((response: AxiosResponse<User>) => response)
    .catch((error: AxiosError<ValidationError>) => {
      console.log(error.response);
      return error.response;
    });
