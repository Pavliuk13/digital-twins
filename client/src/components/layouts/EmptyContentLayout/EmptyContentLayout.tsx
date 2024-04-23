import classNames from 'classnames';

import Typography from '@@components/ui/Typography';
import Button from '@@components/ui/Button';
import Image from '@@components/ui/Image';

import PlusSvg from '@@assets/icons/plus.svg';

import styles from './EmptyContentLayout.module.scss';

interface EmptyContentLayoutProps {
  title: string;
  description?: string;
  button?: {
    text: string;
    onClick: () => void;
  };
}

function EmptyContentLayout(props: EmptyContentLayoutProps) {
  const { title, description, button } = props;

  const emptyContentLayoutClassName = classNames(styles.wrapper);

  return (
    <div className={emptyContentLayoutClassName}>
      <Typography variant="subheading2" className={styles.title}>
        {title}
      </Typography>
      {description && (
        <Typography className={styles.description}>{description}</Typography>
      )}
      {button && (
        <Button
          variant="outline"
          color="grey_200"
          size="medium"
          onClick={button.onClick}
          className={styles.button}
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
  );
}

export default EmptyContentLayout;
