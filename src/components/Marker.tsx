import { FaMapMarkerAlt } from 'react-icons/fa';

import React from 'react';

const Marker = (props: { color: string }) => {
  const { color } = props;

  return (
    <div className={'custom-marker'}>
      <FaMapMarkerAlt size={30} fill={color} />
    </div>
  );
};
export default Marker;
