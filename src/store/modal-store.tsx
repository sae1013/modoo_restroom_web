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
        // TODO: 이미 열려있는 key값 모달은 열지않도록.
        set((state: ModalState) => {
          return {
            modalStack: [...state.modalStack, option],
          };
        });
      },

      closeModal: (key: string) => {
        set((state) => {
          if (state.modalStack.length < 1) return;
          // key를 입력하지 않으면 맨 마지막 팝업 닫기
          if (!key) {
            return {
              modalStack: state.modalStack.slice(0, -1),
            };
          }
          // 해당 key값에 맞는 모달을 염
          const newModalStack = state.modalStack.filter((x) => x.key !== key);
          return {
            modalStack: newModalStack,
          };
        });
      },
    };
  });
};
