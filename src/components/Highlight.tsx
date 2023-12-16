import React from 'react';
import Image from 'next/image';
import { HOME_HIGHLIGHT } from '@/constants';
const Highlight = () => {
  return (
    <div className='max-container lg:px-10 xl:px-0 w-full h-[510px]   lg:h-[422px]'>
      <div className='shadow-banner relative w-full h-full overflow-hidden lg:rounded-2xl bg-white '>
        <div className=' absolute bottom-0 h-full w-full  max-h-[70%] md:max-h-full'>
          <div className="absolute w-full h-full bg-[url('/images/highlight-banner.png')] bg-cover bg-no-repeat bg-[left_30%_bottom_-20px] md:bg-[left_0_bottom_-150px] md:bg-[length:115%_auto] lg:bg-[left_0_bottom_-300px]"></div>
          <div className='absolute w-full h-full  bg-royalBlue mix-blend-soft-light'></div>
          <div className='absolute fade-bg-l'></div>
          <div className='absolute fade-bg-b'></div>
          <div className='absolute fade-bg-r'></div>
        </div>
        <div className='absolute inset-0 w-full h-full  flexCenter flex-col'>
          <div className='py-12 flexCenter flex-col gap-2 lg:py-16'>
            <p className='text-neutral-7 md:text-base'>
              Phát triển cùng doanh nghiệp
            </p>
            <h3 className='md:hidden'>Những con số nổi bật</h3>
            <h2 className='hidden md:block'>Những con số nổi bật</h2>
          </div>
          <div className='padding-container w-full  h-full z-10 grid grid-cols-2 gap-y-14 mb-12  lg:max-w-[920px] lg:grid-cols-4 lg:border-t-[3px] lg:border-[#EAEFFD] lg:gap-x-12'>
            {HOME_HIGHLIGHT.map((item, index) => (
              <div
                key={index}
                className='relative border-t-[3px] border-[#EAEFFD] flexCenter flex-col px-1 lg:px-0 lg:border-none'
              >
                <div className='absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8  flexCenter bg-[#EAEFFD] rounded shadow-card'>
                  <Image
                    src={item.icon}
                    width={16}
                    height={16}
                    alt='icon'
                    className=''
                  />
                </div>
                <h2 className='mt-[28px] mb-[6px] text-royalBlue md:hidden'>
                  {item.value}
                </h2>
                <h1 className='text-[52px] leading-[64px] tracking-tighter font-semibold mt-[28px] mb-[6px] text-royalBlue hidden md:block'>
                  {item.value}
                </h1>
                <p className='text-center text-xs md:text-sm line-clamp-2'>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highlight;
