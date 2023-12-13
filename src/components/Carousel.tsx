import React from 'react';
import Slider from '@/components/Slider/Slider';
import { Button, ConfigProvider } from 'antd';
const slides = [
  { url: '/images/slide1.png', alt: 'test1' },
  { url: '/images/slide1.png', alt: 'test2' },
  { url: '/images/slide1.png', alt: 'test3' },
  { url: '/images/slide1.png', alt: 'test4' },
];
const Carousel = () => {
  return (
    <div className='max-container w-full h-[420px] rounded-2xl overflow-hidden shadow-lg relative'>
      <Slider slides={slides} />
      <div className='flex z-10 w-[330px] h-full inset-y-0 left-[118px]  absolute'>
        <div className='flex justify-center flex-col w-full h-full text-white'>
          <p className='text-base'>Tìm kiếm đối tác</p>
          <h2 className='mt-2 mb-8'>Nhanh chóng - Uy tín - Tiết kiệm</h2>
          <p className='mb-6 leading-[22px]'>
            Trong số hơn +16,000 doanh nghiệp đang phát triển mạnh mẽ tại Việt
            Nam, cùng iCongTy tìm ra đối tác tiềm năng với doanh nghiệp của bạn.
          </p>
          <div className='inline-block'>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    fontWeight: 600,
                  },
                },
              }}
            >
              <Button ghost size='large'>
                Khám phá ngay
              </Button>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
