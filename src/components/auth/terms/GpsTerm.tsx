import BottomSheet from '@/components/bottomsheet/BottomSheet';
import useModal from '@/hooks/useModal';
import BsHeader from '@/components/bottomsheet/BsHeader';
import Button from '@/components/common/buttons/Button';
import BsFooter from '@/components/bottomsheet/BsFooter';
import BsContents from '@/components/bottomsheet/BsContents';

const GpsTerm = () => {
  const { closeModal } = useModal();
  return (
    <BottomSheet>
      <BsHeader onClose={() => {
        closeModal('gpsTerm');
      }}></BsHeader>
      <BsContents>
        서비스 이용약관
      </BsContents>

      <BsFooter>
        <Button variant="wide" onClick={() => {
          closeModal('gpsTerm');
        }}>닫기</Button>
      </BsFooter>
    </BottomSheet>
  );
};

export default GpsTerm;