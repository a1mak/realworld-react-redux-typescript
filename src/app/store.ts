import {
  AnyAction,
  AsyncThunk,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import api, { AppAPI } from "api";
import { ValidationError } from "api/types";
import articlesReducer from "features/Articles/articlesSlice";
import authReducer from "features/Authentication/authSlice";

/**
 * Represents application store state
 */
export type RootState = ReturnType<typeof store.getState>;
/**
 * Combined application dispatch
 */
export type AppDispatch = typeof store.dispatch;

export type GenericAsyncThunk = AsyncThunk<any, any, any>;

/**
 * Application AsyncThunk with api extra argument and error type injected
 */
export type AppAsyncThunk<Returned, Args = void> = AsyncThunk<
  Returned,
  Args,
  { rejectValue: ValidationError; extra: AppAPI }
>;

/**
 * Application Thunk for executing synchronous side effects, like manipulating localStorage.
 */
export type AppThunk<Returned, Action extends AnyAction> = () => ThunkAction<
  Returned,
  RootState,
  AppAPI,
  Action
>;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articlesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Inject application api into thunk middleware config
      thunk: {
        extraArgument: api,
      },
    }),
});
