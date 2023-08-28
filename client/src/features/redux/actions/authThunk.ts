import { createAsyncThunk } from '@reduxjs/toolkit';
import { userCheckService } from '../../../services/userService';
import type { UserType } from '../../../types/userTypes';

const checkAuthThunk = createAsyncThunk<UserType>('user/checkUser', async () =>
  userCheckService()
    .then((data) => data)
    .catch((err) => Promise.reject(err)),
);

export default checkAuthThunk;
