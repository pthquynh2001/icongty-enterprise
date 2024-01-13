import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Advertising = () => {
  return (
    <div className='w-full h-[640px] mt-16 rounded-2xl overflow-hidden'>
      <Link href='/' className='block relative w-full h-full'>
        <Image
          src='/images/banner-ads.png'
          alt='banner ads'
          layout='fill'
          sizes='(max-width: 768px) 100vw, 33vw'
          objectFit='cover'
        />
      </Link>
    </div>
  );
};

export default Advertising;
