import { combineReducers } from 'redux';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import uiReducer from '@@store/ui/slice';

const rootReducer = combineReducers({
  ui: uiReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = useReduxDispatch;
