import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import classNames from 'classnames';

import { useDispatch } from '@@store/index';
import { selectSidebar } from '@@store/ui/selectors';
import { selectUser } from '@@store/user/selectors';
import { showSidebar } from '@@store/ui/slice';

import { ROUTES } from '@@constants/routes';

import Collapser from './Collapser';

import styles from './PrivatePageLayout.module.scss';

interface PrivatePageLayoutProps {
  dataCid?: string;
  children?: ReactNode;
}

function PrivatePageLayout({ dataCid = '', children }: PrivatePageLayoutProps) {
  const { isAuthenticated } = useSelector(selectUser);
  const { isCollapsed } = useSelector(selectSidebar);

  const dispatch = useDispatch();

  const pageLayoutClassName = classNames(styles.wrapper, {
    [styles.wrapper_withSidebar]: isCollapsed,
  });

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(showSidebar());
    }
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGN_IN} />;
  }

  return (
    <div data-cid={dataCid} className={pageLayoutClassName}>
      <Collapser />
      {children}
    </div>
  );
}

export default PrivatePageLayout;
