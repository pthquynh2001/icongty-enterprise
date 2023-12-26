import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ConfigProvider, Button } from 'antd';
const RegisterFailPage = () => {
  return (
    <div className='w-full h-full flex'>
      <div className='flexCenter px-4 w-full  lg:w-1/2 my-[175px]'>
        <div className='flexCenter flex-col max-w-[450px] text-center  w-full'>
          <Image src='/icons/fail.svg' width={120} height={120} alt='fail' />
          <p className='text-neutral-10 text-4xl font-semibold mt-9 mb-6'>
            Xác nhận thất bại
          </p>
          <p className='text-neutral-7 text-base mb-10'>
            Rất tiếc, chúng tôi không thể xác minh rằng th****@gmail.com là của
            bạn.
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
          src='/images/reset-fail.png'
          alt='reset-fail'
          fill
          sizes='(min-width: 1024px)  100vw'
          className='object-cover'
        />
      </div>
    </div>
  );
};

export default RegisterFailPage;
