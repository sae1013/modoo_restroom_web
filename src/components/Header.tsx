'use client';
import { useUserStore } from '@/provider/root-store-provider';
import { useEffect } from 'react';


const Header = (props: { data: any }) => {
  const { user, setUser } = useUserStore(state => state);
  useEffect(() => {
    console.log(user);
  });
  return <div>헤더ㅗ영역 {user?.email} </div>;


};
export default Header;