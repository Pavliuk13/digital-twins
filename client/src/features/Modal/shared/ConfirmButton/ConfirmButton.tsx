import { ReactNode, useEffect } from 'react';

import Button from '@@components/ui/Button';

import { hideModal } from '@@store/modals/slice';
import { useModalContext } from '@@contexts/ModalContext';

import { useDispatch } from '@@store/index';

interface ConfirmButtonProps {
  children: ReactNode;
  onConfirm?: () => void;
}

function ConfirmButton(props: ConfirmButtonProps) {
  const { onConfirm, children } = props;

  const dispatch = useDispatch();

  const {
    events,
    events: { enterPressed, shiftEnterPressed },
    isTopModal,
  } = useModalContext();

  const handleClick = () => {
    dispatch(hideModal());
    onConfirm?.();
  };

  useEffect(() => {
    if (isTopModal && enterPressed && !shiftEnterPressed) {
      handleClick();
    }
  }, [events, isTopModal]);

  return (
    <Button variant="primary" color="blue_500" onClick={handleClick}>
      {children}
    </Button>
  );
}

export default ConfirmButton;
