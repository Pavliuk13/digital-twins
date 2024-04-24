import {
  Children,
  useRef,
  useEffect,
  useState,
  isValidElement,
  cloneElement,
  memo,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import HeaderClose from '@@features/Modal/shared/HeaderClose';

import styles from './ModalHeader.module.scss';

interface ModalHeaderProps {
  children: ReactNode;
  closeButtonFill?: 'grey_200';
  closeButtonSize?: 16;
  className?: string;
  divider?: boolean;
  withCloseButton?: boolean;
  withTitleOverflow?: boolean;
}

function ModalHeader(props: ModalHeaderProps) {
  const {
    divider = true,
    children,
    withTitleOverflow = false,
    withCloseButton = true,
    closeButtonFill = 'grey_200',
    closeButtonSize = 16,
    className = '',
  } = props;

  const modalHeaderRef = useRef();
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (modalHeaderRef.current) {
      setHeaderHeight(modalHeaderRef.current.clientHeight);
    }
  }, []);

  const modalHeaderCls = classNames(styles.modalHeader, className, {
    [styles.divider]: divider,
  });

  const modalHeaderChildrenCls = classNames(styles.headerChildren, {
    [styles.headerChildren_overflow]: withTitleOverflow,
  });

  const enhanceChildren = (elements) => {
    return Children.map(elements, (child) => {
      return isValidElement(child)
        ? cloneElement(child, {
            modalHeaderParams: { height: headerHeight },
            ...(withTitleOverflow
              ? {
                  style: {
                    display: 'inline-block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  },
                }
              : {}),
          })
        : child;
    });
  };

  return (
    <div
      data-cid="modal-header"
      ref={modalHeaderRef}
      className={modalHeaderCls}
    >
      <div className={styles.innerWrapper}>
        <div className={modalHeaderChildrenCls}>
          {enhanceChildren(children)}
        </div>

        {withCloseButton && (
          <HeaderClose
            divider={divider}
            fill={closeButtonFill}
            size={closeButtonSize}
          />
        )}
      </div>
    </div>
  );
}

export default memo(ModalHeader);
