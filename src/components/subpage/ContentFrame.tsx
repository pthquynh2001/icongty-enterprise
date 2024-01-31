import { Skeleton } from 'antd';
import React, { Suspense } from 'react';

interface FrameProps {
  loading?: boolean;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ContentFrame: React.FC<FrameProps> = ({
  title,
  children,
  className,
  loading,
}) => {
  return (
    <div
      className={`w-full py-12 px-[62px] bg-neutral-1 rounded-2xl overflow-hidden ${
        className ? className : ''
      }`}
    >
      {loading ? (
        <Skeleton
          active
          title={false}
          paragraph={{ rows: 1 }}
          className='pb-4 border-b border-neutral-6'
        />
      ) : (
        <h4 className='pb-4 border-b border-neutral-6'>{title}</h4>
      )}
      <Suspense fallback={<div>loading...</div>}>
        <div className='mt-6'>{children}</div>
      </Suspense>
    </div>
  );
};

export default ContentFrame;
