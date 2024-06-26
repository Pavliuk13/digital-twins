import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, onAuthStateChanged } from 'firebase/auth';

import { auth } from '@@services/auth/firebase';
import { useDispatch } from '@@store/index';
import {
  setIsAuthenticated,
  setIsLoadingUser,
  setUser,
} from '@@store/user/slice';
import { useCreateUserMutation, useLazyGetCurrentUserQuery } from '@@api/user';

import { PUBLIC_ROUTES, ROUTES } from '@@constants/routes';

export const useAuth = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [createUser] = useCreateUserMutation();
  const [getCurrentUser] = useLazyGetCurrentUserQuery();

  const handleUser = async (user: User) => {
    if (user) {
      try {
        const currentUser = await getCurrentUser().unwrap();
        dispatch(setUser(currentUser));
      } catch {
        const currentUser = await createUser({
          data: { name: user.displayName || user.email, email: user.email },
        }).unwrap();
        dispatch(setUser(currentUser));
      }

      dispatch(setIsAuthenticated(true));

      if (PUBLIC_ROUTES.some((route) => pathname.includes(route))) {
        navigate(ROUTES.TEMPLATES.INDEX);
      }
    } else {
      dispatch(setIsAuthenticated(false));
    }

    dispatch(setIsLoadingUser(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser);

    return unsubscribe;
  }, []);
};
