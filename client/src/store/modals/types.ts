export interface ModalProps {
  [key: string]: unknown;
  isOpen: boolean;
}

export interface ModalState {
  _modalId: string;
  modalType: string;
  modalProps: ModalProps;
}
