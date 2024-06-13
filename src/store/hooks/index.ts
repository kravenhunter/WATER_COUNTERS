import { StoreContext } from '@/store/storeProvider';
import { useContext } from 'react';

export const useStore = () => useContext(StoreContext);
