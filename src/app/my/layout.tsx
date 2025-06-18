'use client';

import { css } from '@styled-system/css';

const Layout = ({ children }: { children: React.ReactNode }) => {

  return (

    <div className={css({
      padding: '30px 24px',
      paddingTop: 'calc(var(--safe-area-insets-top, 0px) + 60px)',
      height: '100vh',
    })}>
      {children}
    </div>

  );
};
export default Layout;
