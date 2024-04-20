import { memo } from 'react';
import classNames from 'classnames';

import Typography from '@@components/ui/Typography';

import styles from './Header.module.scss';

interface HeaderProps {
  title: string;
}

function Header(props: HeaderProps) {
  const { title } = props;

  const headerClassName = classNames(styles.header, {});

  return (
    <div className={headerClassName}>
      <Typography variant="subheading1">{title}</Typography>
    </div>
  );
}

export default memo(Header);
