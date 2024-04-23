import { lazy } from 'react';

import { store } from '@@store/index';
import { setIsLoadingModal } from '@@store/modals/slice';

import {
  CreateTemplateModalName,
  ConfirmCloseModalName,
} from '@@constants/modal';

const loadModal = async (importPromise) => {
  store.dispatch(setIsLoadingModal(true));

  const modal = await importPromise;

  store.dispatch(setIsLoadingModal(false));

  return modal;
};

const CreateTemplateModal = lazy(() => {
  return loadModal(import('../ModalComponents/CreateTemplateModal'));
});

const ConfirmCloseModal = lazy(() => {
  return loadModal(import('../ModalComponents/ConfirmCloseModal'));
});

export const modalComponentLookupTable = {
  [CreateTemplateModalName]: CreateTemplateModal,
  [ConfirmCloseModalName]: ConfirmCloseModal,
};
