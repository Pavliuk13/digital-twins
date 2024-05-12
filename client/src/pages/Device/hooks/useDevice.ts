import { useParams } from 'react-router-dom';

import {
  useGetDeviceErrorLogsQuery,
  useGetDeviceStatisticsQuery,
  useGetDevicesQuery,
} from '@@api/devices';
import { useGetDeviceWidgetsQuery } from '@@api/widgets';

export const useDevice = () => {
  const { deviceId } = useParams();

  const {
    refetch: refetchDevices,
    data: devices = [],
    isLoading: isLoadingDevices,
  } = useGetDevicesQuery();

  const {
    refetch: refetchDeviceWidgets,
    data: deviceWidgets = [],
    isLoading: isLoadingDeviceWidgets,
  } = useGetDeviceWidgetsQuery({ params: { deviceId } });

  const {
    refetch: refetchDeviceErrorLogs,
    data: deviceErorLogs = [],
    isLoading: isLoadingDeviceErorLogs,
  } = useGetDeviceErrorLogsQuery(
    { params: { deviceId } },
    { refetchOnMountOrArgChange: true },
  );

  const {
    refetch: refetchDeviceStatistics,
    data: deviceStatistics = [],
    isLoading: isLoadingDeviceStatistics,
  } = useGetDeviceStatisticsQuery(
    { params: { deviceId } },
    { refetchOnMountOrArgChange: true },
  );

  const handleRefetch = () => {
    refetchDevices();
    refetchDeviceWidgets();
    refetchDeviceErrorLogs();
    refetchDeviceStatistics();
  };

  return {
    data: {
      device: devices.find(({ id }) => id === +deviceId),
      deviceWidgets,
      deviceErorLogs,
      deviceStatistics: [...deviceStatistics].slice(-60),
    },
    isLoading:
      isLoadingDevices ||
      isLoadingDeviceWidgets ||
      isLoadingDeviceErorLogs ||
      isLoadingDeviceStatistics,
    refetch: handleRefetch,
  };
};
