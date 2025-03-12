'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  // const router = useRouter();

  return (
    <AnimatePresence>
      <motion.div
        // key={router} // 라우트 변경시 새로운 key 부여
        initial={{ opacity: 1, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.1 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
export default Layout;
