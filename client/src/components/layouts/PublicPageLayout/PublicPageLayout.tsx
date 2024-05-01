import { ReactNode, useEffect } from 'react';
import classNames from 'classnames';

import { useDispatch } from '@@store/index';
import { hideSidebar } from '@@store/ui/slice';

import styles from './PublicPageLayout.module.scss';

interface PublicPageLayoutProps {
  dataCid?: string;
  children?: ReactNode;
}

function PublicPageLayout({ dataCid = '', children }: PublicPageLayoutProps) {
  const dispatch = useDispatch();

  const pageLayoutClassName = classNames(styles.wrapper);

  useEffect(() => {
    dispatch(hideSidebar());
  }, []);

  return (
    <div data-cid={dataCid} className={pageLayoutClassName}>
      {children}
    </div>
  );
}

export default PublicPageLayout;
