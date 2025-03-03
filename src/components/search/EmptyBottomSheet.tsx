import { css } from '@styled-system/css';
import BottomSheet from '@/components/bottomsheet/BottomSheet';
import useModal from '@/hooks/useModal';
import BsHeader from '@/components/bottomsheet/BsHeader';
import BsContents from '@/components/bottomsheet/BsContents';
import BsFooter from '@/components/bottomsheet/BsFooter';
import RegisterBottomSheet from './RegisterBottomSheet';

const EmptyBottomSheet = () => {
  const { closeModal, openModal } = useModal();

  return (
    <BottomSheet
      onCloseCallback={() => {
        console.log('closeCallback');
      }}
    >
      <BsHeader
        onClose={() => {
          closeModal('unregistered');
        }}
      ></BsHeader>

      <BsContents>
        <div
          className={css({
            width: '50%',
            margin: 'auto',
          })}
        >
          <div
            className={css({
              width: '100%',
              paddingBottom: '133.33%',
              marginBottom: '1rem',
              backgroundImage: `url('/images/pee.png')`,
              backgroundSize: 'cover', // 이미지 크기를 컨테이너에 맞춤
              backgroundPosition: 'center', // 중앙 정렬
              backgroundRepeat: 'no-repeat', // 반복 방지
            })}
          ></div>
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
          onClick={() => {
            closeModal('unregistered');
            setTimeout(() => {
              openModal({
                component: RegisterBottomSheet,
                props: {},
                key: 'register',
              });
            }, 500);
          }}
        >
          리뷰남기기
        </button>
      </BsFooter>
    </BottomSheet>
  );
};

export default EmptyBottomSheet;
