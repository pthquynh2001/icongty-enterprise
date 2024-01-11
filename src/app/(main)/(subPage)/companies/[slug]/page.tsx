'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { StarFilled } from '@ant-design/icons';
import { ConfigProvider, Button } from 'antd';
import * as companyServices from '@/apiServices/companyServices';
import { SubpageBreadcrumb } from '@/components/subpage';
import { HeaderSearch, Tag } from '@/components/shared';
import { RightContent } from '@/components/companyPage';
import {
  OverviewTab,
  PortfolioTab,
  ProductTab,
  ServiceTab,
} from '@/components/companyPage/tabs';
import { COMPANY_TABS } from '@/constants';

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
interface company {
  name: string;
  coverPhoto: {
    location: string;
    alt?: string;
  };
  logo: {
    location: string;
    alt?: string;
  };
  categories?: any;
  createdAt: string;
  status: string;
  phone?: string;
  email?: string;
  website?: string;
}

const CompanyPage = ({ params }: { params: { slug: string } }) => {
  const companyId = params.slug.split('-').slice(-1)[0];
  const [company, setCompany] = useState<company>({} as company);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTagName, setCurrentTagName] = useState('Tổng quan');
  const [RightContentProps, setRightContentProps] = useState<any>({});
  // breadcrumb
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
        params: { _id: companyId },
      });
      setLoading(false);
      setCompany(res[0]);
    };
    fetchData();
  }, [companyId]);
  //   END: fetch data

  // START: width & left of active tab border
  useEffect(() => {
    const activeTab = document.querySelector('.active-tab') as HTMLElement;
    const activeTabBorder = document.querySelector(
      '.active-tab-border'
    ) as HTMLElement;
    if (activeTabBorder && activeTab) {
      activeTabBorder.style.left = `${activeTab.offsetLeft}px`;
      activeTabBorder.style.width = `${activeTab.offsetWidth}px`;
    }
  }, [activeTab]);
  // END: width & left of active tab border

  //
  useEffect(() => {
    setRightContentProps({
      phone: company.phone,
      email: company.email,
      website: company.website,
    });
  }, [company]);

  return (
    <>
      <HeaderSearch />
      <div className='pt-[104px] lg:pt-[120px] pb-[120px]'>
        <SubpageBreadcrumb items={items} />

        <div className='max-container padding-container'>
          {/* START: TOP content */}
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
              <ul className='flex gap-3 h-full relative'>
                <div className='h-[2px] absolute bottom-0  bg-royalBlue transition-all duration-700 active-tab-border'></div>
                {COMPANY_TABS.map((tab, index) => (
                  <li
                    className='inline-block group transition-all duration-300 px-5 h-full'
                    key={index}
                    onClick={() => {
                      setActiveTab(tab.id), setCurrentTagName(tab.name);
                    }}
                  >
                    <div
                      className={`flexCenter gap-[10px] h-full border-y-[3px] border-transparent cursor-pointer ${
                        tab.id === activeTab && 'active-tab'
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
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* END: TOP content */}
          <div className='flex gap-6'>
            {/* START: Left content */}
            <div className='w-full'>
              {activeTab === 'overview' && <OverviewTab company={company} />}
              {activeTab === 'portfolio' && <PortfolioTab company={company} />}
              {activeTab === 'products' && <ProductTab />}
              {activeTab === 'services' && <ServiceTab />}
            </div>
            {/* END: Left content */}

            {/* START: Right content */}
            <div className='hidden lg:flex w-[320px] shrink-0  flex-col'>
              <RightContent company={RightContentProps} />
            </div>
            {/* END: Right content */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyPage;
