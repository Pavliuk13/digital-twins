import { useEffect } from 'react';

export const useModalBlur = () => {
  useEffect(() => {
    // Remove focus from active element before modal mounting.
    const { activeElement } = document;

    if (activeElement) {
      activeElement.blur();
    }
  }, []);
};
