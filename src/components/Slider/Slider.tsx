'use client';
import React, { useState, useEffect } from 'react';
import { Mousewheel, Pagination, Autoplay } from 'swiper/modules';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/mousewheel';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Slider.css';
import { Button } from 'antd';
import Link from 'next/link';

interface SwiperComponentProps {
  slides: {
    title?: string;
    slogan?: string;
    desc?: string;
    link?: string;
  }[];
}

const Slider: React.FC<SwiperComponentProps> = ({ slides }) => {
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    const swiperParams: SwiperOptions = {
      modules: [Pagination, Mousewheel, Autoplay],
      slidesPerView: 1,
      spaceBetween: 0,
      mousewheel: true,
      direction: screenWidth >= 768 ? 'vertical' : 'horizontal',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 4000,
      },
    };

    const swiper = new Swiper('.swiper', swiperParams);
    swiper.update();
    return () => {
      swiper.destroy(true, true);
    };
  });

  // update screen width when resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div className='swiper relative'>
      <div className='swiper-wrapper wrapper'>
        {slides.map((content, index) => (
          <div key={index} className='swiper-slide w-full h-full '>
            <div className='flex flex-col absolute top-12 left-0 w-[255px] text-left text-neutral-1 ml-4 md:w-[330px] md:max-w-[30%] md:ml-[118px] '>
              <p className='text-base '>{content.title}</p>
              <h3 className='mt-2 mb-8 lg:hidden text-neutral-1'>
                {content.slogan}
              </h3>
              <h2 className='mt-2 mb-8 hidden lg:block  text-neutral-1'>
                {content.slogan}
              </h2>
              <p className='mb-6 leading-[22px] text-xs text-[#E9F3FF]'>
                {content.desc}
              </p>
              <div className='inline-block'>
                {content.link && (
                  <Link href={content.link}>
                    <Button ghost size='large'>
                      <p className='font-semibold text-sm lg:text-base'>
                        Khám phá ngay
                      </p>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='swiper-pagination'></div>
    </div>
  );
};

export default Slider;
