import { createUserStore, type UserState } from './user-store';
import { createModalStore } from './modal-store';
import { createMapStore } from '@/store/map-store';

export type RootStores = {
  userStore: ReturnType<typeof createUserStore>;
  modalStore: ReturnType<typeof createModalStore>;
  mapStore: ReturnType<typeof createMapStore>;
};

export const createRootStore = (initialUserState: UserState): RootStores => {
  return {
    userStore: createUserStore(initialUserState),
    modalStore: createModalStore(),
    mapStore: createMapStore(),
  };
};
