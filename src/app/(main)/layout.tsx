import { Footer } from '@/components/shared';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='bg-neutral-4'>
      {children}
      <Footer />
    </section>
  );
}
