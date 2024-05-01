import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import PageTabs from '@@features/PageTabs';
import Typography from '@@components/ui/Typography';
import Button from '@@components/ui/Button';
import Image from '@@components/ui/Image';
import Spinner from '@@components/common/Spinner';

import PlusSvg from '@@assets/icons/plus.svg';
import ArrowLeftSvg from '@@assets/icons/arrow_left.svg';

import { TabOption } from '@@types/ui';

import styles from './PageContentLayout.module.scss';

interface PageContentLayoutProps {
  title: string;
  description?: string;
  button?: {
    text: string;
    onClick: () => void;
  };
  tabs?: TabOption[];
  children: ReactNode;
  withBackward?: boolean;
  isLoading?: boolean;
}

function PageContentLayout(props: PageContentLayoutProps) {
  const {
    title,
    description,
    button,
    tabs,
    children,
    withBackward = false,
    isLoading = false,
  } = props;

  const navigate = useNavigate();

  const pageContentLayoutClassName = classNames(styles.wrapper);

  const handleBackward = () => {
    navigate(-1);
  };

  return (
    <div className={pageContentLayoutClassName}>
      <div>
        {tabs && <PageTabs tabs={tabs} className={styles.tabs} />}
        <div className={styles.header}>
          <div className={styles.header__title}>
            {withBackward && (
              <Button
                variant="outline"
                color="grey_200"
                size="medium"
                onClick={handleBackward}
              >
                <Image
                  image={ArrowLeftSvg}
                  size={12}
                  fill="grey_200"
                  cursor="pointer"
                />
              </Button>
            )}
            <div>
              <Typography variant="subheading2">{title}</Typography>
              {description && (
                <Typography variant="bodyRegular">{description}</Typography>
              )}
            </div>
          </div>
          {button && (
            <Button
              variant="outline"
              color="grey_200"
              size="medium"
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
