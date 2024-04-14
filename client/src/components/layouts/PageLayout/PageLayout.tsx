import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { selectSidebar } from '@@store/ui/selectors';

import Collapser from './Collapser';

import styles from './PageLayout.module.scss';

interface PageLayoutProps {
  dataCid?: string;
  children?: ReactNode;
}

function PageLayout({ dataCid = '', children }: PageLayoutProps) {
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

export default PageLayout;
