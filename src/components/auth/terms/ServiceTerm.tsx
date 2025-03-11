import BottomSheet from '@/components/bottomsheet/BottomSheet';
import useModal from '@/hooks/useModal';
import BsHeader from '@/components/bottomsheet/BsHeader';
import Button from '@/components/common/buttons/Button';
import BsFooter from '@/components/bottomsheet/BsFooter';
import BsContents from '@/components/bottomsheet/BsContents';

const ServiceTerm = () => {
  const { closeModal } = useModal();
  return (
    <BottomSheet>
      <BsHeader onClose={() => {
        closeModal('serviceTerm');
      }}></BsHeader>
      <BsContents>
        서비스 이용약관
      </BsContents>

      <BsFooter>
        <Button onClick={() => {
          closeModal('serviceTerm');
        }}>닫기</Button>

      </BsFooter>
    </BottomSheet>
  );
};

export default ServiceTerm;