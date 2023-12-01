import Image from 'next/image';

const Banner = () => {
  return (
    <div className='h-[600px] w-full relative'>
      <Image
        src='/images/banner.png'
        fill={true}
        alt='iCongty-banner'
        style={{
          objectFit: 'cover', // cover, contain, none
        }}
        priority={true}
      />
    </div>
  );
};

export default Banner;
