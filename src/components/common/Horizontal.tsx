import { CSSProperties } from 'react';
import { css } from 'styled-system/css';

interface IHorizontalProps extends CSSProperties {

}

const Horizontal = (props: IHorizontalProps) => {
  return (
    <div className={css({
      height: '1.5px',
      backgroundColor: '#f2f2f2',
      width: '100%',
      margin: '4px 0px',
      ...props,
    })}>
    </div>
  );
};

export default Horizontal;
