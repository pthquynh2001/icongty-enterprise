import React from 'react';
import Slider from '@/components/Slider/Slider';
import Image from 'next/image';
import { HOME_CAROUSEL_SLIDES } from '@/constants';

const slides = HOME_CAROUSEL_SLIDES;
const Carousel = () => {
  return (
    <div className='max-container lg:px-10 xl:px-0 w-full h-[600px]  md:h-[420px] '>
      <div className='w-full h-full flex flex-col overflow-hidden shadow-banner relative bg-royalBlue lg:flex-row lg:rounded-2xl  '>
        <div className=' w-full h-full absolute top-0 right-0 z-20'>
          <div className=' w-[188px] h-[242px] absolute top-0 right-0 md:hidden'>
            <Image src='/images/slide-ele-3.svg' fill alt='element' />
          </div>
          <Slider slides={slides} />
        </div>
        <div className=' flexCenter absolute w-full h-1/2 bottom-0 md:w-1/2 md:h-full md:right-0 lg:w-3/5'>
          <div className='absolute w-full h-full z-10  bottom-0 max-w-[450px] max-h-[280px] md:max-w-[530px] md:max-h-[375px] md:bottom-4'>
            <Image
              src='/images/slide1.png'
              fill
              sizes='max-width:100%'
              alt='slide-image'
              className='object-contain'
              quality={100}
              priority={true}
            />
          </div>
          <div className='flex w-full h-full relative'>
            <div className='absolute  w-full h-full z-10 -translate-y-1/2 top-1/2 left-2 max-w-[180px] max-h-[180px] md:max-w-[230px] md:max-h-[230px] md:-left-5 lg:left-8  '>
              <Image
                src='/images/slide-ele-1.svg'
                fill
                alt='element'
                className='object-contain'
              />
            </div>
            <div className='absolute w-full h-full z-10 mr-1 right-0 bottom-0 max-w-[180px] max-h-[180px] md:max-w-[230px] md:max-h-[230px] lg:right-8 '>
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
      </div>
    </div>
  );
};

export default Carousel;
