'use client';
import { useUserStore } from '@/provider/user-store-provider';
import { useEffect } from 'react';

const Header = (props: { data: any }) => {
  const { user, setUser } = useUserStore(state => state);

  return <div>헤더ㅗ영역 {user?.email} </div>;


};
export default Header;