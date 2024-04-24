import { ReactNode, useCallback, useEffect } from 'react';

import Button from '@@components/ui/Button';
import { useModalContext } from '@@contexts/ModalContext';

import { DISPLAY_NAME } from '@@constants/displayNames';

import { MODAL_SUBMIT_BUTTON_CID, MODAL_SUBMIT_LOADER_CID } from './constants';

interface SubmitButtonProps {
  children: ReactNode | string;
  submitOnEnter?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

function SubmitButton(props: SubmitButtonProps) {
  const {
    children,
    submitOnEnter: buttonSubmitOnEnter = true,
    disabled,
    isLoading,
    onClick,
    ...restProps
  } = props;

  const {
    events: { enterPressed, shiftEnterPressed },
    submitOnEnter,
    isTopModal,
    isOpen,
    closeModal,
  } = useModalContext();

  const handleClick = useCallback(() => {
    onClick(closeModal);
  }, [onClick, closeModal]);

  useEffect(() => {
    if (
      isOpen &&
      isTopModal &&
      enterPressed &&
      submitOnEnter &&
      buttonSubmitOnEnter &&
      !shiftEnterPressed &&
      !isLoading
    ) {
      handleClick();
    }
  }, [enterPressed]);

  return (
    <Button
      dataCid={isLoading ? MODAL_SUBMIT_LOADER_CID : MODAL_SUBMIT_BUTTON_CID}
      variant="primary"
      type="submit"
      size="small"
      isLoading={isLoading}
      disabled={disabled}
      onClick={handleClick}
      {...restProps}
    >
      <span>{children}</span>
    </Button>
  );
}

// SubmitButton.propTypes = {
//   text: PropTypes.string,
//   onClick: PropTypes.func,
//   isLoading: PropTypes.bool,
//   submitOnEnter: PropTypes.bool,
//   disabled: PropTypes.bool,
//   color: PropTypes.oneOf(['green', 'red', 'blue', 'orange']),
// };

// SubmitButton.defaultProps = {
//   text: TEXT.CREATE_BTN,
//   onClick: () => {},
//   isLoading: false,
//   submitOnEnter: true,
//   disabled: false,
//   color: 'blue',
// };

/**
 * Needed to control adaptive footer transformations in production mode.
 * @type {string}
 */
SubmitButton.displayName = DISPLAY_NAME.SUBMIT_BUTTON;

export default SubmitButton;
