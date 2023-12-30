'use client';
import { useEffect, useState } from 'react';
import { NAV_LINKS } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import { AudioOutlined } from '@ant-design/icons';
import { Button, Select, ConfigProvider, Drawer } from 'antd';
const { Option } = Select;
import Search from 'antd/lib/input/Search';
import type { SearchProps } from 'antd/lib/input/Search';

const HeaderSearch: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  // START: search bar setting
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#2f61e6',
        opacity: 0.6,
      }}
    />
  );

  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);

  // END: search bar setting

  // START Select menu setting
  const handleChange = (value: string) => {
    console.log(value);
  };

  // END: Select menu setting
  const onSearchActive = (value: string) => {
    console.log(value);
  };

  // START: drawer setting
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
  // END: drawer setting
  return (
    <header className='w-full fixed top-0 left-0 right-0 z-50 shadow-banner border-b border-white/[.4]'>
      <div className='h-10 w-full bg-royalBlue flexBetween  px-4 lg:px-6'>
        <ul className='flex gap-4'>
          {NAV_LINKS.map((link) => (
            <li key={link.key} className='text-neutral-1 px-2'>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <div className='-mr-4'>
          <ConfigProvider
            theme={{
              token: {
                fontSizeIcon: 0,
                controlPaddingHorizontal: 0,
                paddingSM: 0,
                colorBorder: 'transparent',
                lineWidth: 0,
                colorText: 'white',
                colorBgElevated: '#2F61E6',
              },
              components: {
                Select: {
                  optionSelectedBg: 'transparent',
                  optionHeight: 28,
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
                  <p className='font-semibold '>US</p>
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
                  <p className='font-semibold '>VN</p>
                </div>
              </Option>
            </Select>
          </ConfigProvider>
        </div>
      </div>
      <div className='h-16 lg:h-20 px-4 lg:px-6 w-full bg-neutral-1 flexBetween gap-10'>
        <div className='flexStart w-full'>
          <Link href='/' className='flexCenter gap-3'>
            <Image src='/icons/logo.svg' width={48} height={48} alt='logo' />
            <p className='hidden lg:block tracking-[0.5px] font-bold text-[25px] font-mont text-neutral-8'>
              iCONGTY
            </p>
          </Link>
          <div className='w-full max-w-[566px] ml-12 hidden lg:block'>
            <ConfigProvider
              theme={{
                token: {
                  colorBgElevated: '#2f61e6',
                  colorLink: '#2f61e6',
                  colorLinkActive: '#2f61e6',
                },
                components: {
                  Button: {
                    defaultBg: '#2f61e6',
                  },
                },
              }}
            >
              <Search
                placeholder='Nhập tên công ty, mã số thuế, ngành nghề...'
                enterButton={true}
                size='large'
                suffix={suffix}
                onSearch={onSearch}
                className='h-[40px]'
              />
            </ConfigProvider>
          </div>
        </div>
        <div className='hidden lg:flex gap-4 shrink-0'>
          <ConfigProvider
            theme={{
              token: {
                colorLink: '#2f61e6',
                colorLinkHover: '#5786f2',
              },
            }}
          >
            <Link href='/login'>
              <Button type='link'>Đăng nhập</Button>
            </Link>
          </ConfigProvider>

          <Link href='/register'>
            <Button type='primary' ghost className='flexStart gap-2'>
              <Image
                src='/icons/user-add-blue.svg'
                width={14}
                height={14}
                alt='user-add'
              />
              Đăng ký
            </Button>
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <Image
            src='/icons/menu-blue.svg'
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
                          <p className='font-semibold  text-neutral-8'>US</p>
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
                          <p className='font-semibold  text-neutral-8'>VN</p>
                        </div>
                      </Option>
                    </Select>
                  </ConfigProvider>
                </div>
              </div>
            </Drawer>
          </ConfigProvider>
        </div>
      </div>
    </header>
  );
};

export default HeaderSearch;
