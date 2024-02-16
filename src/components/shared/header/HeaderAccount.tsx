'use client';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { LogoutOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { Button, ConfigProvider, Dropdown, MenuProps } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <Link href={'/dashboard'}>Dashboard</Link>,
  },
  {
    key: '2',
    label: (
      <div className='flexBetween text-red-500' onClick={() => signOut()}>
        <span>Log out</span>
        <LogoutOutlined className='!text-red-500' />
      </div>
    ),
  },
];

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
  const user = session?.user;
  return user ? (
    <div className='mr-4 h-full'>
      <ConfigProvider
        theme={{
          components: {
            Dropdown: {
              paddingBlock: 10,
            },
          },
        }}
      >
        <Dropdown menu={{ items }} placement='bottomRight'>
          <Link
            href={'/dashboard'}
            className='flexCenter gap-4 cursor-pointer h-full'
          >
            <p
              className={`block whitespace-nowrap font-semibold transition-all duration-300 ${
                isTransparent ? 'text-neutral-1' : ' text-neutral-10'
              }`}
            >{`Hi, ${user.firstName} ${user.lastName}`}</p>
            <Image
              src='/images/banner.png'
              width={48}
              height={48}
              alt='avatar'
              className='rounded-full object-cover'
            />
          </Link>
        </Dropdown>
      </ConfigProvider>
    </div>
  ) : (
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
