import Link from 'next/link';
import React from 'react';
import { LeftOutlined } from '@ant-design/icons';

const ItemTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className='border-b border-neutral-5 pb-8 mb-8'>
      <div className='mb-2'>
        <Link href='/dashboard?page=companies' className='flexStart gap-2'>
          <LeftOutlined className='text-base' />
          <h3>{title}</h3>
        </Link>
      </div>
      <p className='text-base text-neutral-10'>{subtitle}</p>
    </div>
  );
};

export default ItemTitle;
