import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ConfigProvider, Button } from 'antd';
const RegisterSuccessPage = () => {
  return (
    <div className='w-full h-full flex'>
      <div className='flexCenter px-4 w-full  lg:w-1/2 my-[175px]'>
        <div className='flexCenter flex-col max-w-[450px]  text-center  w-full'>
          <Image
            src='/icons/success.svg'
            width={85}
            height={85}
            alt='success'
          />
          <p className='text-neutral-10 text-4xl font-semibold mt-9 mb-6'>
            Đăng ký thành công
          </p>
          <p className='text-neutral-7 text-base mb-6'>
            Thông tin của bạn đã được cập nhật.
          </p>
          <Link href='/login' className='w-full'>
            <ConfigProvider
              theme={{
                token: {
                  controlHeight: 48,
                },
              }}
            >
              <Button type='primary' block>
                <p className='font-semibold text-base text-neutral-1'>
                  Đăng nhập
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

export default RegisterSuccessPage;
