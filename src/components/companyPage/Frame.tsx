import React from 'react';

interface FrameProps {
  title: string;
  children: React.ReactNode;
}

const Frame: React.FC<FrameProps> = ({ title, children }) => {
  return (
    <div className='w-full py-12 px-[62px] bg-neutral-1 rounded-2xl overflow-hidden'>
      <h4 className='pb-4 border-b border-neutral-6'>{title}</h4>
      <div className='mt-6'>{children}</div>
    </div>
  );
};

export default Frame;
