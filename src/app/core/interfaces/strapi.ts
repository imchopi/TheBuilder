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
    name: string;
    surname: string;
    build_info?: number;
  }
}

interface UserData {
  users: number;
  attributes: {
    name: string;
    surname: string;
  };
}

export interface ApiResponse {
  data: UserData[];
}