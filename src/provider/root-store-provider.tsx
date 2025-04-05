'use client';

import { createContext, type ReactNode, useContext, useRef } from 'react';
import { createRootStore, type RootStores } from '@/store/root-store';
import { useStore } from 'zustand';
import { type UserState, UserStore } from '@/store/user-store';
import { ModalStore } from '@/store/modal-store';
import { MapStore } from '@/store/map-store';

export interface RootStoreProviderProps {
  children: ReactNode;
  /** SSR 등에서 preload한 초기 user 데이터를 전달 (없으면 기본값 사용) */
  userData?: UserState;
}

const RootStoreContext = createContext<RootStores | null>(null);

export const RootStoreProvider = ({ children, userData }: RootStoreProviderProps) => {
  const storesRef = useRef<RootStores | null>(null);
  if (!storesRef.current) {
    // userData가 없으면 기본값 { user: null } 사용
    storesRef.current = createRootStore(userData ?? { user: null });
  }

  return <RootStoreContext.Provider value={storesRef.current}>{children}</RootStoreContext.Provider>;
};

export const useRootStore = (): RootStores => {
  const context = useContext(RootStoreContext);
  if (!context) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }
  return context;
};

// 하위 컴포넌트에서 userStore에 접근할 수 있도록 헬퍼 훅도 제공합니다.
export const useUserStore = <T, >(selector: (store: UserStore) => T): T => {
  const { userStore } = useRootStore();
  return useStore(userStore, selector);
};

export const useModalStore = <T, >(selector: (store: ModalStore) => T): T => {
  const { modalStore } = useRootStore();
  return useStore(modalStore, selector);
};

export const useMapStore = <T, >(selector: (store: MapStore) => T): T => {
  const { mapStore } = useRootStore();
  return useStore(mapStore, selector);
};