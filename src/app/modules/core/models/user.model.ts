/* eslint-disable prettier/prettier */
export interface UserLoginData {
  username: string;
  password: string;
}

export interface GetUsersResponse {
  id: number;
  email: string;
  username: string;
  password: string;
}

export type PostUserResponse = GetUsersResponse;

export type PostUser = Omit<GetUsersResponse, 'id'>;

export class User {
  constructor(public email: string, public username: string) {}
}
