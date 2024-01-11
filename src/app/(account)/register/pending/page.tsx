import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ConfigProvider, Button } from 'antd';

const RegisterPendingPage = () => {
  return (
    <div className='w-full h-screen flex'>
      <div className='flex justify-center px-4 w-full  lg:w-1/2 mt-[175px] mb-10'>
        <div className=' max-w-[450px]   w-full'>
          <p className='text-neutral-10 text-4xl font-semibold mt-9 mb-6'>
            Đã nhận được yêu cầu
          </p>
          <p className='text-neutral-7 text-base mb-10'>
            Một email đã được gửi đi. Vui lòng kiểm tra hộp thư của bạn.
          </p>
          <ConfigProvider
            theme={{
              token: {
                controlHeight: 48,
              },
            }}
          >
            <Link href='/register' className='w-full mb-4 block'>
              <Button type='primary' block>
                <p className='font-semibold text-base text-neutral-1'>
                  Đăng ký
                </p>
              </Button>
            </Link>
            <Link href='/' className='w-full block'>
              <Button type='primary' block>
                <p className='font-semibold text-base text-neutral-1'>
                  Về trang chủ
                </p>
              </Button>
            </Link>
          </ConfigProvider>
        </div>
      </div>
      <div className='hidden lg:block w-1/2 h-full overflow-hidden absolute right-0 rounded-l-2xl shadow-banner'>
        <Image
          src='/images/register-pending.png'
          alt='register-pending'
          fill
          sizes='(min-width: 1024px)  100vw'
          className='object-cover'
        />
      </div>
    </div>
  );
};

export default RegisterPendingPage;
