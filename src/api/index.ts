import { Article } from "app/models/Article";
import { User } from "app/models/User";
import axios, { AxiosError } from "axios";
import { isValidationError, ValidationError } from "./types";
// TODO: Refactor to global api with modules
axios.defaults.baseURL = "https://conduit.productionready.io/api";

export type UserWithToken = { user: User & { token: string } };

export type AuthResult = User | ValidationError;

export const getCurrent = async (): Promise<AuthResult> => {
  try {
    const response = await axios.get<UserWithToken>("/user");

    const { token, ...user } = response.data.user;

    return user;
  } catch (error: unknown) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 422 &&
      isValidationError(error.response.data)
    ) {
      return error.response.data;
    }

    throw new Error((error as Error).message);
  }
};

export const register = (user: {
  email: string;
  username: string;
  password: string;
}): Promise<AuthResult> =>
  axios
    .post<UserWithToken>("/users", { user })
    .then((response) => {
      const { token, ...user } = response.data.user;

      if (token) {
        localStorage.setItem("token", token);
        setToken(token);
      }

      return user;
    })
    .catch((error: AxiosError<ValidationError>) => {
      if (error.response?.status === 422) {
        return error.response.data;
      }

      throw new Error(error.message);
    });

export const login = async (user: {
  email: string;
  password: string;
}): Promise<AuthResult> => {
  try {
    const response = await axios.post<UserWithToken>("/users/login", { user });
    const { token, ...userData } = response.data.user;

    if (token) {
      localStorage.setItem("token", token);
      setToken(token);
    }

    return userData;
  } catch (error: unknown) {
    if (
      axios.isAxiosError(error) &&
      isValidationError(error.response?.data) &&
      error.response?.status === 422
    ) {
      return error.response.data;
    }

    throw new Error((error as Error).message);
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  removeToken();
};

export const setToken = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Token ${token}`;
};
export const removeToken = () => {
  delete axios.defaults.headers.common["Authorization"];
};

export const fetchArticles = async (params: {
  limit: number;
  offset: number;
  tag?: string;
  author?: string;
  favorited?: string;
}) => {
  try {
    const response = await axios.get<{
      articles: Article[];
      articlesCount: number;
    }>("/articles", { params });
    return response.data;
  } catch (error: unknown) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 422 &&
      isValidationError(error.response?.data)
    ) {
      return error.response.data;
    }

    throw new Error((error as Error).message);
  }
};

const appApi = {
  login,
  logout,
  register,
  setToken,
  removeToken,
  getCurrent,
  fetchArticles,
};

export type AppAPI = typeof appApi;

export default appApi;
