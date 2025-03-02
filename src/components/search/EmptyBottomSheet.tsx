import BottomSheet from '@/components/bottomsheet/BottomSheet';
import useModal from '@/hooks/useModal';
import BsHeader from '@/components/bottomsheet/BsHeader';
import BsContents from '@/components/bottomsheet/BsContents';
import BsFooter from '@/components/bottomsheet/BsFooter';
import { css } from '../../../styled-system/css';

const EmptyBottomSheet = () => {
  const { closeModal } = useModal();

  return (
    <BottomSheet onCloseCallback={() => {
      console.log('closeCallback');
    }}>

      <BsHeader onClose={() => {
        closeModal('bottomsheet1');
      }}>
      </BsHeader>

      <BsContents>
        <div>Contents 내용입니다.</div>
      </BsContents>

      <BsFooter>
        <button
          style={{
            position: 'relative',
            bottom: 0,
            width: '100%',
            height: '50px',
            outline: 'none',
            border: 'none',
            fontSize: '1rem',
            cursor: 'pointer',
            background: '#55CBCD',
            borderRadius: '10px',
            color: 'white',
          }}
        >
          등록하기
        </button>
      </BsFooter>

    </BottomSheet>
  );
};

export default EmptyBottomSheet;