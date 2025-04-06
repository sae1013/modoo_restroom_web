'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const AnimationPageRoute = ({ children }: React.PropsWithChildren) => {

  const pathname = usePathname();
  // const [prevPath, setPrevPath] = useState(pathname);
  // const [direction, setDirection] = useState(1);
  //
  // useEffect(() => {
  //   if (pathname !== prevPath) {
  //     // 단순 비교: 새 경로가 이전 경로보다 크면 forward(1), 아니면 -1
  //     setDirection(pathname > prevPath ? 1 : -1);
  //     setPrevPath(pathname);
  //   }
  // }, [pathname, prevPath]);

  // 애니메이션 variants 정의 (direction 값에 따라 x값이 달라짐)
  const variants = {
    initial: {
      x: 50,      // 새로운 페이지는 오른쪽에서 시작
      opacity: 0.3,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    // exit: {
    //   x: 0,        // 기존 페이지는 수평 이동 없이 제자리에 머무름
    //   opacity: 0,  // 단, 서서히 사라지게(fade out)
    // },
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