import { RegisterForm } from '@/components/form';
import Image from 'next/image';

const RegisterPage = () => {
  return (
    <div className='w-full h-full flex'>
      <RegisterForm />
      <div className='hidden lg:block w-1/2 h-full overflow-hidden absolute right-0 rounded-l-2xl shadow-banner'>
        <Image
          src='/images/register.png'
          alt='register'
          fill
          sizes='(min-width: 1024px)  100vw'
          className='object-cover'
        />
      </div>
    </div>
  );
};

export default RegisterPage;
