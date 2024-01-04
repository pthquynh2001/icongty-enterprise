// components/Tag.tsx

import React from 'react';
// import styles from './Tag.module.scss';
// import classNames from 'classnames/bind';
// const cx = classNames.bind(styles);

interface TagProps {
  type: 'line' | 'block';
  children: React.ReactNode;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ type, children, className }) => {
  return (
    <div
      className={`inline-block cursor-pointer px-2 py-[1px] transition duration-300  mr-2 last:mr-0 flexCenter rounded min-w-[50px]  text-center ${
        type == 'block'
          ? 'text-royalBlue-80  bg-royalBlue/[0.1]  hover:bg-royalBlue hover:text-neutral-1'
          : 'border border-royalBlue-60 text-royalBlue-80'
      } ${className} `}
    >
      {children}
    </div>
  );
};

export default Tag;
