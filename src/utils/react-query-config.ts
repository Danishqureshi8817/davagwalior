import { AppState } from 'react-native';
import { focusManager, QueryClient, onlineManager } from '@tanstack/react-query';
// import NetInfo from '@react-native-community/netinfo';

import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity
    },
    mutations: {
      onError: console.log,
      // onSuccess: console.log,
    },
  },
});

focusManager.setEventListener((handleFocus: any) => {
  AppState.addEventListener('change', handleFocus);
  return () => {
    console.log('removeEventListener')
  };
});