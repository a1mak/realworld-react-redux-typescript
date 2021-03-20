import { AsyncThunkPayloadCreator, createAsyncThunk } from "@reduxjs/toolkit";
import { AppAPI } from "api";
import { ValidationError } from "api/types";

export const createAppAsyncThunk = <Returned, Args>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<
    Returned,
    Args,
    { rejectValue: ValidationError; extra: AppAPI }
  >
) =>
  createAsyncThunk<
    Returned,
    Args,
    { rejectValue: ValidationError; extra: AppAPI }
  >(typePrefix, payloadCreator);
