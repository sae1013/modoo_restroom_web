import BottomSheet from '../bottomsheet/BottomSheet';
import BsContents from '../bottomsheet/BsContents';
import BsHeader from '../bottomsheet/BsHeader';
import BsFooter from '../bottomsheet/BsFooter';
import useModal from '@/hooks/useModal';
import SelectButton from '@/components/common/buttons/SelectButton';

import { css } from '@styled-system/css';

import StarRatingPicker from '@/components/common/starRatings/StarRatingPicker';
import Button from '@/components/common/buttons/Button';
import ReviewTextArea from '@/components/common/textAreas/ReviewTextArea';

const ReviewBottomSheet = () => {
  const { openModal, closeModal } = useModal();
  return (
    <BottomSheet>
      <BsHeader onClose={() => {
        closeModal('reviewBottomSheet');
      }}></BsHeader>

      <BsContents>

      </BsContents>
      <BsFooter>
        <Button>리뷰 남기기</Button>
      </BsFooter>
    </BottomSheet>
  );
};

export default ReviewBottomSheet;