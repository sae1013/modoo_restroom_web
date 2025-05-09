'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const AnimationPageRoute = ({ children }: React.PropsWithChildren) => {

  const pathname = usePathname();
  const variants = {
    initial: {
      opacity: 0.3,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
  };


  return (
    <AnimatePresence mode={'wait'} initial={false}>
      <motion.div
        key={pathname} // 현재 경로에 따라 key를 변경하여 페이지 전환 감지
        // custom={direction}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationPageRoute;
