// 'use client';
//
// import { type ReactNode, createContext, useRef, useContext, useEffect } from 'react';
// import { useStore } from 'zustand';
//
// import { type UserStore, createUserStore } from '@/store/user-store';
//
// export type UserStoreApi = ReturnType<typeof createUserStore>
//
// export const UserStoreContext = createContext<UserStoreApi | undefined>(undefined);
//
// export interface UserStoreProviderProps {
//   children: ReactNode;
// }
//
// export const UserStoreProvider = ({ data, children }: UserStoreProviderProps) => {
//   const storeRef = useRef<UserStoreApi>(null);
//   // hydrate일때 스토어 중복 초기화 방지.
//   if (!storeRef.current) {
//     storeRef.current = createUserStore(data);
//   }
//
//   return (
//     <UserStoreContext.Provider value={storeRef.current}>
//       {children}
//     </UserStoreContext.Provider>
//   );
// };
//
// export const useUserStore = <T, >(
//   selector: (store: UserStore) => T,
// ): T => {
//   const userStoreContext = useContext(UserStoreContext);
//   if (!userStoreContext) {
//     throw new Error(`userStoreContext must be used within CounterStoreProvider`);
//   }
//
//   return useStore(userStoreContext, selector);
// };