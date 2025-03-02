'use client';
import useModal from '@/hooks/useModal';
import BottomSheet from '@/components/bottomsheet/BottomSheet';

const TestPage = () => {
  const [openModal, closeModal] = useModal();
  return (
    <div>
      <button
        onClick={() => {
          openModal({
            component: BottomSheet,
            props: {
              name: 'jmw93',
            },
            key: 'bottomsheet',
          });
        }}
      >
        클릭
      </button>
      <button onClick={
        () => {
          closeModal('bottomsheet');
        }
      }>닫기
      </button>
    </div>
  );
};

export default TestPage;
