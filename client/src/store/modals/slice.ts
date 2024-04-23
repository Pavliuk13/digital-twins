import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';
import _intersectionWith from 'lodash/intersectionWith';
import _pick from 'lodash/pick';
import _isEqual from 'lodash/isEqual';
import _isEmpty from 'lodash/isEmpty';

import { ModalState } from './types';

interface ModalsState {
  blocked: Record<string, boolean>;
  modals: ModalState[];
  isLoadingModal: boolean;
}

type ShowModalSyncAction = PayloadAction<{
  modalType: ModalState['modalType'];
  modalProps: {
    [key: string]: unknown;
    preventDuplicateId?: number;
  };
}>;

type SetModalOpenAction = PayloadAction<{
  isOpen: boolean;
}>;

type SetModalPropsAction = PayloadAction<{
  modalType: ModalState['modalType'];
  submitOnEnter?: boolean;
  isSidebarCollapsed?: boolean;
  isPinnedDp?: boolean;
}>;

type BlockUnblockModalAction = PayloadAction<{ key: string }>;

export const initialState: ModalsState = {
  blocked: {},
  modals: [],
  isLoadingModal: false,
};

const hasDuplicate = (
  modals: ModalState[],
  payload: {
    [key: string]: unknown;
    uniqBy?: string[];
  },
) => {
  const { uniqBy } = payload;

  return (
    !!uniqBy &&
    !_isEmpty(
      _intersectionWith(
        modals.map((modal) => _pick(modal.modalProps, uniqBy)),
        [_pick(payload, uniqBy)],
        _isEqual,
      ),
    )
  );
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModalSync(state, { payload }: ShowModalSyncAction) {
      const { modalType, modalProps } = payload;

      state.modals.push({
        _modalId: nanoid(),
        modalType,
        modalProps: { ...modalProps, isOpen: true },
      });
    },
    hideModal(state) {
      // Always popping the last modal off the stack
      state.modals.pop();
    },
    hideAllModals(state) {
      state.modals = [];
    },
    setModalOpen(state, { payload }: SetModalOpenAction) {
      const { modals } = state;
      const { isOpen } = payload;

      if (modals.length) {
        let increment = 1;

        state.modals = modals.reduce((accumulator, modal, index) => {
          if (!modals[modals.length - increment].modalProps.isOpen) {
            increment += 1;
          }

          return [
            ...accumulator,
            index === modals.length - increment
              ? {
                  ...modal,
                  modalProps: {
                    ...modal.modalProps,
                    isOpen,
                  },
                }
              : modal,
          ];
        }, []);
      }
    },
    setModalProps(state, { payload }: SetModalPropsAction) {
      const { modals } = state;
      const { modalType, ...newModalProps } = payload;

      state.modals = modals.map((modal) => {
        if (modal.modalType !== modalType) {
          return modal;
        }

        return {
          ...modal,
          modalProps: {
            ...modal.modalProps,
            ...newModalProps,
          },
        };
      });
    },
    blockModal(state, { payload }: BlockUnblockModalAction) {
      const { key } = payload;

      state.blocked[key] = true;
    },
    unblockModal(state, { payload }: BlockUnblockModalAction) {
      const { key } = payload;

      delete state.blocked[key];
    },
    setIsLoadingModal(state, { payload }) {
      state.isLoadingModal = payload;
    },
  },
});

export const {
  showModalSync,
  hideModal,
  hideAllModals,
  setModalOpen,
  setModalProps,
  blockModal,
  unblockModal,
  setIsLoadingModal,
} = modalsSlice.actions;

type ShowModalReturn = ThunkAction<
  void,
  { modals: ModalsState },
  unknown,
  BlockUnblockModalAction | ShowModalSyncAction
>;

type NeverPreloaderPayload = {
  preloader?: never;
  condition?: never;
  onFailPreload?: never;
};

type PreloaderPayload<T> = {
  preloader: () => Promise<T>;
  condition: (data: Awaited<T>) => boolean;
  onFailPreload?: (data: Awaited<T>) => () => void;
};

function showModal(modalType: string): ShowModalReturn;
function showModal<P extends object>(
  modalType: string,
  payload: P & NeverPreloaderPayload,
): ShowModalReturn;
function showModal<T, P>(
  modalType: string,
  payload: P & PreloaderPayload<T>,
): ShowModalReturn;
function showModal<T, P>(
  modalType: string,
  payload?: P & PreloaderPayload<T>,
): ShowModalReturn {
  return async function recursive(dispatch, getState) {
    const {
      preloader,
      condition = () => true,
      onFailPreload = () => {},
      ...modalProps
    } = payload || {};

    const {
      modals: { modals, blocked, isLoadingModal },
    } = getState();

    if (isLoadingModal) {
      return;
    }

    if (hasDuplicate(modals, modalProps)) {
      toast.success('The document is already opened');

      return;
    }

    if (preloader) {
      const key = JSON.stringify({ modalType, ...modalProps });

      if (blocked[key]) {
        return;
      }

      dispatch(blockModal({ key }));

      const toastId = toast.loading('Loading');

      const preloadData = await preloader();

      toast.remove(toastId);

      if (condition(preloadData)) {
        await dispatch(
          showModalSync({
            modalType,
            modalProps: { ...modalProps, preloadData },
          }),
        );
      } else {
        onFailPreload(preloadData);
      }

      dispatch(unblockModal({ key }));
    } else {
      dispatch(
        showModalSync({
          modalType,
          modalProps,
        }),
      );
    }
  };
}

showModal.type = showModalSync.type;

export { showModal };

export default modalsSlice.reducer;
