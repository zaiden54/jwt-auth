import type { UserFormType, UserType } from '../types/userTypes';
import apiService from './config';

export const userCheckService = (): Promise<UserType> =>
  apiService
    .get<UserType>('/auth/check')
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));

export const signUpService = (userData: UserFormType): Promise<UserType> =>
  apiService
    .post<UserType>('/auth/signup', userData)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));

export const signInService = (userData: UserFormType): Promise<UserType> =>
  apiService
    .post<UserType>('/auth/signin', userData)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));

export const logoutService = (): Promise<string> =>
  apiService
    .get('/auth/logout')
    .then(() => 'ok')
    .catch((err) => Promise.reject(err));
