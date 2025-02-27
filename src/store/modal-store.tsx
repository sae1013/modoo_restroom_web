import Router from 'next/router';
import { createStore } from 'zustand/vanilla';

export type ModalState = {
  componentStack: any[];
  hashStack: any[];
};

export type ModalActions = {
  openModal: () => void;
  closeModal: () => void;
};

export type ModalStore = ModalState & ModalActions;

export const createModalStore = () => {
  return createStore<ModalStore>()((set, get) => {
    return {
      componentStack: [],
      hashStack: [],

      openModalState: (modal, hashName = 'modal') => {
        set((state) => {
          return {
            componentStack: [...state.componentStack, modal],
            hashStack: [...state.hashStack, hashName],
          };
        });
        if (typeof window === 'undefined') return;
        Router.push(`${Router.pathname}#${hashName}`, undefined, { shallow: true });
      },

      closeModalState: () => {
        const state = get();
        if (state.hashStack.length < 1) return;
        set({
          componentStack: [...state.componentStack.slice(0, -1)],
          hashStack: [...state.hashStack.slice(0, -1)],
        });
        const curHashStack = state.hashStack;
        // 맨 마지막 팝업일 때
        if (curHashStack.length < 2) {
          Router.push(`${Router.pathname}`, undefined, { shallow: true });
        }
        Router.push(`${Router.pathname}#${curHashStack[curHashStack.length - 2]}`);
      },
    };
  });
};
