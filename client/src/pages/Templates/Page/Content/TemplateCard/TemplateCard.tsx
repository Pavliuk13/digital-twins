import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@@components/ui/Button';
import Image from '@@components/ui/Image';
import Typography from '@@components/ui/Typography';
import Card from '@@components/common/Card';

import EditSvg from '@@assets/icons/edit.svg';

import { Template } from '@@types/template';

import { HARDWARE_IMAGE } from '@@constants/hardware';
import { ROUTES } from '@@constants/routes';

import styles from './TemplateCard.module.scss';

interface TemplateCardProps {
  template: Template;
}

function TemplateCard(props: TemplateCardProps) {
  const { template } = props;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(
      `${ROUTES.TEMPLATES.INDEX}/${template.id}${ROUTES.TEMPLATES.HOME}`,
    );
  };

  return (
    <Card cursor="pointer" onClick={handleClick}>
      <img
        src={HARDWARE_IMAGE[template.hardware]}
        alt="Hardware"
        className={styles.image}
      />
      <Link
        to={`${ROUTES.TEMPLATES.INDEX}/${template.id}${ROUTES.TEMPLATES.HOME}`}
      >
        <Button variant="outline" color="blue_500">
          <Image image={EditSvg} cursor="pointer" />
        </Button>
      </Link>
      <div className={styles.info}>
        <Typography variant="bodyBold" bottomOffset={4}>
          {template.name}
        </Typography>
        <Typography variant="note" color="grey_200" className={styles.quantity}>
          <div className={styles.elips} />
          {template.devices.length} device(s)
        </Typography>
      </div>
    </Card>
  );
}

export default memo(TemplateCard);
