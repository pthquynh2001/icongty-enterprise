import Banner from '@/components/Banner';
import HomeSearch from '@/components/HomeSearch';
import CompaniesList from '@/components/CompaniesList';
import NewCompaniesList from '@/components/NewCompaniesList';

const Home = () => {
  return (
    <section className='flexStart flex-col mb-16 relative'>
      <Banner />
      <HomeSearch />
      <CompaniesList />
      <NewCompaniesList />
      <h2>banner</h2>
      <h2>companies</h2>
    </section>
  );
};

export default Home;
