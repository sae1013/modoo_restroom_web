import { css } from '@styled-system/css';
import Horizontal from '@/components/common/Horizontal';
import Button from '@/components/common/buttons/Button';
import ReviewCardBody from '@/components/common/cards/ReviewCardBody';
import ReviewCardFooter from '@/components/common/cards/ReviewCardFooter';

const MyProfile = () => {
  return (
    <div className={css({
      paddingTop: '80px',
      padding: '80px 24px',
    })}>
      {/*유저 아이디, 작성리뷰갯수*/}
      <div className={css({
        marginBottom: '16px',
      })}>
        <p className={css({
          fontSize: '20px',
          fontWeight: '600',
          // textAlign:'center'
        })}>아주빠른 호랑이</p>
        <p className={css({
          color: '#757575',
          fontSize: '14px',
        })}>나의 리뷰: 3곳</p>
      </div>
      <Button>프로필 수정</Button>
      <Horizontal marginTop={'16px'}></Horizontal>

      <section className={css({})}>
        {/* 헤더영역*/}
        <div className={css({
          display: 'flex',
          justifyContent: 'center',
          marginTop: '16px',
        })}>
          <button className={css({
            color: '#aaa',
            borderBottom: '2px solid #55BCBD',
            fontWeight: '500',
          })}>내가 작성한 리뷰
          </button>
        </div>

        {/* 컨텐츠영역*/}
        <ul className={css({
          marginTop: '20px',
          '& > li': {
            marginBottom: '16px',
          },
        })}>
          {/*컨텐츠 영역*/}
          {[1, 2, 3].map((item, i) => {
            return (
              <li key={i}
                  className={css({ borderBottom: '2px solid #f2f2f2' })}>
                <div
                  className={css({
                    fontSize: '16px',
                    fontWeight: '600',
                    display: 'flex',

                  })}>
                  <p>장소: 연화로 99</p>
                  <div
                    className={css({
                      marginLeft: 'auto',
                      color: '#757575',
                      fontSize: '14px',
                    })}>
                    <button
                      className={css({
                        marginRight: '10px',
                      })}>편집
                    </button>
                    <button>삭제</button>
                  </div>
                </div>
                <ReviewCardBody>
                  화장실 비밀번호 5633 여자 3322 입니다. 개좋았어요 휴지없음. 화장실 개추움. 비번자주바뀜.
                </ReviewCardBody>
                <ReviewCardFooter tags={['장애인 화장실', '남녀혼용']} date={'2025.03.21'} />
              </li>
            );
          })}

        </ul>
      </section>
    </div>
  );
};

export default MyProfile;