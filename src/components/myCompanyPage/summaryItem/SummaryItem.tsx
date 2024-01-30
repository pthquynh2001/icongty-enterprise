import IdentitySection from './IdentitySection';
import BasicInfoSection from './BasicInfoSection';

const SummaryItem = () => {
  return (
    <div className='flex flex-col gap-6'>
      <IdentitySection />
      <BasicInfoSection />
    </div>
  );
};

export default SummaryItem;
