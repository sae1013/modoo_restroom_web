'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/provider/root-store-provider';

const useModal = () => {
  const router = useRouter();
  const { openModalState } = useModalStore((state) => state);

  const openModal = () => {
    openModalState();
    // 라우터 이동
    // router.push()
  };
  const closeModal = () => {};
  return [openModal, closeModal];
};
