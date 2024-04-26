import { lazy } from 'react';

import { store } from '@@store/index';
import { setIsLoadingModal } from '@@store/modals/slice';

import {
  ConfirmCloseModalName,
  TemplateModalName,
  DeviceModalName,
  ConfirmDeleteModalName,
  DatastreamModalName,
} from '@@constants/modal';

const loadModal = async (importPromise) => {
  store.dispatch(setIsLoadingModal(true));

  const modal = await importPromise;

  store.dispatch(setIsLoadingModal(false));

  return modal;
};

const ConfirmCloseModal = lazy(() => {
  return loadModal(import('../ModalComponents/ConfirmCloseModal'));
});

const TemplateModal = lazy(() => {
  return loadModal(import('../ModalComponents/TemplateModal'));
});

const DeviceModal = lazy(() => {
  return loadModal(import('../ModalComponents/DeviceModal'));
});

const ConfirmDeleteModal = lazy(() => {
  return loadModal(import('../ModalComponents/ConfirmDeleteModal'));
});

const DatastreamModal = lazy(() => {
  return loadModal(import('../ModalComponents/DatastreamModal'));
});

export const modalComponentLookupTable = {
  [ConfirmCloseModalName]: ConfirmCloseModal,
  [TemplateModalName]: TemplateModal,
  [DeviceModalName]: DeviceModal,
  [ConfirmDeleteModalName]: ConfirmDeleteModal,
  [DatastreamModalName]: DatastreamModal,
};
