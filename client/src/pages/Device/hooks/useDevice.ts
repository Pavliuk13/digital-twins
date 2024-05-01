import { useParams } from 'react-router-dom';

import { useGetDevicesQuery } from '@@api/devices';

export const useDevice = () => {
  const { deviceId } = useParams();

  const {
    refetch,
    data: devices = [],
    isLoading,
  } = useGetDevicesQuery({
    params: { organizationId: 2 },
  });

  console.log({ deviceId, devices });

  return {
    device: devices.find(({ id }) => id === +deviceId),
    isLoading,
    refetch,
  };
};
