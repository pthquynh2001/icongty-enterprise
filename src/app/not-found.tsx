import Link from 'next/link';
import Image from 'next/image';
import { Button, ConfigProvider } from 'antd';
export default function NotFound() {
  return (
    <div className='bg-neutral-3 padding-container max-container relative  w-screen h-screen max-h-screen pt-20'>
      <Link href={'/'}>
        <div className='flexCenter w-[180px] '>
          <Image
            src='/icons/logo-full.svg'
            alt='logo'
            width={180}
            height={48}
          />
        </div>
      </Link>

      <div className='max-w-[510px] absolute left-0 top-1/2 -translate-y-1/2'>
        <p className='text-neutral-13 text-4xl font-semibold mb-2'>
          404 - Page not found
        </p>
        <p className='text-neutral-7 mb-[60px]'>
          we're sorry, the page you requested could not be found. Please go back
          to the homepage or contact us at support@icongty.vn
        </p>
        <Link href='/'>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  fontSize: 16,
                  paddingInline: 30,
                },
              },
              token: {
                controlHeight: 48,
              },
            }}
          >
            <Button type='primary'>Back to home</Button>
          </ConfigProvider>
        </Link>
      </div>
      <div className='max-w-[500px] h-[400px] absolute w-full right-0 top-1/2 -translate-y-1/2 '>
        <Image
          src='/images/404.svg'
          alt='404'
          fill
          sizes='(max-width: 768px) 100vw, 33vw'
          className='object-contain object-center'
        />
      </div>
    </div>
  );
}
