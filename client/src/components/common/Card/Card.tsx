import { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Card.module.scss';

interface CardProps {
  children: ReactNode;
  color?: 'grey_800';
  cursor?: 'default' | 'pointer' | 'not-allowed' | 'wait';
  className?: string;
  isScale?: boolean;
  onClick?: () => void;
}

function Card(props: CardProps) {
  const {
    children,
    color = 'grey_800',
    cursor,
    className = '',
    isScale = true,
    onClick,
  } = props;

  const cardClassName = classNames(styles.card, className, {
    [styles[`card_color_${color}`]]: color,
    [styles[`card_cursor_${cursor}`]]: cursor,
    [styles.card_scale]: isScale,
  });

  return (
    <div className={cardClassName} onClick={onClick}>
      {children}
    </div>
  );
}

export default Card;
