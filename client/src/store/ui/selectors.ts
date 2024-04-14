import { type RootState } from '@@store/index';

export const selectSidebar = (state: RootState) => state.ui.sidebar;

export const selectAvatar = (state: RootState) => state.ui.avatar;
