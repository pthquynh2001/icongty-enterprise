'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { StarFilled } from '@ant-design/icons';
import { ConfigProvider, Button, Skeleton } from 'antd';
import Image from 'next/image';
import * as companyServices from '@/apiServices/companyServices';
import { COMPANY_TABS } from '@/constants';
import { Company } from '@/types';
import { SubpageBreadcrumb } from '@/components/subpage';
import { Header, Tag, Advertising } from '@/components/shared';
import {
  OverviewTab,
  PortfolioTab,
  ProductTab,
  ServiceTab,
  TabBar,
} from '@/components/companyPage/tabs';
import { ContactInfo, RelatedCompany } from '@/components/companyPage';

// import { Metadata } from 'next';
// export const metadata: Metadata = {
//   title: {
//     absolute: 'Danh mục ngành nghề',
//   },
// };

interface IItems {
  title?: string;
  href?: string;
}

const CompanyPage = ({ params }: { params: { slug: string } }) => {
  const companyId = params.slug.split('-').slice(-1)[0];
  const [company, setCompany] = useState<Company>({} as Company);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('');
  const [currentTagName, setCurrentTagName] = useState('Tổng quan');
  const search = useSearchParams().get('tab');
  const tabs = COMPANY_TABS;

  // breadcrumb
  const items: IItems[] = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Danh mục công ty', href: '/companies' },
    {
      title: company.name,
      href: activeTab === 'overview' ? undefined : `/companies/${params.slug}`,
    },
    activeTab !== 'overview' && { title: currentTagName },
  ].filter(Boolean) as IItems[];

  //   START: fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await companyServices.getAll({
        params: { _id: companyId },
      });
      setCompany(res[0]);
      setLoading(false);
    };
    fetchData();
  }, [companyId]);
  //   END: fetch data

  //set active tab
  useEffect(() => {
    if (search) {
      setActiveTab(search);
    } else {
      setActiveTab(tabs[0].id);
    }
  }, [search, tabs]);

  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.id === activeTab);
    if (currentTab) {
      setCurrentTagName(currentTab.name);
    }
  }, [activeTab, tabs]);

  return (
    <div className='pt-[104px] lg:pt-[120px] pb-[120px]'>
      <Header search />
      <div className='max-container padding-container'>
        <div className='my-8'>
          {loading ? (
            <Skeleton active paragraph={false} title={{ width: 500 }} />
          ) : (
            <SubpageBreadcrumb items={items} />
          )}
        </div>
        {/* START: TOP content */}
        <div className='flexBetween bg-neutral-1 flex-col rounded-2xl overflow-hidden mb-14'>
          <div className='h-[234px] w-full relative bg-neutral-5'>
            {!loading && (
              <Image
                src={company.coverPhoto?.location}
                alt={company.coverPhoto?.alt || 'cover photo'}
                fill
                sizes='(max-width: 639px) 100vw'
                className='object-cover'
              />
            )}
          </div>
          <div className='w-full min-h-[150px] relative flexBetween'>
            <div className='w-[150px] h-[150px] absolute left-[62px] -top-[30px] rounded-lg shadow-banner overflow-hidden bg-neutral-3'>
              {loading ? (
                <Skeleton active className='p-4' title={false} />
              ) : (
                <Image
                  src={company.logo?.location}
                  alt={company.logo?.alt || 'logo photo'}
                  fill
                  sizes='(max-width: 639px) 100vw'
                  className='object-cover'
                />
              )}
            </div>
            {loading ? (
              <Skeleton className='ml-[258px] p-4' paragraph={{ rows: 2 }} />
            ) : (
              <div className='ml-[268px] flexBetween w-full'>
                <div className='flex max-w-[482px]  mt-6 mb-8 flex-col'>
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
            )}
          </div>
          {/* tab bar */}
          <div className='border-t border-neutral-4 pl-16 w-full'>
            <TabBar tabs={tabs} />
          </div>
        </div>
        {/* END: TOP content */}
        <div className='flex gap-6'>
          {/* START: Left content */}
          <div className='w-full'>
            {activeTab === 'overview' && (
              <OverviewTab
                company={company}
                loading={loading}
                companyId={companyId}
              />
            )}
            {activeTab === 'portfolio' && <PortfolioTab />}
            {activeTab === 'products' && <ProductTab companyId={companyId} />}
            {activeTab === 'services' && <ServiceTab companyId={companyId} />}
          </div>
          {/* END: Left content */}

          {/* START: Right content */}
          <div className='hidden lg:flex w-[320px] shrink-0  flex-col'>
            <ContactInfo company={company} loading={loading} />
            <RelatedCompany />
            <Advertising />
          </div>
          {/* END: Right content */}
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
