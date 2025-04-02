// 해당 파일은 app/test/layout.tsx 파일
'use client';
import Test from '../../components/Test';
import Header from '@/components/common/Header';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { usePlaces } from '@/lib/apis/place';

const PageLayout = ({ children }) => {
  return children;
};

export default PageLayout;
