import { useSelector } from 'react-redux';

import { selectUser } from '@@store/user/selectors';

import { UserRole } from '@@types/user';

export const useEditPermission = (ownerId: number) => {
  const { user } = useSelector(selectUser);

  return ownerId === user.id || user.role === UserRole.Admin;
};
