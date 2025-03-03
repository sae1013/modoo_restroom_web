import { css } from '../../../styled-system/css';
import BottomSheet from '@/components/bottomsheet/BottomSheet';
import useModal from '@/hooks/useModal';
import BsHeader from '@/components/bottomsheet/BsHeader';
import BsContents from '@/components/bottomsheet/BsContents';
import BsFooter from '@/components/bottomsheet/BsFooter';
import Image from 'next/image';

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
            marginBottom: '1rem',
          })}
        >
          <Image
            src="/images/pee.png"
            alt="호민"
            width={160}
            height={300}
            className={css({
              margin: 'auto',
            })}
          />
        </div>

        <div>
          <p
            className={css({
              fontWeight: 800,
              textAlign: 'center',
              color: 'rgb(0, 0,0,0.8)',
              marginBottom: '1rem',
            })}
          >
            아직 해당 장소에는 화장실 정보가 없어요
          </p>
          <p
            className={css({
              fontWeight: 800,
              textAlign: 'center',
              color: 'rgb(0, 0,0,0.8)',
            })}
          >
            다른 급한 이들을 위해 소중한 정보를 공유해주세요
          </p>
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
