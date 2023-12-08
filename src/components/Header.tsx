import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS } from '@/constants';
import { Button, Flex } from 'antd';

const Header: React.FC = () => {
  return (
    <header className='header'>
      <div className='left flexStart gap-11'>
        <div className='logo'>
          <Link href='/'>
            <Image
              src='/images/logo.svg'
              width={186}
              height={48}
              alt='iCongty-logo'
              priority={true}
              className='w-auto h-auto'
            />
          </Link>
        </div>
        <ul className='hidden lg:flex gap-4'>
          {NAV_LINKS.map((link) => (
            <li key={link.key} className='text-white px-2'>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='right hidden lg:flex gap-4'>
        <Button ghost>Đăng nhập</Button>
        <Button type='primary' className='flexStart gap-2'>
          <Image
            src='/images/user-add.svg'
            width={14}
            height={14}
            alt='user-add'
          />
          Đăng ký
        </Button>
        <div className='language flexStart gap-2'>
          <Image
            src='/images/flag-en.svg'
            width={24}
            height={24}
            alt='flag US'
          />
          <div className='text-white font-semibold'>VN</div>
        </div>
      </div>
      <div className='menu flex lg:hidden'>
        <Image src='/images/menu.svg' width={32} height={32} alt='menu' />
      </div>
    </header>
  );
};

export default Header;
