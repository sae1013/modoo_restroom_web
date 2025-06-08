import { css } from '@styled-system/css';
import BottomSheet from '@/components/bottomsheet/BottomSheet';
import useModal from '@/hooks/useModal';
import BsHeader from '@/components/bottomsheet/BsHeader';
import BsContents from '@/components/bottomsheet/BsContents';
import BsFooter from '@/components/bottomsheet/BsFooter';
import RegisterBottomSheet from './RegisterBottomSheet';
import Button from '@/components/common/buttons/Button';

const EmptyBottomSheet = (props) => {
  const { closeModal, openModal } = useModal();
  const { name, roadAddress, jibunAddress, lat, lng, setPlaces } = props;
  return (
    <BottomSheet
      {...props}
      onCloseCallback={() => {
        console.log('closeCallback');
      }}
    >
      <BsHeader
        onClose={() => {
          closeModal();
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
              backgroundImage: `url('/images/empty_place.png')`,
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
        <Button
          mode="haptic"
          onClick={() => {
            closeModal();
            setTimeout(() => {
              openModal({
                component: RegisterBottomSheet,
                props: {
                  name, roadAddress, jibunAddress, lat, lng, setPlaces, mode: 'newPlace',
                },
                key: 'register',
              });
            }, 500);
          }}
        >
          리뷰 남기기
        </Button>
      </BsFooter>
    </BottomSheet>
  );
};

export default EmptyBottomSheet;
