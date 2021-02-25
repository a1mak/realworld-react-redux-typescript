import { Dispatch } from "react";

export const withValue = <T = string>(d: Dispatch<T>) => (event: {
  target: { value: T };
}) => d(event.target.value);
