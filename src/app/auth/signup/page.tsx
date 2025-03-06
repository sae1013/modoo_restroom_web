import Signup from '@/components/auth/Signup';
import { css } from '@styled-system/css';

const Page = () => {
  return (
    <div
      className={css({
        padding: '2rem',
        width: '100wh',
        height: '100vh',
        paddingTop: '80px',
      })}
    >
      <Signup />
    </div>
  );
};

export default Page;
