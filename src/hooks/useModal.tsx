import { useModalStore } from '@/provider/root-store-provider';
import { ModalOption } from '@/store/modal-store';

const useModal = () => {
  const modalStore = useModalStore(state => state);

  const openModal = (option: ModalOption) => {
    modalStore.openModal(option);
  };

  const closeModal = () => {
    modalStore.closeModal();
  };
  return [openModal, closeModal];
};

export default useModal;
