import { ReactNode } from 'react';
import classNames from 'classnames';

import Typography from '@@components/ui/Typography';
import Button from '@@components/ui/Button';
import Image from '@@components/ui/Image';

import PlusSvg from '@@assets/icons/plus.svg';

import styles from './PageContentLayout.module.scss';

interface PageContentLayoutProps {
  title: string;
  description?: string;
  button?: {
    text: string;
    onClick: () => void;
  };
  children: ReactNode;
}

function PageContentLayout(props: PageContentLayoutProps) {
  const { title, description, button, children } = props;

  const pageContentLayoutClassName = classNames(styles.wrapper);

  return (
    <div className={pageContentLayoutClassName}>
      <div className={styles.header}>
        <div>
          <Typography variant="subheading2">{title}</Typography>
          {description && (
            <Typography variant="bodyRegular">{description}</Typography>
          )}
        </div>
        {button && (
          <Button variant="outline" size="large" onClick={button.onClick}>
            <Image
              image={PlusSvg}
              size={12}
              fill="grey_200"
              position="left_8"
              cursor="pointer"
            />
            {button.text}
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}

export default PageContentLayout;