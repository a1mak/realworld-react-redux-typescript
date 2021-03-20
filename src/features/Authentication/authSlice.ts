import {
  createAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
  SerializedError,
} from "@reduxjs/toolkit";
// import api from "api";
import { isValidationError, NetworkStatus } from "api/types";
import { User } from "app/models/User";
import { AppAsyncThunk, AppThunk, RootState } from "app/store";

/**
 * Authentication slice of Redux store
 */
type AuthState = {
  status: NetworkStatus;
  currentUser: User | null; // Null if visitor is not authenticated
  error?: SerializedError; // Any serializable error, basicaly a message
};

/**
 * Initial state of authentication slice
 */
const initialState: AuthState = {
  status: "idle",
  currentUser: null,
};

/**
 * Data for registration request
 */
type RegisterArgs = {
  email: string;
  username: string;
  password: string;
};

/**
 * Data for login request
 */
type LoginArgs = {
  email: string;
  password: string;
};

/**
 * Generic AsyncThunk for user response
 */
type UserAsyncThunk<Args = void> = AppAsyncThunk<User, Args>;

/**
 * User registration thunk
 * @returns {User | ValidationError}
 */
export const register: UserAsyncThunk<RegisterArgs> = createAsyncThunk(
  "authentication/register",
  async (data, { rejectWithValue, extra: { register } }) => {
    const result = await register(data);

    // If result is validation error then produce reject action with error body
    if (isValidationError(result)) {
      return rejectWithValue(result);
    }

    return result;
  }
);

/**
 * User login thunk
 * @returns {User | ValidationError}
 */
export const login: UserAsyncThunk<LoginArgs> = createAsyncThunk(
  "authentication/login",
  async (data, { rejectWithValue, extra: { login } }) => {
    const result = await login(data);

    // If api returns a validation error then reject action with error body
    if (isValidationError(result)) {
      return rejectWithValue(result);
    }

    return result;
  }
);

/**
 * Get current user thunk
 * @returns {User | ValidationError}
 */
export const current: UserAsyncThunk = createAsyncThunk(
  "authentication/getUser",
  async (_, { rejectWithValue, extra: { getCurrent } }) => {
    const result = await getCurrent();

    // If api returns a validation error then reject action with error body
    if (isValidationError(result)) {
      return rejectWithValue(result);
    }

    return result;
  }
);

/**
 * User logout thunk
 */
export const logout: AppThunk<void, ReturnType<typeof reset>> = () => (
  dispatch,
  _,
  { logout }
) => {
  logout();

  dispatch(reset());
};

/**
 * Reset slice state action
 */
const reset = createAction("authentication/logout");

/**
 * Configure Authentication slice
 */
const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reset, () => initialState)
      .addMatcher(
        isAnyOf(current.pending, register.pending, login.pending),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(current.fulfilled, register.fulfilled, login.fulfilled),
        (state, action) => {
          state.status = "success";
          state.currentUser = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(current.rejected, register.rejected, login.rejected),
        (state, action) => {
          state.status = "fail";
          state.error = action.error;
        }
      );
  },
});

/** Authentication selectors */
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectUserRequestStatus = (state: RootState) => state.auth.status;

export default authSlice.reducer;
