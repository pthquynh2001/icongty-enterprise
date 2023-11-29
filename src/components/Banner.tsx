import Image from 'next/image';

const Banner = () => {
  return (
    <div className='height-[600px]'>
      <Image src='/images/banner.png' fill={true} alt='iCongty-banner' />
    </div>
  );
};

export default Banner;
