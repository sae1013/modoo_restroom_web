import Login from '@/components/auth/Login';
import { Suspense } from 'react';

const Page = () => {
  return (
    <Suspense>
      <Login></Login>;
    </Suspense>
  );
};
export default Page;
