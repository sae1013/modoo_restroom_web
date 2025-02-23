// app/components/Test.tsx파일
'use client';
import { useState } from 'react';

const Test = ({ children }) => {
  const [name, _] = useState(null);
  return <div>
    <div>hello</div>
    {children}</div>;
};
export default Test;