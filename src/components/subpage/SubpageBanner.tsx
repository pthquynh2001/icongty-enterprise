import React from 'react';
import Image from 'next/image';

interface BannerProps {
  title?: string;
  desc?: string;
  image: string;
}

const SubpageBanner: React.FC<BannerProps> = (props) => {
  return (
    <div className='relative w-full h-[250px] max-container md:px-10 xl:px-0'>
      <div className='relative w-full h-full  md:rounded-2xl md:shadow-banner overflow-hidden '>
        <Image
          src={props.image}
          fill
          sizes='max-width: 100%; height: 100%;'
          alt='banner image'
          className='object-cover object-right '
        />
        <div className='md:hidden bg-gradient-to-b from-[#0000001A] to-[#000000CC] absolute inset-0'></div>
        <div className='absolute w-full h-full inset-0  flex justify-center items-center flex-col gap-4 mx-4 text-center md:max-w-[500px] md:text-left md:mx-16 md:items-start'>
          <h2 className='text-neutral-11 hidden md:block'>{props.title}</h2>
          <h3 className='text-neutral-1 md:hidden'>{props.title}</h3>
          <p className='text-neutral-1 md:text-neutral-8 md:text-base leading-6 max-w-[330px]'>
            {props.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubpageBanner;
