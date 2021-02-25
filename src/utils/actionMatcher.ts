import { AnyAction } from "@reduxjs/toolkit";
import { GenericAsyncThunk } from "app/store";

export const actionMatcher = (
  ...actionCreators: Array<
    GenericAsyncThunk["pending" | "fulfilled" | "rejected"]
  >
) => (action: AnyAction): boolean =>
  actionCreators.map((ac) => ac.toString()).includes(action.type);
