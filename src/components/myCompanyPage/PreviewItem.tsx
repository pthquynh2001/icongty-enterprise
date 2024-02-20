import { Company } from '@/types';
import React from 'react';
import ItemTitle from './ItemTitle';
import { CompanyCard } from '@/components/shared';
import * as companyServices from '@/apiServices/companyServices';
import { useState, useEffect } from 'react';

const PreviewItem = ({ companyId }: { companyId: string }) => {
  const [company, setCompany] = useState<Company>({} as Company);
  const [loading, setLoading] = useState(true);
  //   START: fetch data
  useEffect(() => {
    const fetchData = async () => {
      const res = await companyServices.getAll({
        params: { id: companyId },
      });
      setCompany(res[0]);
      setLoading(false);
    };
    fetchData();
  }, [companyId]);
  //   END: fetch data

  return (
    <div>
      <ItemTitle
        title='Preview'
        subtitle='You’re in live view! This is how your company will look like.'
      />
      <div className='mb-12'>
        <h4 className='mb-6'>List View</h4>
        {loading ? (
          <CompanyCard skeleton list />
        ) : (
          <CompanyCard card={company} list />
        )}
      </div>
      <>
        <h4 className='mb-6'>Grid View</h4>
        <div className='grid grid-cols-3'>
          {loading ? <CompanyCard skeleton /> : <CompanyCard card={company} />}
        </div>
      </>
    </div>
  );
};

export default PreviewItem;
