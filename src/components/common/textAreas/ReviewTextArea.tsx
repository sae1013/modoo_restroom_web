import { css } from '@styled-system/css';
import { ChangeEvent, SetStateAction } from 'react';

interface IReviewTextAreaProps {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

const ReviewTextArea = ({ onChange, value, ...props }: IReviewTextAreaProps) => {
  return (
    <textarea placeholder={'소중한 리뷰를 남겨주세요.'} className={css({
      width: '100%',
      // minHeight: '150px',
      padding: '12px',
      // lineHeight: 1.5,
      border: '1px solid #ccc',
      borderRadius: '8px',
      // resize: 'vertical',
      // transition: 'border - color 0.3s ease, box-shadow 0.3s ease',
      _placeholder: {
        color: '#aaa',
      },
      _focus: {
        outline: 'none',
        borderColor: '#55CBCD',
        boxShadow: '0 0 5px rgba(85, 203, 205, 0.6)',
      },
    })}
              value={value}
              onChange={onChange}
              {...props}
    />);

};
export default ReviewTextArea;