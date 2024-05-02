import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, onAuthStateChanged } from 'firebase/auth';

import { auth } from '@@services/auth/firebase';
import { store, useDispatch } from '@@store/index';
import { setIsAuthenticated, setIsLoadingUser } from '@@store/user/slice';

import { ROUTES } from '@@constants/routes';
import userApi from '@@api/user';

export const useAuth = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleUser = async (user: User) => {
    if (user) {
      const isNewUser =
        user.metadata.creationTime === user.metadata.lastSignInTime;

      if (isNewUser) {
        await store.dispatch(
          userApi.endpoints.createUser.initiate({
            data: { name: user.displayName || user.email, email: user.email },
          }),
        );
      }

      dispatch(setIsAuthenticated(true));
      navigate(ROUTES.TEMPLATES.INDEX);
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
