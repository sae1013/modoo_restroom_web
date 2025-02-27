import { createUserStore, type UserState } from './user-store';
import { createModalStore } from './modal-store';

export type RootStores = {
  userStore: ReturnType<typeof createUserStore>;
  modalStore: ReturnType<typeof createModalStore>;
};

export const createRootStore = (initialUserState: UserState): RootStores => {
  return {
    userStore: createUserStore(initialUserState),
    modalStore: createModalStore(),
  };
};
