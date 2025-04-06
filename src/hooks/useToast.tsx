import toast from 'react-hot-toast';
import { css } from '@styled-system/css';
import React from 'react';

type Type = 'success' | 'error';

const useToast = () => {

  const popToastMessage = (type: Type, message: string) => {
    switch (type) {
      case 'success':
        toast.success(<div className={css({
          fontWeight: 600,
          fontSize: '14px',
          color: '#404040',
        })}>{message}</div>, {
          removeDelay: 400,
        });
        break;

      case 'error':
        toast.error(<div className={css({
          fontWeight: 600,
          fontSize: '14px',
          color: '#404040',
        })}>{message}</div>, {
          removeDelay: 400,
        });
        break;
    }


  };

  return { popToastMessage };
};
export default useToast;