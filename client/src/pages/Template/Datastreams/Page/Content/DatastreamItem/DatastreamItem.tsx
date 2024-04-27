import { memo } from 'react';

import { useDispatch } from '@@store/index';
import { showModal } from '@@store/modals/slice';

import { copyToClipboard } from '@@utils/common/copyToClipboard';

import { usePageContentContext } from '@@contexts/PageContentContext';

import Typography from '@@components/ui/Typography';
import Image from '@@components/ui/Image';
import Button from '@@components/ui/Button';
import Card from '@@components/common/Card';

import CopySvg from '@@assets/icons/copy.svg';
import EditSvg from '@@assets/icons/edit.svg';

import { Datastream } from '@@types/datastream';
import { Template } from '@@types/template';
import { Pin } from '@@types/pin';

import { DatastreamModalName } from '@@constants/modal';

import styles from './DatastreamItem.module.scss';

interface DatastreamItemProps {
  datastream: Datastream;
}

function DatastreamItem(props: DatastreamItemProps) {
  const { datastream } = props;

  const dispatch = useDispatch();

  const { refetch } = usePageContentContext<Template>();

  const handleEditDevice = () => {
    dispatch(
      showModal(DatastreamModalName, {
        data: datastream,
        onSubmit: refetch,
        onDelete: refetch,
      }),
    );
  };

  const handleCopyUGuid = () => {
    copyToClipboard(datastream.uGuid);
  };

  return (
    <Card className={styles.datastream}>
      <div>
        <Typography variant="bodyBold" bottomOffset={4}>
          {datastream.name} ({Pin[datastream.pin]})
        </Typography>
        <Typography
          variant="description"
          color="grey_200"
          onClick={handleCopyUGuid}
        >
          {datastream.alias}
          <Image
            image={CopySvg}
            cursor="pointer"
            position="right_4"
            size={16}
          />
        </Typography>
      </div>
      <Button variant="outline" color="blue_500" onClick={handleEditDevice}>
        <Image image={EditSvg} cursor="pointer" />
      </Button>
    </Card>
  );
}

export default memo(DatastreamItem);
