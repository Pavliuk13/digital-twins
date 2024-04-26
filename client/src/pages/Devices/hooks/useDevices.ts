import { useGetDevicesQuery } from '@@api/devices';

export const useDevices = () => {
  const {
    refetch,
    data: devices,
    isLoading,
  } = useGetDevicesQuery({
    params: { organizationId: 2 },
  });

  return { devices, isLoading, refetch };
};
