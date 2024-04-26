import { ReactNode } from 'react';
import classNames from 'classnames';

import PageTabs from '@@features/PageTabs';
import Typography from '@@components/ui/Typography';
import Button from '@@components/ui/Button';
import Image from '@@components/ui/Image';
import Spinner from '@@components/common/Spinner';

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
  isLoading?: boolean;
}

function PageContentLayout(props: PageContentLayoutProps) {
  const {
    title,
    description,
    button,
    tabs,
    children,
    isLoading = false,
  } = props;

  const pageContentLayoutClassName = classNames(styles.wrapper);

  return (
    <div className={pageContentLayoutClassName}>
      <div>
        {tabs && <PageTabs tabs={tabs} className={styles.tabs} />}
        <div className={styles.header}>
          <div>
            <Typography variant="subheading2">{title}</Typography>
            {description && (
              <Typography variant="bodyRegular">{description}</Typography>
            )}
          </div>
          {button && (
            <Button
              variant="outline"
              color="grey_200"
              size="large"
              onClick={button.onClick}
            >
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
      </div>
      {isLoading ? (
        <div className={styles.spinner}>
          <Spinner size="big" />
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export default PageContentLayout;
