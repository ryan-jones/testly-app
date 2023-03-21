import { ToastPosition, useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

const BASE_CONFIG = {
  position: 'top-right' as ToastPosition,
  isCloseable: true,
  duration: 3000,
};

const useToaster = () => {
  const toast = useToast();

  const successToast = useCallback(
    (title: string, description?: string) => {
      toast({ ...BASE_CONFIG, title, description, status: 'success' });
    },
    [toast]
  );

  const errorToast = useCallback(
    (title: string, description?: string) => {
      toast({ ...BASE_CONFIG, title, description, status: 'error' });
    },
    [toast]
  );

  return { successToast, errorToast };
};

export default useToaster;
