import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { isValidationError, NetworkStatus } from "api/types";
import { User } from "app/models/User";
import { actionMatcher } from "../../utils/actionMatcher";
import { ErrorBody } from "api/types";
import { registerUser } from "api";

interface AuthState {
  status: NetworkStatus;
  currentUser: User | null;
  error?: SerializedError | ErrorBody;
}

const initialState: AuthState = {
  status: NetworkStatus.IDLE,
  currentUser: null,
};

// Extracting type from thunk creator functions
type LoginAsyncThunk = typeof login;
type RegisterAsyncThunk = typeof registerThunk;

// Extract type for "pending" actions of thunk creator
type UserPendingAction = ReturnType<
  RegisterAsyncThunk["pending"] | LoginAsyncThunk["pending"]
>;
// Extract type for "fulfilled" actions of thunk creator
type UserFulfilledAction = ReturnType<
  RegisterAsyncThunk["fulfilled"] | LoginAsyncThunk["fulfilled"]
>;
// Extract type for "rejected" actions of thunk creator
type UserRejectedAction = ReturnType<
  RegisterAsyncThunk["rejected"] | LoginAsyncThunk["rejected"]
>;

export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: ErrorBody }
>("authentication/login", async (user, { rejectWithValue }) => {
  const response = await fetch(
    "https://conduit.productionready.io/api/users/login",
    {
      body: JSON.stringify({ user }),
      method: "post",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (response.status === 422) {
    return rejectWithValue((await response.json()) as ErrorBody);
  }

  return (await response.json()) as User;
});

export const registerThunk = createAsyncThunk<
  User,
  { email: string; username: string; password: string },
  { rejectValue: ErrorBody }
>("authentication/register", async (user, { rejectWithValue }) => {
  try {
  const response = await registerUser(user);

  if (typeof response === "undefined")
    return rejectWithValue({ errors: { body: ["Error"] } });

  const data = response.data;

  if (isValidationError(data)) {
    return rejectWithValue(data.data);
  }
  
  return data;

  // } catch (error) {
  //   if (error.response?.status === 422) {
  //     return rejectWithValue(error.response.data as FormFieldError);
  //   }

  //   return rejectWithValue(error);
  // }
});

export const registerUserBase = createAsyncThunk<
  User,
  { email: string; username: string; password: string },
  { rejectValue: ErrorBody }
>("authentication/register", async (user, { rejectWithValue }) => {
  const response = await registerUser(user);

  if (typeof response === "undefined")
    return rejectWithValue({ errors: { body: ["Error"] } });

  const data = response.data;

  if (isValidationError(data)) {
    return rejectWithValue(data.data);
  }
  
  return data;
});

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher<UserPendingAction>(
        actionMatcher(login.pending, registerThunk.pending),
        (state) => {
          state.status = NetworkStatus.LOADING;
        }
      )
      .addMatcher<UserFulfilledAction>(
        actionMatcher(login.fulfilled, registerThunk.fulfilled),
        (state, action) => {
          state.status = NetworkStatus.SUCCESS;
          state.currentUser = action.payload;
        }
      )
      .addMatcher<UserRejectedAction>(
        actionMatcher(login.rejected, registerThunk.rejected),
        (state, action) => {
          state.status = NetworkStatus.FAIL;
          // if (action.payload) {
          //   state.error = action.payload.errors;
          // } else {
          state.error = action.error;
          // }
        }
      );
  },
});

export default authSlice.reducer;
