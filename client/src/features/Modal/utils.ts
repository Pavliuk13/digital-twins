import { capitalizeFirstLetter } from '@@utils/common/capitalizeFirstLetter';

import { ModalPosition } from '@@types/ui';

export const getAnimationStyle = (
  position: ModalPosition = 'center',
  isOpen,
) => {
  return `animation${isOpen ? 'In' : 'Out'}${capitalizeFirstLetter(position)}`;
};
