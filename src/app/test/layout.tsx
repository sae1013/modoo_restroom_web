// 해당 파일은 app/test/layout.tsx 파일
import Test from '../../components/Test';

const PageLayout = ({ children }) => {

  return (
    <div>
      <Test>
        {children}
      </Test>
    </div>
  );
};

export default PageLayout;