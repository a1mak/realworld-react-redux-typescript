import { configureStore, ThunkAction, Action, AsyncThunk } from "@reduxjs/toolkit";
import authReducer from "features/Authentication/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type GenericAsyncThunk = AsyncThunk<any, any, any>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
