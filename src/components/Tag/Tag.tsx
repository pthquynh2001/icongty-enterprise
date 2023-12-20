// components/Tag.tsx

import React from 'react';
import styles from './Tag.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

interface TagProps {
  type: 'line' | 'block';
  children: string;
}

const Tag: React.FC<TagProps> = ({ type, children }) => {
  return (
    <div
      className={`${cx('tag')} ${type === 'block' ? cx('block') : cx('line')}`}
    >
      {children}
    </div>
  );
};

export default Tag;
