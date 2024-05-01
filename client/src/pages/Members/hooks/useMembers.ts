import { useGetMembersQuery } from '@@api/members';

export const useMembers = () => {
  const { refetch, data: members, isLoading } = useGetMembersQuery();

  return { members, isLoading, refetch };
};
