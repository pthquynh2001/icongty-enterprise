import HeaderSearch from '@/components/HeaderSearch';
import Footer from '@/components/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <HeaderSearch />
      <div className='pt-[104px] lg:pt-[120px] bg-neutral-1'>{children}</div>
      <Footer />
    </section>
  );
}
