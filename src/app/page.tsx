import Banner from '@/components/Banner';
import HomeSearch from '@/components/HomeSearch';
import CompaniesList from '@/components/CompaniesList';
import NewCompaniesList from '@/components/NewCompaniesList';
import Carousel from '@/components/Carousel';
import CategoriesList from '@/components/CategoriesList';
import Highlight from '@/components/Highlight';
import News from '@/components/News/News';
import SubscribeBanner from '@/components/SubscribeBanner';

const Home = () => {
  return (
    <section className='flexStart flex-col relative'>
      <Banner />
      <HomeSearch />
      <div className='flexStart flex-col relative my-[140px] w-full gap-20'>
        <CompaniesList />
        <NewCompaniesList />
        <Carousel />
        <CategoriesList />
        <Highlight />
        <News />
        <SubscribeBanner />
      </div>
    </section>
  );
};

export default Home;
