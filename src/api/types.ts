export type NetworkStatus = "idle" | "loading" | "success" | "fail";

export interface ValidationError {
  errors: Record<string, string[]>;
}

export function isValidationError(err: any): err is ValidationError {
  return typeof err === "object" && "errors" in err;
}
