'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS } from '@/constants';
import { Button, Select, ConfigProvider, Drawer } from 'antd';
const { Option } = Select;
type HeaderProps = {
  type?: 'home' | null; // Change the type according to your needs
};
const Header: React.FC<HeaderProps> = ({ type }) => {
  const [screenScroll, setScreenScroll] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [transparent, setTransparent] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const drawerStyles = {
    body: {
      padding: 0,
      maxHeight: '100vh',
      height: '100vh',
      display: 'flex',
      flexFlow: 'column',
      width: '100%',
    },
  };

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
      if (screenScroll > 520) {
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
        <ConfigProvider
          theme={{
            token: {
              fontSizeIcon: 0,
              controlPaddingHorizontal: 0,
              paddingSM: 0,
              colorBorder: 'transparent',
              lineWidth: 0,
            },
            components: {
              Select: {
                optionHeight: 28,
                optionSelectedColor: '#2f54eb',
                optionPadding: 2,
                selectorBg: 'transparent',
              },
            },
          }}
        >
          <Select
            defaultValue='en'
            className='w-20 -ml-[2px]'
            popupMatchSelectWidth={64}
            dropdownRender={(menu) => <div>{menu}</div>}
          >
            <Option value='en' className='full'>
              <div className='flexCenter relative gap-2'>
                <Image
                  src='/icons/flag-en.svg'
                  width={24}
                  height={24}
                  alt='flag US'
                  className='inline-block'
                />
                <p className=' font-semibold'>US</p>
              </div>
            </Option>
            <Option value='vi'>
              <div className='flexCenter relative gap-2'>
                <Image
                  src='/icons/flag-vi.svg'
                  width={24}
                  height={24}
                  alt='flag US'
                  className='inline-block'
                />
                <p className=' font-semibold'>VN</p>
              </div>
            </Option>
          </Select>
        </ConfigProvider>
      </div>
      <div className='flex lg:hidden'>
        <Image
          src={type === 'home' ? '/icons/menu.svg' : '/icons/menu-blue.svg'}
          width={32}
          height={32}
          alt='menu'
          className='cursor-pointer'
          onClick={() => setOpenDrawer(true)}
        />
        <ConfigProvider
          theme={{
            token: {
              padding: 0,
            },
            components: {
              Drawer: {
                footerPaddingBlock: 0,
                footerPaddingInline: 0,
              },
            },
          }}
        >
          <Drawer
            placement='right'
            closable={false}
            onClose={() => setOpenDrawer(false)}
            open={openDrawer}
            styles={drawerStyles}
          >
            <div className='flexCenter gap-10 w-full h-32 border-b border-black border-opacity-5'>
              <Link href='/login'>
                <Button ghost type='primary'>
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
            </div>
            <div className='relative w-full h-full'>
              <ul className='flex flex-col'>
                {NAV_LINKS.map((link) => (
                  <li
                    key={link.key}
                    className='text-neutral-8  px-4 text-center h-12 flexCenter hover:text-royalBlue hover:bg-[#e6f4ff]'
                  >
                    <Link
                      href={link.href}
                      className='w-full h-full block leading-[48px]'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className='absolute bottom-2 right-0'>
                <ConfigProvider
                  theme={{
                    token: {
                      fontSizeIcon: 0,
                      controlPaddingHorizontal: 0,
                      paddingSM: 0,
                      colorBorder: 'transparent',
                      lineWidth: 0,
                    },
                    components: {
                      Select: {
                        optionHeight: 28,
                        optionSelectedColor: '#2f54eb',
                        optionPadding: 2,
                        selectorBg: 'transparent',
                      },
                    },
                  }}
                >
                  <Select
                    defaultValue='en'
                    className='w-20 -ml-[2px]'
                    popupMatchSelectWidth={64}
                    dropdownRender={(menu) => <div>{menu}</div>}
                  >
                    <Option value='en' className='full'>
                      <div className='flexCenter relative gap-2'>
                        <Image
                          src='/icons/flag-en.svg'
                          width={24}
                          height={24}
                          alt='flag US'
                          className='inline-block'
                        />
                        <p className=' font-semibold'>US</p>
                      </div>
                    </Option>
                    <Option value='vi'>
                      <div className='flexCenter relative gap-2'>
                        <Image
                          src='/icons/flag-vi.svg'
                          width={24}
                          height={24}
                          alt='flag US'
                          className='inline-block'
                        />
                        <p className=' font-semibold'>VN</p>
                      </div>
                    </Option>
                  </Select>
                </ConfigProvider>
              </div>
            </div>
          </Drawer>
        </ConfigProvider>
      </div>
    </header>
  );
};

export default Header;
