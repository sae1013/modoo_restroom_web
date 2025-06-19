import BottomSheet from '@/components/bottomsheet/BottomSheet';
import useModal from '@/hooks/useModal';
import BsHeader from '@/components/bottomsheet/BsHeader';
import Button from '@/components/common/buttons/Button';
import BsFooter from '@/components/bottomsheet/BsFooter';
import BsContents from '@/components/bottomsheet/BsContents';
import { css } from '@styled-system/css';

const GpsTerm = () => {
  const { closeModal } = useModal();
  return (
    <BottomSheet>
      <BsHeader onClose={() => {
        closeModal('gpsTerm');
      }}>
        <p className={css({
          fontWeight: 700,
          padding: '16px 16px 8px',
          fontSize: '18px',
        })}>위치정보기반 서비스 이용약관</p>
      </BsHeader>
      <BsContents>
        <div className={css({
          paddingBottom: '50px',
        })}>
          <p>제1조 (목적)<br />
            이 약관은 해우소(이하 “회사”)가 제공하는 위치정보 기반 주변 화장실 안내 서비스(이하 “서비스”)의 이용과 관련하여 회사와 이용자의 권리ㆍ의무 및 책임사항, 기타 필요한 사항을 규정함을
            목적으로
            합니다.</p>

          <p>제2조 (용어의 정의)<br />
            ① “위치정보”라 함은 단말기 및 이용자의 현재 위치를 의미합니다.<br />
            ② “위치기반서비스”라 함은 위치정보를 활용하여 이용자에게 다양한 콘텐츠 및 편의기능을 제공하는 서비스를 말합니다.</p>

          <p>제3조 (서비스 제공 및 변경)<br />
            회사는 위치정보를 수집·이용하여 주변 화장실 정보를 지도, 거리, 이용시간 등의 형태로 제공합니다. 회사는 서비스의 일부 또는 전부를 사전 공지 후 변경, 중단할 수 있습니다.</p>

          <p>제4조 (위치정보의 수집·이용)<br />
            ① 회사는 서비스 제공을 위해 앱 실행 시 이용자의 위치정보 수집에 대한 동의를 받습니다.<br />
            ② 수집 항목: GPS 등 단말기 위치좌표 (위도·경도)<br />
            ③ 이용 목적: 주변 화장실 검색·조회 및 위치기반 맞춤 안내</p>

          <p>제5조 (위치정보의 제3자 제공)<br />
            회사는 이용자의 사전 동의 없이 위치정보를 제3자에게 제공하지 않습니다. 다만, 법령에 따라 수사기관 등의 요청이 있는 경우에는 예외로 합니다.</p>

          <p>제6조 (위치정보의 보유·파기)<br />
            ① 회사는 수집된 위치정보를 서비스 제공 목적 달성 시 지체 없이 파기합니다.<br />
            ② 단, 내부 통계·서비스 개선 목적으로 보유할 경우에는 익명 처리하여 보관하며, 해당 정보는 제3자에게 제공되지 않습니다.</p>

          <p>제7조 (이용자의 권리와 의무)<br />
            ① 이용자는 언제든지 위치정보 제공을 거부할 수 있으며, 거부 시 서비스 이용이 제한될 수 있습니다.<br />
            ② 이용자는 허위의 위치정보를 제공하거나 타인의 위치정보를 무단으로 사용해서는 안 됩니다.</p>

          <p>제8조 (회사의 의무)<br />
            ① 회사는 관련 법령에 따라 위치정보 보호를 위해 기술적·관리적 안전조치를 이행합니다.<br />
            ② 회사는 이용자의 위치정보 오·남용 방지를 위해 내부 관리계획을 수립·시행합니다.</p>

          <p>제9조 (책임의 한계 및 면책)<br />
            ① 회사는 천재지변, 통신 장애 등 불가항력적 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.<br />
            ② 회사는 이용자가 제공한 부정확한 위치정보로 발생한 손해에 대해 책임을 지지 않습니다.</p>

          <p>제10조 (약관의 변경 및 공지)<br />
            ① 회사는 필요 시 약관을 개정할 수 있으며, 개정된 약관은 앱 공지 또는 팝업을 통해 공지합니다.<br />
            ② 개정된 약관은 공지일로부터 7일 후 효력이 발생합니다.</p>

          <p>부칙 (시행일)<br />
            이 약관은 2025년 5월 13일부터 적용됩니다.</p>
        </div>
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
