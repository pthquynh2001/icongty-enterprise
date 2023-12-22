import Header from '@/components/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      <div className='mt-20'>{children}</div>
    </section>
  );
}
