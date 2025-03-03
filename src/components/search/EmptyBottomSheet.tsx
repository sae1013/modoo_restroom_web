import BottomSheet from '@/components/bottomsheet/BottomSheet';
import useModal from '@/hooks/useModal';
import BsHeader from '@/components/bottomsheet/BsHeader';
import BsContents from '@/components/bottomsheet/BsContents';
import BsFooter from '@/components/bottomsheet/BsFooter';
import { css } from '../../../styled-system/css';

const EmptyBottomSheet = () => {
  const { closeModal } = useModal();

  return (
    <BottomSheet
      onCloseCallback={() => {
        console.log('closeCallback');
      }}
    >
      <BsHeader
        onClose={() => {
          closeModal('bottomsheet1');
        }}
      ></BsHeader>

      <BsContents>
        <div
          className={css({
            width: '100%',
            height: '250px',
          })}
        >
          이미지
        </div>
        <h1
          className={css({
            color: 'purple',
            fontWeight: 800,
          })}
        >
          끄응...
        </h1>
        <div>
          <p>아직 해당 장소에는 화장실 정보가 없어요</p>
          <p>다른 급한 이들을 위해 소중한 정보를 공유해주세요</p>
        </div>
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
          리뷰남기기
        </button>
      </BsFooter>
    </BottomSheet>
  );
};

export default EmptyBottomSheet;
