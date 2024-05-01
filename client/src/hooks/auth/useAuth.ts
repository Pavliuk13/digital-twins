import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@@services/auth/firebase';
import { useDispatch } from '@@store/index';
import { setIsAuthenticated, setIsLoadingUser } from '@@store/user/slice';

import { ROUTES } from '@@constants/routes';

export const useAuth = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleUser = (user) => {
    if (user) {
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
