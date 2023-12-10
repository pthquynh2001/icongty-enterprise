import Image from 'next/image';

const Banner = () => {
  return (
    <div className='h-[600px]  w-full relative m-auto'>
      <div className="w-full h-full bg-[url('/images/banner.png')] bg-no-repeat bg-cover"></div>
    </div>
  );
};

export default Banner;
