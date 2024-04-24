import { useState, useEffect, useMemo } from 'react';

export const useGetModalState = (modalName) => {
  const [mountedModal, setMountedModal] = useState(modalName);

  useEffect(() => {
    if (modalName) {
      setMountedModal(modalName);
    } else {
      setMountedModal(null);
    }
  }, [modalName]);

  const isOpen = useMemo(() => Boolean(modalName), [modalName]);

  return {
    mountedModal,
    isOpen,
  };
};
