// 해당 파일은 app/test/layout.tsx 파일
import Test from '../../components/Test';
import Header from '@/components/Header';
const PageLayout = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <Test>{children}</Test>
    </div>
  );
};

export default PageLayout;
