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
      <BsContents>
        <div>
          <p>화장실 리뷰는 남기고</p>
          <p>나머지는 비우고</p>
        </div>

        <div>
          <p>*****</p>
        </div>

        <div>

        </div>

      </BsContents>
      <BsFooter>
        <button>닫기</button>
      </BsFooter>
    </BottomSheet>
  );
};
export default RegisterBottomSheet;
