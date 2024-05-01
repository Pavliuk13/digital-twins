import { type RootState } from '@@store/index';

export const selectUser = (state: RootState) => state.user;
