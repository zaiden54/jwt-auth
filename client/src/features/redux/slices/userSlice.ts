import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthUserType, UserType } from '../../../types/userTypes';
import checkAuthThunk from '../actions/authThunk';

const initialState = {
  status: 'fetching',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState as AuthUserType,
  reducers: {
    signAction(_, action: PayloadAction<UserType>) {
      return {
        status: 'success',
        data: action.payload,
      };
    },

    logoutErrorAction() {
      return {
        status: 'error',
      };
    },
  },

  extraReducers(builder) {
    builder.addCase(checkAuthThunk.fulfilled, (_, action) => ({
      status: 'success',
      data: action.payload,
    }));

    builder.addCase(checkAuthThunk.pending, () => ({
      status: 'fetching',
    }));

    builder.addCase(checkAuthThunk.rejected, () => ({
      status: 'error',
    }));
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
export const { logoutErrorAction, signAction } = userSlice.actions;
