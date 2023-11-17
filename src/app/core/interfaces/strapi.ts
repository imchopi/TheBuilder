export interface StrapiUser {
  id: number;
  username: string;
  email: string;
}

export interface StrapiLoginPayload {
  identifier: string;
  password: string;
}

export interface StrapiRegisterPayload {
  email: string;
  password: string;
  username: string;
}

export interface StrapiLoginResponse {
  jwt: string;
  user: StrapiUser;
}

export interface StrapiRegisterResponse {
  jwt: string;
  user: StrapiUser;
}

export interface StrapiExtendedUser {
  data: {
    users: number;
    builds?: number;
    name: string;
    surname: string;
  };
}
