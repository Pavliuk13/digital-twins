import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebar: {
      isCollapsed: false,
      isShowSidebar: false,
    },
    avatar: '',
  },
  reducers: {
    toggleSidebar(state) {
      state.sidebar.isShowSidebar = !state.sidebar.isShowSidebar;
    },
    hideSidebar(state) {
      state.sidebar.isCollapsed = false;
      state.sidebar.isShowSidebar = false;
    },
    showSidebar(state) {
      state.sidebar.isShowSidebar = true;
    },
    collapseMenu(state) {
      state.sidebar.isCollapsed = !state.sidebar.isCollapsed;
    },
    setAvatar(state, { payload }) {
      state.avatar = payload;
    },
  },
});

export const {
  toggleSidebar,
  hideSidebar,
  showSidebar,
  collapseMenu,
  setAvatar,
} = uiSlice.actions;

export default uiSlice.reducer;
