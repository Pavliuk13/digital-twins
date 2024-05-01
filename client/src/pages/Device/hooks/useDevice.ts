import { useParams } from 'react-router-dom';

import { useGetDevicesQuery } from '@@api/devices';
import { useGetDeviceWidgetsQuery } from '@@api/widgets';

export const useDevice = () => {
  const { deviceId } = useParams();

  const {
    refetch,
    data: devices = [],
    isLoading: isLoadingDevices,
  } = useGetDevicesQuery();

  const { data: deviceWidgets = [], isLoading: isLoadingDeviceWidgets } =
    useGetDeviceWidgetsQuery({ params: { deviceId } });

  return {
    data: {
      device: devices.find(({ id }) => id === +deviceId),
      deviceWidgets,
    },
    isLoading: isLoadingDevices || isLoadingDeviceWidgets,
    refetch,
  };
};
