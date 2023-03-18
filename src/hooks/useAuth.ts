import { AuthContext } from '@/contexts/AuthContext';
import { IAuthContext } from '@/types/auth';
import { useContext } from 'react';

export const useAuth = () => useContext<IAuthContext>(AuthContext);
