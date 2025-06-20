import BottomSheet from '@/components/bottomsheet/BottomSheet';
import useModal from '@/hooks/useModal';
import BsHeader from '@/components/bottomsheet/BsHeader';
import Button from '@/components/common/buttons/Button';
import BsFooter from '@/components/bottomsheet/BsFooter';
import BsContents from '@/components/bottomsheet/BsContents';
import { css } from '@styled-system/css';

const PrivacyTerm = () => {
  const { closeModal } = useModal();

  return (
    <BottomSheet>
      <BsHeader onClose={() => {
        closeModal('privacyTerm');
      }}>
        <p className={css({
          fontWeight: 700,
          padding: '16px 16px 8px',
          fontSize: '18px',
        })}>개인정보처리방침</p>
      </BsHeader>
      <BsContents>
        <div className={css({
          paddingBottom: '50px',

        })}>
          <p>제1조 (개인정보의 처리 목적)<br />
            해우소(이하 “회사”)는 다음의 목적을 위하여 개인정보를 처리합니다. 처리한 개인정보는 다음 목적 이외의 용도로는 사용되지 않으며, 목적이 변경될 시에는 사전 동의를 받습니다.<br />
            1. 위치정보 기반 화장실 검색 및 추천 서비스 제공<br />
            2. 서비스 이용 통계 분석 및 품질 개선<br />
            3. 고객 문의 응대 및 민원 처리</p>

          <p>제2조 (처리하는 개인정보 항목)<br />
            회사는 서비스 제공을 위해 최소한의 개인정보 항목만을 수집합니다.<br />
            1. 필수 수집 항목: 위치정보(위도·경도), 디바이스 식별자(앱 설치 ID)<br />
            2. 선택 수집 항목: 서비스 이용 중 별도 입력하는 닉네임, 피드백 내용</p>

          <p>제3조 (개인정보의 수집 방법)<br />
            회사는 다음과 같은 방법으로 개인정보를 수집합니다.<br />
            1. 앱 이용 중 위치정보 수집 동의 화면을 통한 직접 입력 및 동의<br />
            2. 자동 생성되는 디바이스 정보 수집</p>

          <p>제4조 (개인정보의 보유 및 이용 기간)<br />
            회사는 개인정보 보유 기간이 경과하거나 처리 목적이 달성된 경우에는 해당 정보를 지체 없이 파기합니다.<br />
            1. 위치정보: 서비스 이용 종료 후 즉시 파기<br />
            2. 디바이스 식별자: 서비스 이용 종료 후 6개월 이내<br />
            3. 익명 처리된 통계 데이터: 별도 보유 정책에 따라 최대 3년</p>

          <p>제5조 (개인정보의 제공 및 위탁)<br />
            회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 아래의 경우 예외로 합니다.<br />
            1. 이용자가 사전에 동의한 경우<br />
            2. 법령의 규정에 따라 수사·조사 목적으로 국가기관의 요구가 있는 경우<br />
            3. 서비스 제공을 위해 필요한 경우(예: 지도 API 제공사에 위치정보 암호화 형태로 위탁)</p>

          <p>제6조 (개인정보의 파기 절차 및 방법)<br />
            1. 파기 절차: 보유 기간 종료 또는 처리 목적 달성 시 내부 방침에 따라 파기 대상 선정<br />
            2. 파기 방법: 전자적 파일 형태는 복구 불가능한 방법으로, 종이 문서 등은 소각 또는 분쇄</p>

          <p>제7조 (정보주체의 권리·의무 및 행사 방법)<br />
            1. 이용자는 언제든지 개인정보 열람·정정·삭제·처리 정지를 요청할 권리가 있습니다.<br />
            2. 권리 행사는 앱 내 설정 화면 또는 개인정보보호책임자에게 서면·이메일로 요청하시면 지체 없이 처리합니다.<br />
            3. 이용자는 개인정보 보호를 위해 비밀번호 관리 및 디바이스 보안에 유의해야 합니다.</p>

          <p>제8조 (개인정보 보호를 위한 기술적·관리적 대책)<br />
            회사는 개인정보의 안전성을 확보하기 위해 다음과 같은 대책을 실시합니다.<br />
            1. 개인정보 암호화: 위치정보 및 디바이스 식별자는 암호화하여 저장<br />
            2. 접근 통제: 개인정보 처리 시스템에 대한 접근 권한을 최소화·관리<br />
            3. 보안 프로그램 설치 및 주기적 점검</p>

          <p>제9조 (개인정보 보호책임자)<br />
            회사는 개인정보 처리에 관한 업무를 총괄하여 책임지는 개인정보 보호책임자를 지정하고 있습니다.<br />
            성명: 정민우<br />
            직책: 대표<br />
            연락처: sae1013@gmail.om</p>

          <p>제10조 (개인정보 처리방침의 변경)<br />
            본 방침은 시행일로부터 적용되며, 법령·정책 변경에 따라 내용이 변경될 수 있습니다. 변경 시 앱 공지 또는 팝업을 통해 사전 안내합니다.</p>

          <p>부칙 (시행일)<br />
            이 개인정보처리방침은 2025년 5월 13일부터 시행됩니다.</p>
        </div>
      </BsContents>

      <BsFooter>
        <Button onClick={() => {
          closeModal('privacyTerm');
        }}>닫기</Button>
      </BsFooter>
    </BottomSheet>
  );
};

export default PrivacyTerm;
