export enum NetworkStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  FAIL = "fail",
}

export interface ValidationError {
  status: 422;
  data: ErrorBody;
}

export interface ErrorBody {
  errors: Record<string, string[]>;
}

export function isValidationError(res: any): res is ValidationError {
  return typeof res === "object" && res.status === 422 && isErrorBody(res.data);
}

export function isErrorBody(err: any): err is ErrorBody {
  return typeof err === "object" && "errors" in err;
}
