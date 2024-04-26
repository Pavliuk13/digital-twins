import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { selectSidebar } from '@@store/ui/selectors';
import { useDispatch } from '@@store/index';
import { showSidebar } from '@@store/ui/slice';

import Collapser from './Collapser';

import styles from './PrivatePageLayout.module.scss';

interface PrivatePageLayoutProps {
  dataCid?: string;
  children?: ReactNode;
}

function PrivatePageLayout({ dataCid = '', children }: PrivatePageLayoutProps) {
  const { isCollapsed } = useSelector(selectSidebar);

  const dispatch = useDispatch();

  const pageLayoutClassName = classNames(styles.wrapper, {
    [styles.wrapper_withSidebar]: isCollapsed,
  });

  useEffect(() => {
    dispatch(showSidebar());
  }, []);

  return (
    <div data-cid={dataCid} className={pageLayoutClassName}>
      <Collapser />
      {children}
    </div>
  );
}

export default PrivatePageLayout;
