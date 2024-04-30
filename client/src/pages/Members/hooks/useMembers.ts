import { useGetMembersQuery } from '@@api/members';

export const useMembers = () => {
  const {
    refetch,
    data: members,
    isLoading,
  } = useGetMembersQuery({
    params: { organizationId: 2 },
  });

  return { members, isLoading, refetch };
};
