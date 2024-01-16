import Image from 'next/image';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className='bg-neutral-3 w-screen min-h-screen relative'>
        <Link href={'/'} className='absolute left-14 top-9'>
          <Image
            src='/icons/logo-full.svg'
            alt='logo'
            width={136}
            height={36}
          />
        </Link>
        {children}
      </div>
    </section>
  );
}
