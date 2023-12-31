'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Form, ConfigProvider } from 'antd';
import {
  CheckOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';

const LoginPage: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isShowed, setIsShowed] = useState(false);

  return (
    <div className='w-full h-full flex'>
      <div className='flexCenter px-4  w-full  lg:w-1/2 my-[175px]'>
        <div className='max-w-[450px] w-full'>
          <p className='text-neutral-10 text-4xl font-semibold mb-2'>
            Đăng nhập
          </p>
          <p className='text-neutral-7 text-base mb-10'>
            Đăng nhập vào tài khoản Icongty của bạn ngay nào.
          </p>

          {/* START: Login form*/}
          <form>
            <label htmlFor='email' className='mb-4 w-full block'>
              <p className='w-full block font-semibold text-base text-neutral-10 mb-2'>
                Email
              </p>
              <input
                placeholder='Nhập email của bạn'
                id='email'
                type='email'
                required
                className='w-full h-12 border rounded border-[#BFBFBF] p-3  placeholder:text-neutral-6 bg-transparent'
              />
            </label>
            <label htmlFor='password' className='w-full block'>
              <p className='w-full block font-semibold text-base text-neutral-10 mb-2'>
                Password
              </p>
              <div className='relative'>
                <input
                  placeholder='Nhập mật khẩu'
                  id='password'
                  minLength={8}
                  type={isShowed ? 'text' : 'password'}
                  required
                  className='w-full h-12 border rounded border-[#BFBFBF] p-3  placeholder:text-neutral-6 bg-transparent'
                />
                {!isShowed ? (
                  <EyeOutlined
                    width={16}
                    height={16}
                    className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
                    onClick={() => setIsShowed(!isShowed)}
                  />
                ) : (
                  <EyeInvisibleOutlined
                    width={16}
                    height={16}
                    className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
                    onClick={() => setIsShowed(!isShowed)}
                  />
                )}
              </div>
            </label>

            {/* START: Remember password checkbox */}
            <div className='flexBetween mb-6 mt-2'>
              <label
                htmlFor='remember'
                className='text-base text-neutral-10 h-5 flexCenter gap-2'
              >
                <input
                  type='checkbox'
                  className='hidden peer'
                  id='remember'
                  onChange={() => {
                    setIsChecked(!isChecked);
                  }}
                />
                <span
                  className={`transition-all duration-300 block flexCenter w-5 h-5 cursor-pointer rounded border border-[#C9CDD3] ${
                    isChecked
                      ? 'bg-royalBlue hover:bg-royalBlue-80'
                      : 'bg-[#F4F5F6] hover:border-royalBlue-80'
                  }`}
                >
                  {isChecked && (
                    <CheckOutlined className='text-neutral-1 w-3 h-3' />
                  )}
                </span>
                <p className='text-xs text-[#3D434C]'> Nhớ mật khẩu</p>
              </label>
              <Link
                href='/forgot-password'
                className='text-royalBlue font-semibold hover:text-royalBlue-70 h-20px'
              >
                Quên mật khẩu?
              </Link>
            </div>
            {/* END: Remember password checkbox */}

            {/* Submit btn*/}
            <ConfigProvider
              theme={{
                token: {
                  controlHeight: 48,
                },
              }}
            >
              <Button type='primary' block>
                <input
                  type='submit'
                  value='Đăng nhập'
                  className='bg-transparent font-semibold text-base text-neutral-1 w-full h-full cursor-pointer'
                />
              </Button>
            </ConfigProvider>
          </form>
          {/* END: Login form*/}

          {/* START: Login width FB & GG*/}
          <div className='w-full'>
            <p className='text-center mt-4 mb-2 text-xs'>Hoặc</p>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultBg: '#FAFAFA',
                  },
                },
                token: {
                  controlHeight: 48,
                },
              }}
            >
              <Button type='default' block className='relative mb-2'>
                <Image
                  src='/icons/facebook-round.svg'
                  alt='facebook'
                  width={24}
                  height={24}
                  className='absolute left-3 top-1/2 -translate-y-1/2'
                />
                <p className='font-semibold'>Đăng nhập với Facebook</p>
              </Button>
              <Button type='default' block className='relative'>
                <Image
                  src='/icons/google-round.svg'
                  alt='google'
                  width={24}
                  height={24}
                  className='absolute left-3 top-1/2 -translate-y-1/2'
                />
                <p className='font-semibold'>Đăng nhập với Google </p>
              </Button>
            </ConfigProvider>
          </div>

          {/* END: Login width FB & GG*/}

          <div className='flexCenter mt-4 gap-2'>
            <p className='text-[#3D434C] text-xs'>Chưa có tài khoản?</p>
            <Link
              href={'/register'}
              className='text-royalBlue font-semibold hover:text-royalBlue-70'
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
      <div className='hidden lg:block w-1/2 h-full overflow-hidden absolute right-0 rounded-l-2xl shadow-banner'>
        <Image
          src='/images/login.png'
          alt='login'
          fill
          sizes='(min-width: 1024px)  100vw'
          className='object-cover'
        />
      </div>
    </div>
  );
};

export default LoginPage;
