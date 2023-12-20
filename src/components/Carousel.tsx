'use client';
import { HOME_CAROUSEL_SLIDES } from '@/constants';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Mousewheel, Pagination, Autoplay } from 'swiper/modules';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/mousewheel';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Slider/Slider.scss';
import { Button } from 'antd';
import Link from 'next/link';

const slides = HOME_CAROUSEL_SLIDES;
const Carousel = () => {
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    const swiperParams: SwiperOptions = {
      modules: [Pagination, Mousewheel, Autoplay],
      slidesPerView: 1,
      spaceBetween: 0,
      parallax: true,
      mousewheel: true,
      direction: screenWidth >= 768 ? 'vertical' : 'horizontal',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 4000,
      },
      loop: true,
    };

    const swiper = new Swiper('.my-swiper', swiperParams);
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
    <div className='max-container lg:px-10 xl:px-0 w-full h-[600px]  md:h-[420px] relative'>
      <div className='w-full h-full overflow-hidden shadow-banner relative bg-royalBlue lg:flex-row lg:rounded-2xl  '>
        <div className='w-full h-full absolute inset-0'>
          <div className='swiper my-swiper'>
            <div className='parallax-bg w-full h-full absolute '>
              <div className=' w-[188px] h-[242px] absolute top-0 right-0 md:hidden'>
                <Image src='/images/slide-ele-3.svg' fill alt='element' />
              </div>
              <div className='absolute w-full h-full max-h-[280px] bottom-0 md:max-w-[50%]  md:max-h-[375px] md:bottom-4 md:right-[20px]  lg:right-[80px] bg-[url("/images/slide1.png")] bg-contain bg-center bg-no-repeat'>
                <div className='absolute w-full h-full -translate-y-1/2 top-1/2 left-2 max-w-[180px] max-h-[180px] md:max-w-[230px] md:max-h-[230px] md:-left-6   '>
                  <Image
                    src='/images/slide-ele-1.svg'
                    fill
                    alt='element'
                    className='object-contain'
                  />
                </div>
                <div className='absolute w-full h-full mr-1 right-0 bottom-0 max-w-[180px] max-h-[180px] md:max-w-[210px] md:max-h-[210px] lg:-bottom-2 lg:-right-5 '>
                  <Image
                    src='/images/slide-ele-2.svg'
                    fill
                    sizes='width:100%; height:auto;'
                    alt='element'
                    className='object-contain'
                  />
                </div>
              </div>
            </div>

            <div className='swiper-wrapper wrapper'>
              {slides.map((content, index) => (
                <div key={index} className='swiper-slide'>
                  <div className='flex flex-col absolute top-12 left-0 w-[250px]  text-left text-neutral-1 ml-4 md:w-[330px] md:max-w-[30%] md:ml-[100px] lg:ml-[118px] '>
                    <p className='text-base '>{content.subtitle}</p>
                    <h3 className='mt-2 mb-8 lg:hidden text-neutral-1'>
                      {content.title}
                    </h3>
                    <h2 className='mt-2 mb-8 hidden lg:block  text-neutral-1'>
                      {content.title}
                    </h2>
                    <p className='mb-6 leading-[22px] text-xs text-[#E9F3FF] line-clamp-3'>
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
        </div>
      </div>
    </div>
  );
};

export default Carousel;
