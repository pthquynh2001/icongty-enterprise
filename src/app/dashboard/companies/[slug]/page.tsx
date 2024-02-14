'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UserInfo } from '@/components/form';
import { Header } from '@/components/shared';
import { MY_COMPANY_MENU } from '@/constants';
import { useSession } from 'next-auth/react';
import SideBar from '@/components/dashboardPage/SideBar';
import { LeftOutlined } from '@ant-design/icons';
import { useSearchParams } from 'next/navigation';
import * as companyServices from '@/apiServices/companyServices';
import { Skeleton } from 'antd';
import { Company } from '@/types';
import PreviewItem from '@/components/myCompanyPage/PreviewItem';
import SummaryItem from '@/components/myCompanyPage/summaryItem/SummaryItem';
import MyProductItem from '@/components/myCompanyPage/myProductItem/MyProductItem';
import MyPortfolioItem from '@/components/myCompanyPage/myPortfolioItem/MyPortfolioItem';
import EditorItem from '@/components/myCompanyPage/EditorItem';
import ServiceItem from '@/components/myCompanyPage/ServiceItem';

const MyCompanyPage = ({ params }: { params: { slug: string } }) => {
  const companyId = params.slug;
  const [company, setCompany] = useState<Company>({} as Company);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const user = session?.user;
  const menu = MY_COMPANY_MENU;
  const [activeItem, setActiveItem] = useState('');
  const [activeItemName, setActiveItemName] = useState(
    menu[0].subMenu[0].name || ''
  );

  const searchedItem = useSearchParams().get('page');
  // breadcrumb items
  const items = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: activeItemName },
  ];

  //   START: fetch data
  useEffect(() => {
    const fetchData = async () => {
      const res = await companyServices.getAll({
        params: { _id: companyId },
      });
      setCompany(res[0]);
      setLoading(false);
    };
    fetchData();
  }, [companyId]);
  //   END: fetch data

  //   START: set active item
  useEffect(() => {
    if (searchedItem) {
      setActiveItem(searchedItem);
    } else {
      setActiveItem(menu[0].subMenu[0].id);
    }
  }, [searchedItem, menu]);
  // set active item name
  useEffect(() => {
    const currentItem = menu
      .flatMap((item) => item.subMenu)
      .filter((subItem) => subItem.id === activeItem);
    if (currentItem[0]) {
      setActiveItemName(currentItem[0].name);
    } else {
      setActiveItemName(menu.map((item) => item.subMenu[0].name)[0]);
    }
  }, [activeItem, menu]);

  return (
    <div className='w-full  min-h-screen pt-16 lg:pt-20  bg-neutral-4 pb-6'>
      <Header />
      <div className='flex  w-full h-full'>
        <div className='shrink-0 left w-[320px] py-6 pl-6 my-6'>
          <div className=' rounded-2xl border border-royalBlue  mr-6 text-base text-royalBlue hover:opacity-80 mb-8'>
            <Link
              href={'/dashboard?page=companies'}
              className='flexCenter gap-4 w-full h-full px-6 py-4'
            >
              <LeftOutlined />
              <span className='font-semibold'>Back to My Companies</span>
            </Link>
          </div>
          {loading ? (
            <div className='flexStart gap-2 mb-8 pr-10'>
              <Skeleton.Avatar active shape='square' size={35} />
              <Skeleton title={false} paragraph={{ rows: 1, width: '100%' }} />
            </div>
          ) : (
            <div className='flex gap-2 mb-8 pr-10'>
              <Image
                src={company.logo?.location}
                alt='logo'
                width={35}
                height={35}
                className='rounded shadow-lg'
              />
              <h5 className='text-base font-semibold text-neutral-11'>
                {company.name}
              </h5>
            </div>
          )}
          <SideBar menu={menu} />
          <UserInfo />
        </div>
        <div className='right border-l border-neutral-5 w-full pl-[60px] pr-[84px] py-6 my-6'>
          {activeItem === 'preview' && <PreviewItem companyId={companyId} />}
          {activeItem === 'summary' && <SummaryItem companyId={companyId} />}
          {activeItem === 'product' && <MyProductItem companyId={companyId} />}
          {activeItem === 'portfolio' && (
            <MyPortfolioItem companyId={companyId} />
          )}
          {activeItem === 'editor' && <EditorItem companyId={companyId} />}
          {activeItem === 'service' && <MyProductItem companyId={companyId} />}
        </div>
      </div>
    </div>
  );
};

export default MyCompanyPage;
