import React from 'react';

// import styles from './Tag.module.scss';
// import classNames from 'classnames/bind';
// const cx = classNames.bind(styles);

interface TagProps {
  type: 'line' | 'block';
  grey?: boolean;
  children: React.ReactNode;
  className?: string;
}
const blockType =
  'text-royalBlue-80  bg-royalBlue/[0.1]  hover:bg-royalBlue hover:text-neutral-1';
const lineType = 'border border-royalBlue-60 text-royalBlue-80';
const lineGreyType = 'border border-neutral-1 text-neutral-1';
const blockGreyType = 'text-neutral-8 bg-neutral-4 hover:bg-neutral-5';

const Tag: React.FC<TagProps> = ({ type, grey, children, className }) => {
  return (
    <div
      className={`flexCenter cursor-pointer px-2 py-[1px] transition duration-300  mr-2 last:mr-0  rounded min-w-[50px] flex-wrap overflow-hidden line-clamp-1 text-ellipsis text-center ${
        grey
          ? type === 'block'
            ? blockGreyType
            : lineGreyType
          : type === 'block'
          ? blockType
          : lineType
      } ${className} `}
    >
      {children}
    </div>
  );
};

export default Tag;
