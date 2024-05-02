import { useGetDevicesQuery } from '@@api/devices';

export const useDevices = () => {
  const { refetch, data: devices, isLoading } = useGetDevicesQuery();

  return { devices, isLoading, refetch };
};
