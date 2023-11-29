import Image from 'next/image';

const Banner = () => {
  return (
    <div className='h-[600px] relative'>
      <Image
        src='/images/banner.png'
        fill={true}
        alt='iCongty-banner'
        style={{
          objectFit: 'cover', // cover, contain, none
        }}
      />
    </div>
  );
};

export default Banner;
