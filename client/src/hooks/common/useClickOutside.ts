import { useEventListener } from '@@hooks/common/useEventListener';

import { CLICK } from '@@constants/userEvents';

export const useClickOutside = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEventListener(CLICK, handleClick);
};
