'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, ConfigProvider } from 'antd';
const ResetPasswordPage = () => {
  const [countdown, setCountdown] = useState(15);
  const [isSent, setIsSent] = useState(false);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && isSent) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown > 0) {
            return prevCountdown - 1;
          } else {
            clearInterval(timer);
            return 0;
          }
        });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isSent, countdown]);

  return (
    <div className='w-full h-full flex'>
      <div className='flexCenter px-4  w-full  lg:w-1/2 my-[175px]'>
        {!isSent && (
          <div className='max-w-[450px] text-left w-full'>
            <p className='text-neutral-10 text-4xl leading-[54px] font-semibold mb-2'>
              Quên mật khẩu?
            </p>
            <p className='text-[#6F6F6F] text-base mb-10'>
              Nhập email đã đăng ký để khôi phục mật khẩu.
            </p>
            <form>
              <label
                htmlFor='email'
                className='w-full block font-semibold text-base text-neutral-10 mb-2'
              >
                Email
              </label>
              <input
                placeholder='Nhập email của bạn'
                id='email'
                type='email'
                required
                className='w-full h-12 border rounded border-[#BFBFBF] p-3   placeholder:text-neutral-6 bg-transparent mb-10'
              />
              <ConfigProvider
                theme={{
                  token: {
                    controlHeight: 48,
                  },
                }}
              >
                <Button
                  type='primary'
                  block
                  onClick={() => {
                    setIsSent(!isSent);
                  }}
                >
                  <input
                    type='submit'
                    value='Gửi'
                    className='bg-transparent font-semibold text-base text-neutral-1 w-full h-full cursor-pointer'
                  />
                </Button>
              </ConfigProvider>
            </form>
          </div>
        )}
        {/* after send mail */}
        {isSent && (
          <div className='max-w-[450px] text-left w-full'>
            <p className='text-neutral-10 text-4xl leading-[54px] font-semibold mb-2'>
              Khôi phục mật khẩu
            </p>
            <p className='text-[#6F6F6F] text-base mb-10'>
              Một email đã được gửi đi. Vui lòng kiểm tra hộp thư của bạn.
            </p>
            <div className='flexStart'>
              <p className='text-[#3D434C] text-xs mr-2'>
                Chưa nhận được email?
              </p>
              {countdown > 0 ? (
                <span className='text-royalBlue font-semibold cursor-default'>
                  Gửi lại (00:
                  {countdown >= 10 ? countdown : `0${countdown}`})
                </span>
              ) : (
                <Link
                  href='/reset-password'
                  className='text-royalBlue font-semibold'
                >
                  Gửi lại
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
      <div className='hidden lg:block w-1/2 h-full overflow-hidden absolute right-0 rounded-l-2xl shadow-banner'>
        <Image
          src='/images/forgot-password.png'
          alt='forgot-password'
          fill
          sizes='(min-width: 1024px)  100vw'
          className='object-cover'
        />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
