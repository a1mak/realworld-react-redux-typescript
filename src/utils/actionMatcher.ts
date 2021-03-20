import { AnyAction } from "@reduxjs/toolkit";
import { GenericAsyncThunk } from "app/store";

/**
 * TODO: Add type checking for specific thunk action
 * @param actionCreators 
 * @returns 
 */
export const asyncThunkActionMatcher = <Status extends "pending" | "fulfilled" | "rejected">(
  ...actionCreators: Array<
    GenericAsyncThunk[Status]
  >
) => (action: AnyAction): boolean =>
  actionCreators.map((ac) => ac.toString()).includes(action.type);
