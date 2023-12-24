'use client';
import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS } from '@/constants';
import { Button, Flex } from 'antd';

type HeaderProps = {
  type?: 'home' | null; // Change the type according to your needs
};
const Header: React.FC<HeaderProps> = ({ type }) => {
  const [screenScroll, setScreenScroll] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [transparent, setTransparent] = useState(false);

  // lang nghe su kien scroll
  useEffect(() => {
    if (type && type === 'home') {
      const handleScroll = () => {
        const newScreenScroll = window.scrollY;
        setScreenScroll(newScreenScroll);
      };
      handleScroll();
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [type]);

  useEffect(() => {
    if (type && type === 'home') {
      if (screenScroll > 600) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
  }, [screenScroll, type]);

  useEffect(() => {
    if (type && type === 'home') {
      if (!scrolled) {
        setTransparent(true);
      } else {
        setTransparent(false);
      }
    }
  }, [scrolled, type]);
  return (
    <header
      className={`header shadow-banner transition-all duration-300 ${
        type === 'home'
          ? transparent
            ? 'bg-transparent shadow-none'
            : 'bg-[#072A88] lg:bg-neutral-1'
          : 'bg-neutral-1 '
      }`}
    >
      <div className='left flexStart gap-11'>
        <div className='h-[50px]'>
          <Link
            href='/'
            className='flexCenter w-full h-full relative'
            scroll={false}
          >
            <Image
              src='/icons/logo.svg'
              width={50}
              height={50}
              alt='iCongty-logo'
              priority={true}
            />
            <p
              className={`hidden lg:block ml-3 tracking-[0.5px] font-bold text-[25px] font-mont  ${
                type === 'home'
                  ? transparent
                    ? 'text-neutral-1'
                    : 'text-neutral-1 lg:text-neutral-8'
                  : 'text-neutral-8'
              }`}
            >
              iCONGTY
            </p>
          </Link>
        </div>
        <ul className='hidden lg:flex gap-4'>
          {NAV_LINKS.map((link) => (
            <li
              key={link.key}
              className={`px-2  ${
                type === 'home'
                  ? transparent
                    ? 'text-neutral-1'
                    : 'text-neutral-1 lg:text-neutral-8 lg:hover:text-royalBlue'
                  : 'text-neutral-8 hover:text-royalBlue'
              }`}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='right hidden lg:flex gap-4'>
        <Link href='/login'>
          <Button
            ghost
            type={
              type === 'home'
                ? transparent
                  ? 'default'
                  : 'primary'
                : 'primary'
            }
          >
            Đăng nhập
          </Button>
        </Link>
        <Link href='/register'>
          <Button type='primary' className='flexStart gap-2'>
            <Image
              src='/icons/user-add.svg'
              width={14}
              height={14}
              alt='user-add'
            />
            Đăng ký
          </Button>
        </Link>

        <div className='language flexStart gap-2'>
          <Image
            src='/icons/flag-en.svg'
            width={24}
            height={24}
            alt='flag US'
          />
          <div className='text-white font-semibold'>VN</div>
        </div>
      </div>
      <div className='menu flex lg:hidden'>
        <Image
          src={type === 'home' ? '/icons/menu.svg' : '/icons/menu-blue.svg'}
          width={32}
          height={32}
          alt='menu'
        />
      </div>
    </header>
  );
};

export default Header;
