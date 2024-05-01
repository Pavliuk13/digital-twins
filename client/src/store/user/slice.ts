import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoadingUser: true,
  },
  reducers: {
    setIsLoadingUser(state, { payload }) {
      state.isLoadingUser = payload;
    },
    setIsAuthenticated(state, { payload }) {
      state.isAuthenticated = payload;
    },
  },
});

export const { setIsLoadingUser, setIsAuthenticated } = userSlice.actions;

export default userSlice.reducer;
