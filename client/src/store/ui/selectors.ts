import { STORAGE_KEY } from '@@constants/storage';
import { type RootState } from '@@store/index';

import { LocalStorage } from '@@utils/localStorage';

export const selectSidebar = (state: RootState) => {
  const { isCollapsed, ...restSidebar } = state.ui.sidebar;

  return {
    ...restSidebar,
    isCollapsed:
      LocalStorage.get(STORAGE_KEY.SIDEBAR_IS_COLLAPSED) || isCollapsed,
  };
};

export const selectAvatar = (state: RootState) => state.ui.avatar;
