import { useState, useEffect } from 'react';
import { User } from 'next-auth';
import { Button, ConfigProvider, Select } from 'antd';
import { EyeFilled } from '@ant-design/icons';
import Image from 'next/image';
import { Tag } from '@/components/shared';
import { Pagination } from '@/components/shared';
import { AddCompanyModal } from '@/components/modals';
import Link from 'next/link';
import * as companyServices from '@/apiServices/companyServices';
import { Company } from '@/types';
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
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = { limit: 5, totalItems: 10, page: currentPage };

  const [data, setData] = useState<Company[]>([]);

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
                className={`group rounded-md flexCenter gap-[6px] py-2 px-3 cursor-pointer z-10 grow transition-all duration-300  ${
                  activeTab === tab.id && 'bg-neutral-1 shadow-sm'
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
          {data &&
            data.map((company, index) => (
              <div
                key={index}
                className='rounded-lg shadow-card h-[300px] flexCenter flex-col'
              >
                <div className='p-4 w-full h-full'>
                  <div className='w-full h-20 relative'>
                    <Image
                      src={company.coverPhoto?.location || '/images/banner.png'}
                      fill
                      alt='banner'
                      sizes='(max-width: 640px) 100vw, 640px'
                      className='object-cover rounded-lg'
                    />
                    <Image
                      src={company.logo?.location || '/images/banner.png'}
                      alt='logo'
                      width={72}
                      height={72}
                      className='absolute top-1/2 left-1/2 -translate-x-1/2 rounded-lg shadow-banner bg-neutral-1'
                    />
                  </div>
                  <h5 className='mt-12 mb-3 text-center h-12 line-clamp-2'>
                    {company.name}
                  </h5>
                  <div className='flexCenter  max-h-[22px] flex-wrap overflow-hidden'>
                    {company.categories.map((cat, index) => (
                      <Tag
                        type='line'
                        className='text-xs  h-[22px] leading-[22px]'
                        key={index}
                      >
                        {cat.name}
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
                    <Link
                      href={`/dashboard/companies/${company._id}`}
                      className='w-full'
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
                    </Link>
                    {activeTab === 'published' && (
                      <Button type='primary' block>
                        <p className='flexCenter gap-2 font-semibold'>
                          <EyeFilled />
                          View
                        </p>
                      </Button>
                    )}
                    {activeTab === 'pending' && (
                      <Button type='primary' block>
                        <p className='flexCenter gap-2 font-semibold'>
                          <EyeFilled />
                          Preview
                        </p>
                      </Button>
                    )}
                    {activeTab === 'draft' && (
                      <Button type='primary' block>
                        <p className='flexCenter gap-2 font-semibold'>
                          <svg
                            width='14'
                            height='14'
                            className='text-neutral-1'
                          >
                            <use xlinkHref='/icons/paper-plane.svg#published' />
                          </svg>
                          Publish
                        </p>
                      </Button>
                    )}
                  </ConfigProvider>
                </div>
              </div>
            ))}
        </div>
        {pagination.totalItems / pagination.limit > 1 && (
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
    </>
  );
};

export default CompaniesItem;
