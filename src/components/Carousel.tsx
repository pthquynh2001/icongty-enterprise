import React from 'react';
import Slider from '@/components/Slider/Slider';
import Image from 'next/image';
import { HOME_CAROUSEL_SLIDES } from '@/constants';

const slides = HOME_CAROUSEL_SLIDES;
const Carousel = () => {
  return (
    <div className='max-container lg:px-10 xl:px-0 w-full'>
      <div className='w-full flex flex-col lg:flex-row h-[600px] md:h-[420px] lg:rounded-2xl  overflow-hidden shadow-lg relative bg-royalBlue'>
        <div className=' w-full h-full absolute top-0 right-0 z-20'>
          <div className='md:hidden w-[188px] h-[242px] absolute top-0 right-0'>
            <Image src='/images/slide-ele-3.svg' fill alt='element' />
          </div>
          <Slider slides={slides} />
        </div>
        <div className=' flexCenter w-full h-1/2 bottom-0 md:w-1/2 lg:w-3/5 md:h-full md:right-0 absolute'>
          <div className='absolute w-full h-full max-w-[450px] max-h-[280px] md:max-w-[530px] md:max-h-[375px] z-10  bottom-0'>
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
            <div className='absolute w-full h-full max-w-[180px] max-h-[180px] md:max-w-[230px] md:max-h-[230px]  z-10  left-2 md:-left-5  lg:-left-10 -translate-y-1/2 top-1/2 '>
              <Image
                src='/images/slide-ele-1.svg'
                fill
                alt='element'
                className='object-contain'
              />
            </div>
            <div className='absolute w-full h-full max-w-[180px] max-h-[180px] md:max-w-[230px] md:max-h-[230px]  z-10 mr-1 right-0 lg:right-14 bottom-0'>
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
