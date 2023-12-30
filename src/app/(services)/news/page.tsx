'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ConfigProvider, Select, Input } from 'antd';
import SubpageBreadcrumb from '@/components/SubpageBreadcrumb';
import Pagination from '@/components/Pagination';
import Tag from '@/components/Tag/Tag';
import { HOME_NEWS_ARTICLES, NEWS_CATEGORIES } from '@/constants';
import * as postServices from '@/apiServices/postServices';
import type { SearchProps } from 'antd/lib/input/Search';
const { Search } = Input;

const topNews = HOME_NEWS_ARTICLES;

const items = [
  {
    title: 'Trang chủ',
    href: '/',
  },
  { title: 'Tin tức' },
];
const NewsPage = () => {
  const [postsData, setPostsData] = useState<any[]>([]);
  const [activeCat, setActiveCat] = useState(0);
  // pagination
  const [page, setPage] = useState(1);
  const pagination = {
    limit: 4,
    totalItems: 6,
    page: page,
  };

  // START: fetch data
  useEffect(() => {
    const fetchData = async () => {
      const res = await postServices.getAll({
        params: { page: page, limit: pagination.limit },
      });
      setPostsData(res);
      console.log(res);
    };
    fetchData();
  }, [page, pagination.limit]);
  // END: fetch data

  //search bar setting
  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);

  //
  const formatNumber = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <div className='bg-neutral-1'>
      <SubpageBreadcrumb items={items} />
      <div className='padding-container max-container mb-[120px]'>
        <div className='flexBetween flex-wrap lg:flex-nowrap mb-20'>
          <div className=' relative w-full h-[300px] lg:h-[416px] rounded-2xl overflow-hidden lg:mr-[84px]'>
            <Link href={`/post/1`} className='relative w-full h-full block'>
              <Image
                src='/images/news1.png'
                alt='news'
                fill
                sizes='(max-width: 767px) 100vw'
                className='object-cover'
              />
            </Link>
          </div>
          <div className='w-full mt-8 lg:my-8 lg:max-w-[450px]'>
            <div className='flex'>
              {topNews[0].tags.map((tag, index) => (
                <Tag type='block' key={index}>
                  {tag}
                </Tag>
              ))}
            </div>
            <Link href={`/post/1`}>
              <h3 className='lg:hidden line-clamp-3 mt-4 mb-8'>
                {topNews[0].title}
              </h3>
              <h2 className='hidden lg:block line-clamp-3 mt-4 mb-8'>
                {topNews[0].title}
              </h2>
            </Link>
            <p className='line-clamp-3 mb-4 font-base text-neutral-8'>
              {topNews[0].desc}
            </p>
            <div className='flex gap-4 text-neutral-6 font-base'>
              <span className=''>
                Theo <b>{topNews[0].credit}</b>
              </span>
              <p>|</p>
              <span className=''>{topNews[0].publishedDate}</span>
            </div>
          </div>
        </div>
        <div className='-mx-10'>
          <div className='grid  lg:grid-cols-3 '>
            {topNews.slice(1, 4).map((article, index) => (
              <div
                key={index}
                className='gap-8 px-10 py-10 flex even:border-y even:border-neutral-5 lg:py-0  lg:even:border-y-0 lg:even:border-x  lg:flex-col'
              >
                <div className='relative rounded-2xl h-[120px] w-[120px] md:w-[220px] md:h-[220px] overflow-hidden shrink-0 lg:h-[220px] lg:w-full'>
                  <Link
                    href={`/post/${index}`}
                    className='block h-full w-full relative'
                  >
                    <Image
                      src={article.image}
                      alt='news-img'
                      fill
                      sizes='(max-width: 768px) 100vw'
                      className='object-cover'
                    />
                  </Link>
                </div>
                <div className='lg:w-full relative'>
                  <div className='flex flex-wrap gap-y-2 max-h-[24px] overflow-hidden '>
                    {article.tags.map((tag, index) => (
                      <Tag type='block' key={index} className='h-6 text-sm'>
                        {tag}
                      </Tag>
                    ))}
                  </div>
                  <Link href={`/post/${index}`}>
                    <h5 className='mt-2 mb-4 line-clamp-2'>{article.title}</h5>
                  </Link>
                  <p className='text-neutral-8 line-clamp-3'>{article.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='bg-neutral-3 rounded-t-[32px] w-full'>
        <div className='padding-container max-container relative pt-[120px]'>
          <div className='relative flex justify-between gap-10'>
            <div className='relative hidden lg:block w-[270px] shrink-0'>
              <ConfigProvider
                theme={{
                  token: {
                    controlHeight: 38,
                  },
                }}
              >
                <Search
                  placeholder='Tìm kiếm bài viết'
                  onSearch={onSearch}
                  enterButton
                />
              </ConfigProvider>
              <h4 className='mt-12 mb-6'>Danh mục</h4>
              <ul className='cat'>
                {NEWS_CATEGORIES.map((cat, index) => (
                  <li
                    key={index}
                    className=' h-10 flexStart mb-2 last:mb-0'
                    onClick={() => {
                      setActiveCat(index);
                    }}
                  >
                    <p
                      className={`block w-full h-full px-4 leading-10 cursor-pointer rounded-l font-semibold border-r-[3.2px] hover:text-royalBlue transition-all duration-300 ${
                        index === activeCat
                          ? 'bg-royalBlue/[0.1] border-royalBlue text-royalBlue'
                          : 'border-transparent'
                      }`}
                    >
                      {cat.name} ({formatNumber(cat.count)})
                    </p>
                  </li>
                ))}
              </ul>
              <div className='relative w-full h-[542px] rounded-2xl overflow-hidden mt-16'>
                <Image
                  src='/images/ad-banner.jpg'
                  fill
                  alt='ad-banner'
                  sizes='(max-width: 767px) 100vw'
                  className='object-cover'
                />
              </div>
            </div>
            <div className='w-full lg:max-w-[800px]'>
              <div className='flexBetween border-b border-[#BFBFBF] pb-4'>
                <h3 className='lg:hidden text-neutral-10 '>Tin tổng hợp</h3>
                <h2 className='hidden lg:block text-neutral-10 '>
                  Tin tổng hợp
                </h2>
                <div className='flexEnd '>
                  <p className='text-xs'>Sắp xếp theo:</p>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorText: '#2f61e6',
                      },
                    }}
                  >
                    <Select
                      defaultValue='Mới nhất'
                      style={{ width: 102 }}
                      bordered={false}
                      options={[
                        { value: 'asc', label: 'Mới nhất' },
                        { value: 'desc', label: 'Cũ nhất' },
                      ]}
                    />
                  </ConfigProvider>
                </div>
              </div>
              <div className='mb-12 w-full'>
                {postsData.map((post, index) => (
                  <div
                    key={index}
                    className='flexBetween gap-6 border-b border-neutral-5 py-8'
                  >
                    <div className='left-article'>
                      <div className='flex flex-wrap max-h-[24px] overflow-hidden'>
                        {post.categories.map((tag: any, index: number) => (
                          <Tag key={index} type='block' className='h-6 text-sm'>
                            {tag.name}
                          </Tag>
                        ))}
                      </div>
                      <Link href={`/post/${post.slug}`}>
                        <h5 className='mt-2 mb-4 line-clamp-3'>{post.name}</h5>
                      </Link>
                      <div className='line-clamp-3'>{post.excerpt}</div>
                    </div>
                    <Link href={`/post/${post.slug}`}>
                      <div className='relative w-[120px] h-[120px] rounded-lg overflow-hidden shrink-0 md:w-[270px] md:h-[180px]'>
                        <Image
                          src={post.thumbnail.location}
                          alt={post.thumbnail.alt || 'article thumbnail'}
                          fill
                          sizes='(max-width: 767px) 100vw'
                          className='object-cover'
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <div className='flexEnd'>
                <Pagination
                  pagination={pagination}
                  onPageChange={(page) => {
                    setPage(page);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
