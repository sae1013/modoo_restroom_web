// app/test/page.tsx 파일
'use client';

import { useEffect, useState } from 'react';
import { useUserStore } from '@/provider/user-store-provider';

const TestPage = () => {
  const { user, setUser } = useUserStore(state => state);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://jsonplaceholder.typicode.com/api/v1/posts');
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);
  console.log('user', user);
  return data.map(item => {
    return <div>{item.title}</div>;
  });

};

export default TestPage;
