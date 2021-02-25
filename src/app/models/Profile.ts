import { User } from "./User";

export type Profile = Pick<User, "username" | "bio" | "image"> & {
  folowing: boolean;
};
