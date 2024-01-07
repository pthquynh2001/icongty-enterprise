import { useState, useEffect } from 'react';
import Frame from '@/components/companyPage/Frame';
import Portfolio from '@/components/companyPage/Portfolio';
import Link from 'next/link';
import ProgressPagination from '@/components/companyPage/ProgressPagination';
import * as portfolioServices from '@/apiServices/portfolioServices';

interface PortfolioSectionProps {
  id: number;
  downloadUrl: string;
  name: string;
  excerpt: string;
  thumbnailUrl: string | null;
  categories: { name: string }[];
  fileType: 'pdf' | 'docx';
}

const PortfolioSection: React.FC = () => {
  const [data, setData] = useState<PortfolioSectionProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = { page: currentPage, limit: 3, totalItems: 22 };
  // fetch data

  useEffect(() => {
    const fetchData = async () => {
      const res = await portfolioServices.getAll({
        params: { page: currentPage, limit: pagination.limit },
      });
      setData(res);
    };
    fetchData();
  }, [currentPage, pagination.limit]);

  return (
    <>
      {data && (
        <Frame title='Hồ sơ năng lực' className='relative'>
          {data.map((portfolio, index) => (
            <div
              className='py-5 border-b border-neutral-4 first:pt-0'
              key={index}
            >
              <Portfolio props={portfolio} />
            </div>
          ))}
          <div className='absolute top-[48px] right-[62px]'>
            <Link href='/'>
              <p className='text-royalBlue font-semibold pl-2 py-[2px]'>
                Xem thêm
              </p>
            </Link>
          </div>
          {pagination.totalItems / pagination.limit > 1 && (
            <div className='mt-8'>
              <ProgressPagination
                pagination={pagination}
                onPageChange={(currentPage) => {
                  setCurrentPage(currentPage);
                }}
              />
            </div>
          )}
        </Frame>
      )}
    </>
  );
};

export default PortfolioSection;
