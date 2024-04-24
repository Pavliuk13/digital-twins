import { createContext, useContext } from 'react';

export interface ModalContextValue {
  events: {
    maskClicked?: boolean;
    escapePressed?: boolean;
    enterPressed?: boolean;
    shiftEnterPressed?: boolean;
  };
  closeOnEsc: boolean;
  closeOnMask: boolean;
  submitOnEnter: boolean;
  isTopModal: boolean;
  isCenterPosition: boolean;
  closeModal: () => void;
  breakpoints: {
    extraSmall: boolean;
  };
}

export const ModalContext = createContext<ModalContextValue>({
  events: {},
  closeOnEsc: false,
  closeOnMask: false,
  submitOnEnter: false,
  isTopModal: false,
  isCenterPosition: false,
  closeModal: () => {},
  breakpoints: {
    extraSmall: false,
  },
});

export const ModalProvider = ModalContext.Provider;

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModalContext has to be used within <ModalProvider>');
  }

  return context;
};
