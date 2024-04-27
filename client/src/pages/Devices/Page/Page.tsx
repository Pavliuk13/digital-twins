import { memo } from 'react';

import { useDispatch } from '@@store/index';
import { showModal } from '@@store/modals/slice';

import EmptyContentLayout from '@@components/layouts/EmptyContentLayout';

import { usePageContentContext } from '@@contexts/PageContentContext';

import { Device } from '@@types/device';

import { DeviceModalName } from '@@constants/modal';

import Content from './Content';

import styles from './Page.module.scss';

function Page() {
  const { data, isLoading, refetch } = usePageContentContext<Device[]>();

  const dispatch = useDispatch();

  const handleAddDevice = () => {
    dispatch(
      showModal(DeviceModalName, {
        onSubmit: refetch,
      }),
    );
  };

  return (
    <div className={styles.wrapper}>
      <Content />
      {!data?.length && !isLoading && (
        <EmptyContentLayout
          title="All of your devices will be here"
          button={{
            text: 'Add device',
            onClick: handleAddDevice,
          }}
        />
      )}
    </div>
  );
}

export default memo(Page);
