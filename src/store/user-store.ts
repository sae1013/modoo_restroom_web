import { createStore } from 'zustand/vanilla';

export type User = {
  email: string;
};
export type UserState = {
  user: User | null;
};

export type UserActions = {
  setUser: (user: UserState) => void;
};

export type UserStore = UserState & UserActions;

export const defaultIntialState: UserStore = {
  user: null,
};

export const createUserStore = (initState: UserState = defaultIntialState) => {
  return createStore<UserStore>()((set) => {
    return {
      ...initState,
      setUser: (newUser: User) => set(() => ({ user: newUser })),
    };
  });
};
