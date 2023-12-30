import HeaderSearch from '@/components/HeaderSearch';
import Footer from '@/components/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <HeaderSearch />
      <div className='py-[104px] lg:py-[120px]'>{children}</div>
      <Footer />
    </section>
  );
}
