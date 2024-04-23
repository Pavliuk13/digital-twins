import { combineReducers } from 'redux';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import uiReducer from '@@store/ui/slice';
import modalsReducer from '@@store/modals/slice';

import api from '@@api/rtk';

import { modalAsyncAnimationMiddleware } from '@@store/middlewares/modalAsyncAnimationMiddleware';

const rootReducer = combineReducers({
  ui: uiReducer,
  modals: modalsReducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(api.middleware)
      .concat([modalAsyncAnimationMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = useReduxDispatch;
