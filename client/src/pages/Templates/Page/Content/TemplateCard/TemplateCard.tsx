import { memo } from 'react';

import Button from '@@components/ui/Button';
import Image from '@@components/ui/Image';
import Typography from '@@components/ui/Typography';

import EditSvg from '@@assets/icons/edit.svg';

import { Template } from '@@types/template';

import { useHardwareImage } from './hooks';

import styles from './TemplateCard.module.scss';

interface TemplateCardProps {
  title: Template['name'];
  hardware: Template['hardware'];
  devicesQuantity: number;
}

function TemplateCard(props: TemplateCardProps) {
  const { title, hardware, devicesQuantity } = props;

  const hardwareImage = useHardwareImage(hardware);

  return (
    <div className={styles.wrapper}>
      <img src={hardwareImage} alt="Hardware" className={styles.image} />
      <Button variant="outline" color="blue_500">
        <Image image={EditSvg} cursor="pointer" />
      </Button>
      <div className={styles.info}>
        <Typography variant="bodyBold" bottomOffset={4}>
          {title}
        </Typography>
        <Typography variant="note" color="grey_200" className={styles.quantity}>
          <div className={styles.elips} />
          {devicesQuantity} device(s)
        </Typography>
      </div>
    </div>
  );
}

export default memo(TemplateCard);
