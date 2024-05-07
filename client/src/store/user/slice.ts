import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoadingUser: true,
  },
  reducers: {
    setUser(state, { payload }) {
      state.user = payload;
    },
    setIsLoadingUser(state, { payload }) {
      state.isLoadingUser = payload;
    },
    setIsAuthenticated(state, { payload }) {
      state.isAuthenticated = payload;
    },
  },
});

export const { setUser, setIsLoadingUser, setIsAuthenticated } =
  userSlice.actions;

export default userSlice.reducer;
