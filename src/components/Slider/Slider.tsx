'use client';
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Mousewheel, Pagination, Autoplay } from 'swiper/modules';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/mousewheel';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Slider.css';

interface SwiperComponentProps {
  slides: { url: string; alt: string }[];
}

const Slider: React.FC<SwiperComponentProps> = ({ slides }) => {
  useEffect(() => {
    const swiperParams: SwiperOptions = {
      modules: [Pagination, Mousewheel, Autoplay],
      direction: 'vertical',
      slidesPerView: 1,
      spaceBetween: 0,
      mousewheel: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: true,
    };
    const swiper = new Swiper('.swiper', swiperParams);
    swiper.update();
  });

  return (
    <div className='swiper'>
      <div className='swiper-wrapper wrapper relative'>
        {slides.map((slide, index) => (
          <div key={index} className='swiper-slide w-full h-full'>
            <div className='absolute right-[78px] w-[590px] h-auto inset-y-0'>
              <Image
                src={slide.url}
                fill
                sizes='max-width:100%'
                alt={slide.alt}
                className='object-contain'
              />
            </div>
          </div>
        ))}
      </div>
      <div className='swiper-pagination'></div>
    </div>
  );
};

export default Slider;
