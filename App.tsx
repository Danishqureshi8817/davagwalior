import React from 'react'
import AppNavigator from '@navigation/index';
import { Toaster } from '@masumdev/rn-toast';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@utils/react-query-config';
import useInAppUpdate from '@utils/useInAppUpdate';
// #20bf6b
const App = () => {
  useInAppUpdate();
  
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
       customColors={{
        success: { background: '#e6ffe6', text: '#006600'},
        error: { background: '#ffe6e6', text: '#cc0000' },
        info: { background: '#e6f2ff', text: '#0066cc' }
      }}
      />
      <AppNavigator />
    </QueryClientProvider>
  )
}

export default App