import { memo } from 'react';
import classNames from 'classnames';

import Typography from '@@components/ui/Typography';

import styles from './Header.module.scss';

interface HeaderProps {
  title: string;
  className?: string;
}

function Header(props: HeaderProps) {
  const { title, className = '' } = props;

  return (
    <div className={classNames(styles.header, className)}>
      <Typography variant="subheading1">{title}</Typography>
    </div>
  );
}

export default memo(Header);
