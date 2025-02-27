'use client';

import { useModalStore } from '@/provider/root-store-provider';

const TestPage = () => {
  const { openModal } = useModalStore((state) => state);
  return (
    <div>
      <button
        onClick={() => {
          openModal(<div>hello world</div>, 'modaltest');
        }}
      >
        클릭
      </button>
    </div>
  );
};

export default TestPage;
