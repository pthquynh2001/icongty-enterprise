import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ConfigProvider, Button } from 'antd';
const ResetPasswordSuccessPage = () => {
  return (
    <div className='w-full h-screen flex'>
      <div className='flex justify-center px-4 w-full  lg:w-1/2 mt-[175px] mb-10'>
        <div className='flex items-center flex-col max-w-[450px]  text-center  w-full'>
          <Image
            src='/icons/success.svg'
            width={85}
            height={85}
            alt='success'
          />
          <p className='text-neutral-10 text-4xl font-semibold mt-9 mb-6'>
            Đổi mật khẩu thành công
          </p>
          <p className='text-neutral-7 text-base mb-6'>
            Vui lòng đăng nhập với tài khoản của bạn.
          </p>
          <Link href='/' className='w-full'>
            <ConfigProvider
              theme={{
                token: {
                  controlHeight: 48,
                },
              }}
            >
              <Button type='primary' block>
                <p className='font-semibold text-base text-neutral-1'>
                  Về trang chủ
                </p>
              </Button>
            </ConfigProvider>
          </Link>
        </div>
      </div>
      <div className='hidden lg:block w-1/2 h-full overflow-hidden absolute right-0 rounded-l-2xl shadow-banner'>
        <Image
          src='/images/reset-success.png'
          alt='reset-success'
          fill
          sizes='(min-width: 1024px)  100vw'
          className='object-cover'
        />
      </div>
    </div>
  );
};

export default ResetPasswordSuccessPage;
