'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ClockCircleFilled } from '@ant-design/icons';
import { ConfigProvider, Button, Skeleton } from 'antd';
import Image from 'next/image';
import { SubpageBreadcrumb } from '@/components/subpage';
import * as postServices from '@/apiServices/postServices';
import { Header, Tag, Advertising } from '@/components/shared';
import {
  OverviewTab,
  PortfolioTab,
  ProductsTab,
  ServicesTab,
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

const ArticlePage = ({ params }: { params: { slug: string } }) => {
  const articleId = params.slug.split('-').slice(-1)[0];
  const [article, setArticle] = useState<any>({});
  const [topNews, setTopNews] = useState<any[]>([]);
  console.log(articleId);
  // breadcrumb
  const items = [
    {
      title: 'Trang chủ',
      href: '/',
    },
    { title: 'Tin tức', href: '/news' },
    { title: 'Chi tiết tin' },
  ];
  // START: fetch data
  useEffect(() => {
    const fetchData = async () => {
      const res = await postServices.getAll({
        params: { page: 1, limit: 5 },
      });
      setTopNews(res);
    };
    fetchData();
  }, []);
  // END: fetch data
  // START: fetch data
  useEffect(() => {
    const fetchData = async () => {
      const res = await postServices.getAll({
        params: { _id: articleId },
      });
      setArticle(res[0]);
    };
    fetchData();
  }, [articleId]);
  // END: fetch data
  const formattedDate = (string: string) => {
    const date = new Date(string);
    let dayName = '';
    const currentDay = date.getUTCDay();
    switch (currentDay) {
      case 0:
        dayName = 'Chủ nhật';
        break;
      case 1:
        dayName = 'Thứ hai';
        break;
      case 2:
        dayName = 'Thứ ba';
        break;
      case 3:
        dayName = 'Thứ tư';
        break;
      case 4:
        dayName = 'Thứ năm';
        break;
      case 5:
        dayName = 'Thứ sáu';
        break;
      case 6:
        dayName = 'Thứ bảy';
    }
    return `${dayName}, ${
      date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate()
    }/${
      date.getUTCMonth() + 1 < 10
        ? '0' + (date.getUTCMonth() + 1)
        : date.getUTCMonth() + 1
    }/${date.getUTCFullYear()}, ${date.getUTCHours()}:${date.getUTCMinutes()}`;
  };

  return (
    article && (
      <>
        <div className='padding-container max-container pb-[120px]'>
          <div className='mt-8 mb-14'>
            <SubpageBreadcrumb items={items} />
          </div>
          <div className='flex gap-[84px] w-full'>
            <div className='bg-yellow-100 grow'>
              <h2 className='mb-8'>{article.name}</h2>
              <div className='flexBetween gap-10 mb-12'>
                <div className='flex flex-wrap max-h-[26px] overflow-hidden'>
                  {article.categories?.map((category: any, index: number) => (
                    <Tag
                      key={index}
                      type='block'
                      className='h-[26px] text-base'
                    >
                      {category.name}
                    </Tag>
                  ))}
                </div>
                <div className='flexEnd gap-2 shrink-0'>
                  <ClockCircleFilled className='text-sm !text-sunsetOrange-6' />
                  {formattedDate(article.createdAt)}
                </div>
              </div>
              <div className='w-full'>
                <div className='relative w-full h-[535px] bg-red-100'>
                  <Image
                    src={article.thumbnail?.location}
                    alt='cover photo'
                    fill
                    className='object-cover rounded-2xl '
                    sizes='(max-width: 639px) 100vw'
                  />
                </div>
                <p className='text-xs text-neutral-7'>
                  Nhân viên một cây xăng tại TP Thủ Đức (TP HCM) bơm nhiên liệu
                  cho khách hàng, tháng 11/2022. Ảnh: Thanh Tùng
                </p>
              </div>
            </div>
            <div className='bg-pink-50 w-[270px] shrink-0'>
              <Advertising />
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default ArticlePage;
