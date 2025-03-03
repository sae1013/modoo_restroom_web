import BottomSheet from '../bottomsheet/BottomSheet';
import BsContents from '../bottomsheet/BsContents';
import BsHeader from '../bottomsheet/BsHeader';
import BsFooter from '../bottomsheet/BsFooter';
import useModal from '@/hooks/useModal';

const RegisterBottomSheet = () => {
  const { closeModal } = useModal();

  return (
    <BottomSheet>
      <BsHeader
        onClose={() => {
          closeModal('register');
        }}
      ></BsHeader>
      <BsContents></BsContents>
      <BsFooter>
        <button>닫기</button>
      </BsFooter>
    </BottomSheet>
  );
};
export default RegisterBottomSheet;
