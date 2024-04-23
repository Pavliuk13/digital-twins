import { useLayoutEffect } from 'react';

export const useLockBodyScroll = () => {
  useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Exiting if body already has needed style
    if (originalStyle === 'hidden') {
      return undefined;
    }

    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
};
