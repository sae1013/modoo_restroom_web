import { css } from '@styled-system/css';
import { UserProfile } from '@/store/user-store';

interface InfoProps {
  reviewCnt: number;
  user: UserProfile;
}

const Info = ({ reviewCnt, user }: InfoProps) => {
  console.log(user);
  return (
    <div
      className={css({
        marginBottom: '16px',
      })}
    >
      <p
        className={css({
          fontSize: '20px',
          fontWeight: '600',
        })}
      >
        {user?.nickname}
      </p>
      <p
        className={css({
          color: '#757575',
          fontSize: '14px',
        })}
      >
        나의 리뷰: {reviewCnt}곳
      </p>
    </div>
  );
};

export default Info;
