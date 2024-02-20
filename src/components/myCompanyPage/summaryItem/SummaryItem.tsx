'use client';
import { useState, useEffect } from 'react';
import CompanyBasicInfo from './CompanyBasicInfo';
import * as companyServices from '@/apiServices/companyServices';
import { Company } from '@/types';
import Thumbnail from '../Thumbnail';

const SummaryItem = ({ companyId }: { companyId: string }) => {
  const [company, setCompany] = useState<Company>({} as Company);
  //   START: fetch data
  useEffect(() => {
    const fetchData = async () => {
      const res = await companyServices.getAll({
        params: { id: companyId },
      });
      setCompany(res[0]);
    };
    fetchData();
  }, [companyId]);
  //   END: fetch data

  return (
    <div className='flex flex-col gap-6'>
      <Thumbnail title='Brand Identity' item={company} />
      <CompanyBasicInfo companyId={companyId} />
    </div>
  );
};

export default SummaryItem;
