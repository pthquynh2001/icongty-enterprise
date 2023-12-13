import Banner from '@/components/Banner';
import HomeSearch from '@/components/HomeSearch';
import CompaniesList from '@/components/CompaniesList';
import NewCompaniesList from '@/components/NewCompaniesList';
import Carousel from '@/components/Carousel';

const Home = () => {
  return (
    <section className='flexStart flex-col relative'>
      <Banner />
      <HomeSearch />
      <div className='flexStart  flex-col relative my-[140px]  gap-20'>
        <CompaniesList />
        <NewCompaniesList />
        <Carousel />
      </div>
    </section>
  );
};

export default Home;
