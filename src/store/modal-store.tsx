import Router from 'next/router';
import { ReactNode } from 'react';
import { createStore } from 'zustand/vanilla';

export interface IModalOption {
  component: ReactNode;
}

export type ModalState = {
  modalStack: IModalOption[];
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
      modalStack: [],
      hashStack: [],

      openModalState: (modal, hashName = 'modal') => {
        set((state) => {
          return {
            modalStack: [...state.modalStack, modal],
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
          modalStack: [...state.modalStack.slice(0, -1)],
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
