'use client';
import { useState, useEffect, use } from 'react';
import * as companyServices from '@/apiServices/companyServices';
import SubpageBreadcrumb from '@/components/SubpageBreadcrumb';
import Image from 'next/image';
import Link from 'next/link';
import HeaderSearch from '@/components/HeaderSearch';
import Tag from '@/components/Tag/Tag';
import Overview from '@/components/companyPage/Overview';
import About from '@/components/companyPage/About';
import { Select, ConfigProvider, Button } from 'antd';
import { COMPANY_TABS } from '@/constants';
import { StarFilled } from '@ant-design/icons';
import { COMPANY_ABOUT_CONTENT } from '@/constants';

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
  const [relatedCompanies, setRelatedCompanies] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTagName, setCurrentTagName] = useState('Tổng quan');
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

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
    };
    fetchData();
  }, [productId]);
  //   END: fetch data

  //   START: fetch data, 5 related companies
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await companyServices.getAll({
        params: { limit: 5, page: 1 },
      });
      setLoading(false);
      setRelatedCompanies(res);
    };
    fetchData();
  }, []);
  //   END: fetch data, 5 related companies
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

  return (
    <>
      <HeaderSearch />
      <div className='pt-[104px] lg:pt-[120px] pb-[120px]'>
        <SubpageBreadcrumb items={items} />
        {company && (
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
                      <Link
                        href={`/companies/${params.slug}`}
                        className={`flexCenter gap-[10px] h-full border-y-[3px] border-transparent ${
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
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* END: TOP content */}
            <div className='flex gap-6'>
              {/* START: Left content */}
              <div className='w-full bg-pink-300 flex flex-col gap-6'>
                <Overview company={company} />
                <About content={COMPANY_ABOUT_CONTENT.content}></About>
              </div>
              {/* END: Left content */}
              {/* START: Right content */}
              <div className='w-[320px] shrink-0 flex flex-col'>
                <div className='w-full px-8 py-12  rounded-2xl  bg-neutral-1 shadow-banner mb-6'>
                  <h5>Thông tin liên hệ</h5>
                  <div className='flex flex-col gap-3 border-y border-neutral-5 pt-4 pb-8 mt-2 mb-4'>
                    <div className='flexStart gap-4 '>
                      <div className='w-8 h-8 flexCenter bg-sunsetOrange-1 rounded'>
                        <Image
                          src='/icons/phone.svg'
                          width={12}
                          height={12}
                          alt='icon'
                        />
                      </div>
                      {!showPhone && (
                        <p
                          onClick={() => setShowPhone(!showPhone)}
                          className='text-royalBlue text-xs font-semibold cursor-pointer'
                        >
                          Xem số điện thoại
                        </p>
                      )}
                      {showPhone && (
                        <p className='font-semibold text-xs'>
                          {company.phone && company.phone.length === 13
                            ? company.phone.replace(
                                /(\d{2})(\d{4})(\d{3})(\d{3})/,
                                '$1 $2 $3 $4'
                              )
                            : company.phone.replace(
                                /(\d{2})(\d{3})(\d{3})(\d{3})/,
                                '$1 $2 $3 $4'
                              )}
                        </p>
                      )}
                    </div>
                    <div className='flexStart gap-4 '>
                      <div className='w-8 h-8 flexCenter bg-sunsetOrange-1 rounded'>
                        <Image
                          src='/icons/email.svg'
                          width={12}
                          height={12}
                          alt='icon'
                        />
                      </div>
                      {!showEmail && (
                        <p
                          onClick={() => setShowEmail(!showEmail)}
                          className='text-royalBlue text-xs font-semibold cursor-pointer'
                        >
                          Xem địa chỉ email
                        </p>
                      )}
                      {showEmail && (
                        <p className='font-semibold text-xs'>{company.email}</p>
                      )}
                    </div>
                    {company.website && (
                      <div className='flexStart gap-4 '>
                        <div className='w-8 h-8 flexCenter bg-sunsetOrange-1 rounded'>
                          <Image
                            src='/icons/link.svg'
                            width={12}
                            height={12}
                            alt='icon'
                          />
                        </div>

                        <p className=' text-xs font-semibold cursor-pointer'>
                          <a href={company.website}>
                            {company.website.replace(/^https?:\/\/|(\/)/g, '')}
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                  <>
                    <h5>Chia sẻ doanh nghiệp</h5>
                    <div className='mt-2 flexStart gap-3'>
                      <div className='cursor-pointer'>
                        <svg width='32' height='32'>
                          <use
                            className='text-royalBlue'
                            xlinkHref='/icons/facebook.svg#Facebook-icon'
                          />
                        </svg>
                      </div>
                      <div className='cursor-pointer'>
                        <svg width='32' height='32'>
                          <use
                            className='text-royalBlue'
                            xlinkHref='/icons/linkedIn.svg#LinkedIn-icon'
                          />
                        </svg>
                      </div>
                      <div className='cursor-pointer'>
                        <svg width='32' height='32'>
                          <use
                            className='text-royalBlue'
                            xlinkHref='/icons/twitter.svg#Twitter-icon'
                          />
                        </svg>
                      </div>
                    </div>
                  </>
                </div>
                {relatedCompanies && (
                  <div className='w-full px-8 py-12 rounded-2xl  bg-neutral-1 shadow-banner'>
                    <h5>Công ty tương tự</h5>
                    <div className='flex flex-col mt-2 pt-4 border-t border-t-neutral-5 w-full gap-4'>
                      {relatedCompanies.map((company: any, index: number) => (
                        <div
                          className='relative flex gap-4 w-full border-b border-neutral-4 pb-6'
                          key={index}
                        >
                          <div className='relative w-16 h-16 rounded overflow-hidden shadow-banner flex-shrink-0'>
                            <Link
                              href={`/companies/${company.slug}-${company._id}`}
                              className='block relative w-full h-full'
                            >
                              <Image
                                src={company.logo?.location}
                                alt='logo'
                                fill
                                sizes='(max-width: 768px) 100vw, 33vw'
                                className='object-cover'
                              />
                            </Link>
                          </div>
                          <div className=''>
                            <Link
                              href={`/companies/${company.slug}-${company._id}`}
                            >
                              <p
                                className='text-xs font-semibold text-neutral-10 line-clamp-2 mb-2'
                                title={company.name}
                              >
                                {company.name}
                              </p>
                            </Link>

                            <div className='h-[22px] max-h-[22px] flex flex-wrap overflow-hidden'>
                              {company.categories?.map(
                                (category: any, index: number) => (
                                  <Tag
                                    key={index}
                                    type='line'
                                    className='h-[22px] text-xs'
                                  >
                                    {category.name}
                                  </Tag>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className='w-full h-[640px] mt-16 rounded-2xl overflow-hidden'>
                  <Link href='/' className='block relative w-full h-full'>
                    <Image
                      src='/images/banner-ads.png'
                      alt='banner ads'
                      layout='fill'
                      sizes='(max-width: 768px) 100vw, 33vw'
                      objectFit='cover'
                    />
                  </Link>
                </div>
              </div>
              {/* END: Right content */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CompanyPage;
