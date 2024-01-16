import Image from 'next/image';

import { LoginForm } from '@/components/form';

const LoginPage = () => {
  return (
    <div className='w-full h-full flex'>
      <LoginForm />
      <div className='hidden lg:block w-1/2 h-full overflow-hidden absolute right-0 rounded-l-2xl shadow-banner'>
        <Image
          src='/images/login.png'
          alt='login'
          fill
          sizes='(min-width: 1024px)  100vw'
          className='object-cover'
        />
      </div>
    </div>
  );
};

export default LoginPage;
