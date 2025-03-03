/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect } from 'react';
import { useUserStore } from '@/provider/root-store-provider';
import { css } from '@styled-system/css';
import { styled } from '@styled-system/jsx';

interface HeaderProps {
  data: any;
}

const Header = ({ data }: HeaderProps) => {
  const { setUser } = useUserStore((state) => state);

  useEffect(() => {
    setUser(data);
  }, [data]);

  return null;
};
export default Header;
