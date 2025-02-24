import { createUserStore, type UserStore, type UserState } from './user-store';

export type RootStores = {
  userStore: ReturnType<typeof createUserStore>;
};

export const createRootStore = (initialUserState: UserState): RootStores => {
  return {
    userStore: createUserStore(initialUserState),
    // 추가 스토어 초기화: settingsStore: createSettingsStore(initialSettingsState),
  };
};
