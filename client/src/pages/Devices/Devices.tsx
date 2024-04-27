import { memo, useMemo } from 'react';

import { useDispatch } from '@@store/index';
import { showModal } from '@@store/modals/slice';

import { PageContentContextProvider } from '@@contexts/PageContentContext';

import PrivatePageLayout from '@@components/layouts/PrivatePageLayout';
import PageContentLayout from '@@components/layouts/PageContentLayout';
import Header from '@@components/sections/Header';

import { DeviceModalName } from '@@constants/modal';

import Page from './Page';

import { useDevices } from './hooks';

function Devices() {
  const { devices, isLoading, refetch } = useDevices();

  const dispatch = useDispatch();

  const pageContentContextValue = useMemo(() => {
    return {
      data: devices,
      isLoading,
      refetch,
    };
  }, [devices, isLoading]);

  const handleAddDevice = () => {
    dispatch(
      showModal(DeviceModalName, {
        onSubmit: refetch,
      }),
    );
  };

  return (
    <PrivatePageLayout dataCid="devices">
      <Header title="Devices" />
      <PageContentLayout
        title="Devices"
        description="Create new devices"
        button={{
          text: 'New device',
          onClick: handleAddDevice,
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

export default memo(Devices);
