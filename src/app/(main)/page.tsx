import { Header } from '@/components/shared';
import {
  Banner,
  HomeSearch,
  CompaniesList,
  NewCompaniesList,
  Carousel,
  CategoriesList,
  Highlight,
  News,
  SubscribeBanner,
} from '@/components/homePage';

const HomePage = () => {
  return (
    <>
      <Header type='home' />
      <main className='flexStart flex-col relative'>
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
      </main>
    </>
  );
};

export default HomePage;
