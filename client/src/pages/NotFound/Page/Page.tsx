import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from '@@store/index';
import { hideSidebar } from '@@store/ui/slice';

import Typography from '@@components/ui/Typography';
import Button from '@@components/ui/Button';

import { ROUTES } from '@@constants/routes';

import styles from './Page.module.scss';

function Page() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideSidebar());
  }, []);

  return (
    <div className={styles.wrapper}>
      <Typography variant="h1" bottomOffset={20}>
        Looks like this page does not exist
      </Typography>
      <Link to={ROUTES.INDEX}>
        <Button>Go home</Button>
      </Link>
    </div>
  );
}

export default memo(Page);
