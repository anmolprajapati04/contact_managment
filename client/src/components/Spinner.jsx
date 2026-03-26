import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#3B82F6"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default Spinner;