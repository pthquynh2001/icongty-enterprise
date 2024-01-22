import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { LoginForm } from '@/components/form';

const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect('/');
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
