'use client';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

import Link from 'next/link';
import Image from 'next/image';
import { Button, ConfigProvider } from 'antd';
const HeaderAccount = ({
  home,
  isTransparent,
  search,
}: {
  home?: boolean;
  isTransparent?: boolean;
  search?: boolean;
}) => {
  const { data: session } = useSession();

  return (
    <div className='flex gap-4'>
      <ConfigProvider
        theme={{
          token: {
            colorLink: '#2f61e6',
            colorLinkHover: '#5786f2',
          },
        }}
      >
        <Link href='/login'>
          <Button
            ghost={search ? false : true}
            type={
              home
                ? isTransparent
                  ? 'default'
                  : 'primary'
                : search
                ? 'link'
                : 'primary'
            }
          >
            <p className='font-semibold'>Đăng nhập</p>
          </Button>
        </Link>
      </ConfigProvider>
      <Link href='/register'>
        <Button type='primary' ghost={search ? true : false}>
          <div className='flexCenter gap-2'>
            <Image
              src={search ? '/icons/user-add-blue.svg' : '/icons/user-add.svg'}
              width={14}
              height={14}
              alt='user-add'
            />
            <p className='font-semibold'>Đăng ký</p>
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default HeaderAccount;
