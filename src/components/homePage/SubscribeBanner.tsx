import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'antd';

const SubscribeBanner = () => {
  return (
    <div className='relative w-full h-[540px] md:h-[360px]'>
      {/* TOP */}
      <div className='absolute w-full h-[353px] top-0 left-0 right-0 md:h-full md:mx-auto md:max-w-[1156px] lg:px-10 xl:px-0'>
        <div className='lg:rounded-2xl w-full h-full overflow-hidden absolute right-0'>
          <div className='absolute w-full h-[287px] top-0  right-0 z-10 md:h-[390px] md:top-1/2 md:-translate-y-1/2 md:w-[478px] md:right-0 lg:right-[72px]'>
            <Image
              src='/images/subscribe-right.png'
              alt='right img'
              fill
              sizes='max-width:100%; max-height:100%'
              quality={100}
              className='object-contain object-right-bottom md:object-center'
            />
          </div>
          <div className='absolute w-full h-[235px] bottom-[30px]  z-20 md:w-[478px] md:h-[318px] md:-bottom-[63px] md:right-0 lg:right-[72px]'>
            <Image
              src='/images/subscribe-left.png'
              alt='left img'
              fill
              sizes='max-width:100%; max-height:100%'
              className='object-contain object-bottom'
              quality={100}
            />
          </div>
          <div className='absolute w-[193px] h-[193px] bottom-0 -left-7 md:hidden'>
            <Image
              src='/images/circle.svg'
              alt='ele left img'
              fill
              sizes='max-width:100%; max-height:100%'
              className='object-contain '
            />
          </div>
        </div>
      </div>
      {/* BOTTOM */}
      <div className='BOTTOM absolute bottom-0 left-0 right-0 w-full h-[260px] z-30 md:h-full md:z-0 md:mx-auto md:max-w-[1156px] px-4 md:px-0 lg:px-10 xl:px-0 '>
        <div className='rounded-2xl md:rounded-none lg:rounded-2xl bg-royalBlue w-full h-full shadow-banner overflow-hidden relative'>
          <div className='absolute -top-1/2 left-1/2 w-[316px] h-[316px] md:w-[250px] md:h-[250px] md:top-[233px] md:-translate-x-1/2'>
            <Image
              src='/images/circle.svg'
              alt='right ele'
              fill
              sizes='max-width:100%; max-height:100%'
              className='object-contain'
            />
          </div>
          <div className='hidden md:block absolute w-[525px] h-[515px] bottom-[46px] -left-[200px]'>
            <Image
              src='/images/circle.svg'
              alt='ele left img'
              fill
              sizes='max-width:100%; max-height:100%'
              className='object-contain '
            />
          </div>
          <div className='text-neutral-1 mx-4 mt-12 z-10 relative md:ml-[100px] lg:ml-[118px] md:w-[330px] md:max-w-[30%] lg:max-w-none'>
            <p className='text-base mb-2 text-[#E9F3FF]'>
              Tìm kiếm nhanh chóng & tiết kiệm
            </p>
            <h3 className='lg:hidden text-neutral-1 mb-8'>
              Cơ hội hợp tác nằm trong tay bạn
            </h3>
            <h2 className='hidden lg:block  text-neutral-1 mb-8'>
              Cơ hội hợp tác nằm trong tay bạn
            </h2>
            <Link href={'/'}>
              <Button ghost size='large'>
                <p className='font-semibold text-sm lg:text-base'>
                  Đăng ký ngay
                </p>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeBanner;
