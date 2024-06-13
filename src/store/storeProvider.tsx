import RootStore from '@/store';
import React, { createContext } from 'react';
//Init data store
const store = RootStore.create({
  meters: {
    count: 0,
    next_link: 0,
    previous: 0,
    loading_status: '',
    list: [],
    hasEmpryAdresses: false,
    count_deleted: 0,
  },
  areas: {
    count: 0,
    next_link: '',
    previous: '',
    loading_status: '',
    list: [],
    limit: 0,
  },
});

export const StoreContext = createContext(store);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
