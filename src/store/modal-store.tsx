import Router from 'next/router';
import { createStore } from 'zustand/vanilla';
import { ComponentType } from 'react';

export type ModalState = {
  modalStack: ModalOption[];
};

export type ModalActions = {
  openModal: () => void;
  closeModal: () => void;
};

export type ModalStore = ModalState & ModalActions;

export interface ModalOption {
  component: ComponentType<any>;
  props: any;
  key: string;
}

export const createModalStore = () => {
  return createStore<ModalStore>()((set, get) => {
    return {
      modalStack: [],

      openModal: (option: ModalOption) => {
        set((state: ModalState) => {
          return {
            modalStack: [...state.modalStack, option],
          };
        });

      },

      closeModal: (key: string) => {
        set((state) => {
          if (!key) {
            return {
              modalStack: state.modalStack.slice(0, -1),
            };
          }
          // 해당 key값에 맞는 모달을 pop
          const newModalStack = state.modalStack.filter(x => x.key !== key);
          return {
            modalStack: newModalStack,
          };
        });
      },
    };
  });
};
