import { useEffect, useState } from 'react';
import classNames from 'classnames';

import Image from '@@components/ui/Image';
import CancelThinSvg from '@@assets/icons/cancel_thin.svg';

import { useModalContext } from '@@contexts/ModalContext';

import styles from './HeaderClose.module.scss';

interface HeaderCloseProps {
  fill?: 'grey_200';
  size?: 16;
}

function HeaderClose(props: HeaderCloseProps) {
  const { fill = 'grey_200', size = 16 } = props;

  const {
    events: { escapePressed, maskClicked },
    closeOnEsc,
    closeOnMask,
    closeModal,
  } = useModalContext();

  const [blink, setBlink] = useState(false);

  const headerCloseCls = classNames(styles.headerClose, {
    [styles.blinkYellow]: blink,
  });

  useEffect(() => {
    if ((escapePressed && !closeOnEsc) || (maskClicked && !closeOnMask)) {
      setBlink(true);
    }
  }, [escapePressed, maskClicked, closeOnEsc, closeOnMask]);

  const handleClick = (e) => {
    e.stopPropagation();
    closeModal();
  };

  return (
    <div
      className={headerCloseCls}
      onClick={handleClick}
      onAnimationEnd={() => setBlink(false)}
      data-cid="modal-close"
    >
      <Image image={CancelThinSvg} size={size} cursor="pointer" fill={fill} />
    </div>
  );
}

export default HeaderClose;
