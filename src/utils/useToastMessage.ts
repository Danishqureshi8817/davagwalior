import { useToast, ToastType } from '@masumdev/rn-toast';

export function useToastMessage() {
  const { showToast } = useToast();

  const toast = (message: string, type: ToastType = 'success') => {
    showToast(message, type);
  };

  const toastSuccess = (message: string) => toast(message, 'success');
  const toastError = (message: string) => toast(message, 'error');
  const toastWarning = (message: string) => toast(message, 'info');

  return {
    toast,
    toastSuccess,
    toastError,
    toastWarning
  };
}
