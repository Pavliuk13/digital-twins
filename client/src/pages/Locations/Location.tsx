import { memo, useMemo } from 'react';

import { useDispatch } from '@@store/index';
import { showModal } from '@@store/modals/slice';

import { PageContentContextProvider } from '@@contexts/PageContentContext';

import PrivatePageLayout from '@@components/layouts/PrivatePageLayout';
import PageContentLayout from '@@components/layouts/PageContentLayout';
import Header from '@@components/sections/Header';

import { LocationModalName } from '@@constants/modal';

import { useLocations } from './hooks';

import Page from './Page';

function Locations() {
  const { locations, isLoading, refetch } = useLocations();

  const dispatch = useDispatch();

  const pageContentContextValue = useMemo(() => {
    return {
      data: locations,
      isLoading,
      refetch,
    };
  }, [locations, isLoading]);

  const handleAddLocation = () => {
    dispatch(
      showModal(LocationModalName, {
        onSubmit: refetch,
      }),
    );
  };

  return (
    <PrivatePageLayout dataCid="locations">
      <Header title="Locations" />
      <PageContentLayout
        title="Locations"
        description="Start by creating location. Once created, you can assign users and devices to a location"
        button={{
          text: 'New location',
          onClick: handleAddLocation,
        }}
        isLoading={isLoading}
      >
        <PageContentContextProvider value={pageContentContextValue}>
          <Page />
        </PageContentContextProvider>
      </PageContentLayout>
    </PrivatePageLayout>
  );
}

export default memo(Locations);
