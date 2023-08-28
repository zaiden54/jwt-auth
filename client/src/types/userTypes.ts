export type UserType = {
  id: number;
  name: string;
  isActivated: boolean;
};

export type UserFormType = {
  name?: string;
  email: string;
  password: string;
};

export type AuthUserType =
  | { status: 'fetching' }
  | { status: 'error' }
  | { status: 'success'; data: UserType };
