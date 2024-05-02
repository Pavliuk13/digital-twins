import { useGetLocationsQuery } from '@@api/locations';

export const useLocations = () => {
  const { refetch, data: locations, isLoading } = useGetLocationsQuery();

  return { locations, isLoading, refetch };
};
