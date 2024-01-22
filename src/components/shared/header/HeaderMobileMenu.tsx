'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, ConfigProvider, Drawer } from 'antd';
import HeaderLanguages from './HeaderLanguages';
import HeaderAccount from './HeaderAccount';

const HeaderMobileMenu = ({
  home,
  navLinks,
}: {
  home?: boolean;
  navLinks: any;
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const drawerStyles = {
    body: {
      padding: 0,
      maxHeight: '100vh',
      height: '100vh',
      display: 'flex',
      flexFlow: 'column',
      width: '100%',
      border: 'none',
    },
    header: {
      padding: '20px',
      border: 'none',
    },
  };
  return (
    <>
      <Image
        src={home ? '/icons/menu.svg' : '/icons/menu-blue.svg'}
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
          onClose={() => setOpenDrawer(false)}
          open={openDrawer}
          styles={drawerStyles}
          width={350}
        >
          <div className='flexCenter w-full h-20 border-b border-black border-opacity-5 pb-4'>
            <HeaderAccount />
          </div>
          <div className='relative w-full h-full'>
            <ul className='flex flex-col'>
              {navLinks.map((link: any) => (
                <li
                  key={link.key}
                  className='text-neutral-8  px-4 text-center h-12 flexCenter hover:text-royalBlue hover:bg-[#e6f4ff]'
                >
                  <Link
                    href={link.href}
                    className='text-inherit w-full h-full block leading-[48px]'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className='absolute bottom-2 right-5'>
              <HeaderLanguages />
            </div>
          </div>
        </Drawer>
      </ConfigProvider>
    </>
  );
};

export default HeaderMobileMenu;
