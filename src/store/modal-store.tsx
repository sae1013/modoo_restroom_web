import { createStore } from 'zustand/vanilla';
import { ComponentType, ReactNode } from 'react';

export type ModalState = {
  modalStack: ModalOption[];
};

export type ModalActions = {
  openModal: () => void;
  closeModal: () => void;
};

export type ModalStore = ModalState & ModalActions;

export interface ModalOption {
  component: ComponentType<any> | ReactNode;
  props: any;
  key: string;
}

export const createModalStore = () => {
  return createStore<ModalStore>()((set, get) => {
    return {
      modalStack: [],

      openModal: (option: ModalOption) => {
        const { key } = option;

        set((state: ModalState) => {
          const isDuplicated = state.modalStack.some((modal) => modal.key === key);

          if (isDuplicated) return {};
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
