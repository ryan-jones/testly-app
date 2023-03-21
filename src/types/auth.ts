import { UserType } from './user';

export interface IAuthContext {
  user: UserType;
  signUp: (email: string, password: string, username: string) => void;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignupFormValues extends LoginFormValues {
  username: string;
}
