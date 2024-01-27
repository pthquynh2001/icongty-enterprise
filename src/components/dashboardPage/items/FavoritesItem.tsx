import { User } from 'next-auth';
import { useEffect, useState } from 'react';
import { Button, ConfigProvider, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CompanyCard from '@/components/shared/card/CompanyCard';
import * as companyServices from '@/apiServices/companyServices';
import Pagination from '@/components/shared/pagination/Pagination';

interface FavoritesItemProps {
  user: User;
}
const tabs = [
  {
    id: 'company',
    name: 'Company',
  },
  {
    id: 'product',
    name: 'Product',
  },
  {
    id: 'job',
    name: 'Job',
  },
  {
    id: 'event',
    name: 'Event',
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
  },
];

const FavoritesItem = ({ user }: FavoritesItemProps) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = { limit: 6, totalItems: 9, page: currentPage };

  const [activeTab, setActiveTab] = useState(tabs[0].id || 'company');
  useEffect(() => {
    const fetchData = async () => {
      const res = await companyServices.getAll({
        params: { page: currentPage, limit: pagination.limit },
      });
      setData(res);
    };
    fetchData();
  }, [currentPage, pagination.limit]);

  return (
    <>
      <div className='flex mb-8'>
        <div className='bg-neutral-3 rounded-lg flexStart p-1'>
          {tabs.map((tab, index) => (
            <div
              className={`group  py-2 px-3 cursor-pointer z-10  transition-all duration-300 ${
                activeTab === tab.id && 'bg-neutral-1 rounded-md shadow-sm '
              }`}
              key={index}
              onClick={() => setActiveTab(tab.id)}
            >
              <span
                className={`font-semibold leading-[22px] transition-all duration-300 group-hover:text-royalBlue ${
                  activeTab === tab.id ? 'text-royalBlue' : 'text-neutral-8'
                }`}
              >
                {tab.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className='flexBetween mb-8'>
        <div className='flex'>
          <div className='flexCenter bg-royalBlue w-12 h-10 rounded-s'>
            <SearchOutlined style={{ color: 'white' }} />
          </div>
          <input
            className='w-[400px] rounded-e outline-none px-6 py-2 placeholder:text-neutral-6'
            placeholder='Search your favorite'
          />
        </div>
        <div className='flexEnd'>
          <p className='text-xs'>Sắp xếp theo:</p>
          <ConfigProvider
            theme={{
              token: {
                colorText: '#2f61e6',
              },
            }}
          >
            <Select
              defaultValue='Từ A-Z'
              style={{ width: 102 }}
              bordered={false}
              options={[
                { value: 'asc', label: 'Từ A-Z' },
                { value: 'desc', label: 'Từ Z-A' },
              ]}
            />
          </ConfigProvider>
        </div>
      </div>
      <div className='grid grid-cols-3  gap-6'>
        {data.map((card, index) => {
          return <CompanyCard card={card} key={index} favorite />;
        })}
      </div>
      {pagination.totalItems > pagination.limit && (
        <div className='flexEnd mt-10'>
          <Pagination
            pagination={pagination}
            onPageChange={(newPage) => {
              setCurrentPage(newPage);
            }}
          />
        </div>
      )}
    </>
  );
};

export default FavoritesItem;
