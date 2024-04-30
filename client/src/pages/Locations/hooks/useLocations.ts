import { useGetLocationsQuery } from '@@api/locations';

export const useLocations = () => {
  const {
    refetch,
    data: locations,
    isLoading,
  } = useGetLocationsQuery({
    params: { organizationId: 2 },
  });

  return { locations, isLoading, refetch };
};
