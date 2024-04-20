import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { selectSidebar } from '@@store/ui/selectors';

import Collapser from './Collapser';

import styles from './PrivatePageLayout.module.scss';

interface PrivatePageLayoutProps {
  dataCid?: string;
  children?: ReactNode;
}

function PrivatePageLayout({ dataCid = '', children }: PrivatePageLayoutProps) {
  const { isCollapsed } = useSelector(selectSidebar);

  const pageLayoutClassName = classNames(styles.wrapper, {
    [styles.wrapper_withSidebar]: isCollapsed,
  });

  return (
    <div data-cid={dataCid} className={pageLayoutClassName}>
      <Collapser />
      {children}
    </div>
  );
}

export default PrivatePageLayout;
