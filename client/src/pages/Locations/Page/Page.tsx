import { memo } from 'react';

import { useDispatch } from '@@store/index';
import { showModal } from '@@store/modals/slice';

import EmptyContentLayout from '@@components/layouts/EmptyContentLayout';

import { usePageContentContext } from '@@contexts/PageContentContext';

import { LocationModalName } from '@@constants/modal';

import { Location } from '@@types/locations';

import Content from './Content';

import styles from './Page.module.scss';

function Page() {
  const { data, isLoading, refetch } = usePageContentContext<Location[]>();

  const dispatch = useDispatch();

  const handleAddLocation = () => {
    dispatch(
      showModal(LocationModalName, {
        onSubmit: refetch,
      }),
    );
  };

  return (
    <div className={styles.wrapper}>
      <Content />
      {!data?.length && !isLoading && (
        <EmptyContentLayout
          title="Use locations to organize your devices better"
          description="Start by creating location. Once created, you can assign users and devices to a location"
          button={{
            text: 'New location',
            onClick: handleAddLocation,
          }}
        />
      )}
    </div>
  );
}

export default memo(Page);
