import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS } from '@/constants';
import { Button, Flex } from 'antd';

const Header: React.FC = () => {
  return (
    <header className='header flexBetween relative z-30 border-b border-white/[.4]'>
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
        <div className='hidden lg:flex'>
          {NAV_LINKS.map((link) => (
            <Button key={link.key} type='link'>
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>
      </div>
      <div className='right flex gap-4'>
        <Button ghost className='font-semibold'>
          Đăng nhập
        </Button>
        <Button
          type='primary'
          className='btn--primary font-semibold flexStart gap-2'
        >
          <Image
            src='/images/user-add.svg'
            width={14}
            height={14}
            alt='user-add'
          />
          Đăng ký
        </Button>
        <div className='language flexStart gap-2'>
          <p className='flag'>flag</p>
          <div className='VN'>VN</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
