import { useState, useEffect } from 'react';
import { User } from 'next-auth';
import { Button, ConfigProvider, Select } from 'antd';
import { EyeFilled } from '@ant-design/icons';
import Image from 'next/image';
import { Tag } from '@/components/shared';
import { Pagination } from '@/components/shared';
import { AddCompanyModal } from '@/components/modals';

interface CompaniesItemProps {
  user: User;
}

const tabs = [
  {
    id: 'published',
    name: 'Published',
    icon: { location: '/icons/paper-plane.svg', id: 'published' },
  },
  {
    id: 'pending',
    name: 'Pending',
    icon: { location: '/icons/pending.svg', id: 'pending' },
  },
  {
    id: 'draft',
    name: 'Draft',
    icon: { location: '/icons/draft.svg', id: 'draft' },
  },
];
const CompaniesItem = ({ user }: CompaniesItemProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id || 'published');
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = { limit: 8, totalItems: 10, page: currentPage };

  const testArray = [...Array(10)];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArray = testArray.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div className='mb-8'>
        <h3 className='mt-4 mb-2'>My Companies</h3>
        <p className='text-base '>
          Manage and edit your companies here. Publish your first companies to
          start your journey.
        </p>
      </div>
      <div className='bg-neutral-1 rounded-2xl  p-12'>
        <div className='grid grid-cols-3 w-full gap-6 mb-8'>
          <div className='bg-neutral-3 rounded-lg flexBetween p-1 relative '>
            {tabs.map((tab, index) => (
              <div
                className={`group flexCenter gap-[6px] py-2 px-3 cursor-pointer z-10 grow transition-all duration-300 shadow-sm ${
                  activeTab === tab.id && 'bg-neutral-1 rounded-md'
                }`}
                key={index}
                onClick={() => setActiveTab(tab.id)}
              >
                <svg
                  width='14'
                  height='14'
                  className={`font-semibold leading-[22px] transition-all duration-300  ${
                    activeTab === tab.id
                      ? 'text-royalBlue'
                      : 'text-sunsetOrange-6'
                  }`}
                >
                  <use xlinkHref={`${tab.icon.location}#${tab.icon.id}`} />
                </svg>
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
          <div className='col-start-3 flexEnd'>
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
        <div className='grid grid-cols-3 w-full gap-6'>
          <div className='rounded-lg shadow-card h-[300px] flexCenter flex-col'>
            <AddCompanyModal user={user} />
          </div>
          {currentArray.map((_, index) => (
            <div
              key={index}
              className='rounded-lg shadow-card h-[300px] flexCenter flex-col'
            >
              <div className='p-4 w-full h-full'>
                <div className='w-full h-20 relative'>
                  <Image
                    src='/images/banner.png'
                    fill
                    alt='banner'
                    sizes='(max-width: 640px) 100vw, 640px'
                    className='object-cover rounded-lg'
                  />
                  <Image
                    src='/images/ad-banner.jpg'
                    alt='banner'
                    width={72}
                    height={72}
                    className='absolute top-1/2 left-1/2 -translate-x-1/2 rounded-lg shadow-banner'
                  />
                </div>
                <h5 className='mt-12 mb-3 text-center h-12 line-clamp-2'>
                  Tập đoàn Công nghiệp - Viễn thông Quân đội Viettel
                </h5>
                <div className='flexCenter  max-h-[22px] flex-wrap overflow-hidden'>
                  {[...Array(5)].map((_, index) => (
                    <Tag type='line' className='text-xs  h-[22px]' key={index}>
                      tag {index}
                    </Tag>
                  ))}
                </div>
              </div>
              <div className='w-full flex gap-2 h-[58px] shrink-0 pt-3 pb-4 px-4 border-t border-neutral-3'>
                <ConfigProvider
                  theme={{
                    token: {
                      controlHeight: 30,
                    },
                  }}
                >
                  <Button type='primary' block>
                    <p className='flexCenter gap-2 font-semibold'>
                      <Image
                        src='/icons/edit.svg'
                        width={14}
                        height={14}
                        alt='icon'
                      />
                      Edit
                    </p>
                  </Button>
                  <Button type='primary' block>
                    <p className='flexCenter gap-2 font-semibold'>
                      <EyeFilled />
                      View
                    </p>
                  </Button>
                </ConfigProvider>
              </div>
            </div>
          ))}
        </div>
        {testArray.length / itemsPerPage > 1 && (
          <div className='mt-10 flexEnd'>
            <Pagination
              pagination={pagination}
              onPageChange={(currentPage) => {
                setCurrentPage(currentPage);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompaniesItem;
