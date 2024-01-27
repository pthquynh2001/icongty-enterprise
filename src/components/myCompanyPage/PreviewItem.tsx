import { Company } from '@/types';
import React from 'react';
import ItemTitle from './ItemTitle';
import { CompanyCard } from '@/components/shared';

const PreviewItem = ({ company }: { company: Company }) => {
  return (
    <div>
      <ItemTitle
        title='Preview'
        subtitle='You’re in live view! This is how your company will look like.'
      />
      <div className='mb-12'>
        <h4 className='mb-6'>List View</h4>
        <CompanyCard card={company} list />
      </div>
      <>
        <h4 className='mb-6'>Grid View</h4>
        <div className='grid grid-cols-3'>
          <CompanyCard card={company} />
        </div>
      </>
    </div>
  );
};

export default PreviewItem;
