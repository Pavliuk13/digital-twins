import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@@store/index';

import { ModalState } from './types';

export const selectCurrentModals = (state: RootState): ModalState[] => {
  return state.modals.modals;
};

export const makeSelectDirtyStateModal = () => {
  return createSelector(
    [selectCurrentModals, (_, type) => type],
    (modals, type) => {
      return modals.some(({ modalType }) => modalType === type);
    },
  );
};

export const makeSelectModalByType = () => {
  return createSelector(
    [selectCurrentModals, (_, type) => type],
    (modals, type) => {
      const [modal] = modals.filter(({ modalType }) => modalType === type);

      return modal;
    },
  );
};
