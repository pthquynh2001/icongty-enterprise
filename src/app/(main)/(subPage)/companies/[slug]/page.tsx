'use client';
import { useState, useEffect } from 'react';
import * as companyServices from '@/apiServices/companyServices';
import SubpageBreadcrumb from '@/components/SubpageBreadcrumb';
import Image from 'next/image';
import Link from 'next/link';
import CompanyCard from '@/components/CompanyCard';
import Pagination from '@/components/Pagination';
import HeaderSearch from '@/components/HeaderSearch';
import Tag from '@/components/Tag/Tag';
import CategoryTags from '@/components/CategoryTags';
import { Select, ConfigProvider, Button } from 'antd';
import { COMPANY_TABS } from '@/constants';
import { StarFilled } from '@ant-design/icons';

// import { Metadata } from 'next';
// export const metadata: Metadata = {
//   title: {
//     absolute: 'Danh mục ngành nghề',
//   },
// };

interface items {
  title?: string;
  href?: string;
}

const CompanyPage = ({ params }: { params: { slug: string } }) => {
  const productId = params.slug.split('-').slice(-1)[0];
  const [company, setCompany] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTagName, setCurrentTagName] = useState('Tổng quan');
  const items: items[] = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Danh mục công ty', href: '/companies' },
    {
      title: company.name,
      href: activeTab === 'overview' ? undefined : `/companies/${params.slug}`,
    },
    activeTab !== 'overview' && { title: currentTagName },
  ].filter(Boolean) as items[];
  //   START: fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await companyServices.getAll({
        params: { _id: productId },
      });
      setLoading(false);
      setCompany(res[0]);
      console.log(res[0]);
    };
    fetchData();
  }, [productId]);
  //   END: fetch data

  useEffect(() => {
    if (activeTab === 'overview') {
      items.push({ title: company.name });
    } else {
      items.push({ title: company.name, href: `/companies/${params.slug}` });
      items.push({ title: activeTab });
      console.log(items);
    }
  }, [activeTab]);
  return (
    <>
      <HeaderSearch />
      <div className='pt-[104px] lg:pt-[120px]'>
        <SubpageBreadcrumb items={items} />
        <div className='max-container padding-container'>
          <div className='flexBetween bg-neutral-1 flex-col rounded-2xl overflow-hidden mb-14'>
            <div className='h-[234px] w-full relative'>
              <Image
                src={company.coverPhoto?.location}
                alt={company.coverPhoto?.alt || 'cover photo'}
                fill
                sizes='(max-width: 639px) 100vw'
                className='object-cover'
              />
            </div>
            <div className='w-full min-h-[150px] relative flexBetween'>
              <div className='w-[150px] h-[150px] absolute left-[62px] -top-[30px] rounded-lg shadow-banner overflow-hidden'>
                <Image
                  src={company.logo?.location}
                  alt={company.logo?.alt || 'logo photo'}
                  fill
                  sizes='(max-width: 639px) 100vw'
                  className='object-cover'
                />
              </div>
              <div className='flex max-w-[482px] ml-[268px] mt-6 mb-8 flex-col'>
                <h3 className='text-2xl font-semibold mb-[10px]'>
                  {company.name}
                </h3>
                <div className='flex flex-wrap max-h-[22px] overflow-hidden'>
                  {company.categories?.map((category: any, index: number) => (
                    <Tag key={index} type='line' className='h-[22px] text-xs'>
                      {category.name}
                    </Tag>
                  ))}
                </div>
              </div>
              <div className='flex justify-end flex-col gap-7 mr-8'>
                <div className='flexEnd gap-3'>
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          defaultBg: '#FA8C16',
                          defaultBorderColor: 'white',
                          defaultColor: 'white',
                        },
                      },
                      token: {
                        colorBorder: 'white',
                        colorText: 'white',
                      },
                    }}
                  >
                    <button className='text-neutral-1 bg-sunsetOrange-6 h-8 px-[15px] rounded cursor-pointer'>
                      <StarFilled className='mr-2' />
                      Yêu thích
                    </button>
                  </ConfigProvider>

                  <Button type='primary'>
                    <div className='flexCenter gap-2'>
                      <Image
                        src='/icons/id-card.svg'
                        width={14}
                        height={14}
                        alt='icon'
                      />
                      <span>Liên hệ</span>
                    </div>
                  </Button>
                </div>
                <div className='flexEnd gap-3'>
                  <span className='text-neutral-6 text-xs'>
                    Đã tham gia từ {company.createdAt?.split('-')[1]}/
                    {company.createdAt?.split('-')[0]}
                  </span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='5'
                    height='4'
                    viewBox='0 0 5 4'
                    fill='none'
                  >
                    <circle cx='2.5' cy='2' r='2' fill='#BFBFBF' />
                  </svg>
                  {company.status === 'active' && (
                    <div className='flexCenter gap-1'>
                      <Image
                        src='/icons/verified.svg'
                        width={16}
                        height={16}
                        alt='icon'
                      />
                      <span className='text-green-700 font-semibold'>
                        Đã xác minh
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='h-12  border-t border-neutral-4 pl-16 w-full'>
              <ul className='flex gap-3 h-full'>
                {COMPANY_TABS.map((tab, index) => (
                  <li
                    className='inline-block group transition-all duration-300 px-5 h-full'
                    key={index}
                    onClick={() => {
                      setActiveTab(tab.id), setCurrentTagName(tab.name);
                    }}
                  >
                    <Link
                      href={`/companies/${params.slug}`}
                      className={`flexCenter gap-[10px] h-full border-y-[3px] border-transparent ${
                        tab.id === activeTab && 'border-b-royalBlue'
                      }`}
                    >
                      <svg width='14' height='14'>
                        <use
                          className={`text-sunsetOrange-6 transition-all duration-300  ${
                            tab.id === activeTab && '!text-royalBlue'
                          }`}
                          xlinkHref={`${tab.icon.src}#${tab.icon.id}`}
                        />
                      </svg>
                      <span
                        className={`group-hover:text-royalBlue transition-all duration-300 font-semibold ' ${
                          tab.id === activeTab && 'text-royalBlue'
                        }`}
                      >
                        {tab.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyPage;
