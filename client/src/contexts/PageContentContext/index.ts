import { createContext, useContext } from 'react';

interface PageContentContextValue<D = unknown> {
  data: D;
  isLoading: boolean;
  refetch: () => void;
}

const PageContentContext = createContext<PageContentContextValue | null>(null);

export const PageContentContextProvider = PageContentContext.Provider;

export const usePageContentContext = <T>() => {
  const context = useContext<PageContentContextValue<T>>(PageContentContext);

  if (!context) {
    throw new Error(
      'usePageContentContext has to be used within <PageContentContextProvider>',
    );
  }

  return context;
};
