import { Header, Footer } from '@/components/shared';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header search />
      <div className='pt-[104px] lg:pt-[120px] bg-neutral-1'>{children}</div>
      <Footer />
    </section>
  );
}
