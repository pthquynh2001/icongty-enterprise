'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, ConfigProvider } from 'antd';
import Swiper from 'swiper';
// import 'swiper/css';
import 'swiper/css/pagination';
import './News.scss';
import { Pagination, Navigation, Autoplay, Parallax } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import Tag from '@/components/Tag/Tag';
import { HOME_NEWS_SLIDES, HOME_NEWS_ARTICLES } from '@/constants/index';

const News = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const newsData = HOME_NEWS_SLIDES;
  const articlesData = HOME_NEWS_ARTICLES;
  useEffect(() => {
    const swiperParams: SwiperOptions = {
      modules: [Pagination, Navigation, Autoplay, Parallax],
      spaceBetween: 0,
      mousewheel: true,
      slidesPerView: 2,
      loop: true,
      direction: 'horizontal',
      parallax: {
        enabled: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 5000,
      },
      pagination: {
        clickable: false,
        type: 'custom',
        el: '.swiper-pagination',
        renderCustom: function (swiper, current, total) {
          const progressPercentage = (current / total) * 100;
          const customPaginationHTML = `
            <div class="pagination-container">
              <div class="swiper-pagination-current">${
                current < 10 ? '0' + current : current
              }</div>
              <div class="progress-bar">
                <div class="progress-bar-inner" style="width: ${progressPercentage}%"></div>
              </div>
              <div class="swiper-pagination-total">${
                total < 10 ? '0' + total : total
              }</div>
            </div>
          `;

          return (swiper.pagination.el.innerHTML = customPaginationHTML);
        },
      },
    };

    const swiper = new Swiper('.news-swiper', swiperParams);
    swiper.on('slideChange', function () {
      setCurrentSlide(swiper.realIndex);
    });

    swiper.update();
    return () => {
      swiper.destroy(true, true);
      swiper.off('slideChange');
    };
  }, []);

  return (
    <div className='!hidden lg:!flex home-news max-container padding-container w-full h-[660px] flexBetween'>
      <div className='w-[684px] h-full relative'>
        <div className='absolute w-full h-full overflow-hidden'>
          <div className='swiper news-swiper !w-[200%] h-full'>
            <div className='swiper-wrapper !w-1/2'>
              {newsData.map((news, index) => (
                <div className='swiper-slide z-20 absolute !w-full' key={index}>
                  <div className='w-full h-[130px] '>
                    <div
                      className='flexStart w-[400px] flex-wrap max-h-[22px] overflow-hidden'
                      data-swiper-parallax-opacity='0'
                      data-swiper-parallax='500'
                    >
                      {news.tags.map((tag, index) => (
                        <Tag
                          key={index}
                          type='block'
                          className='h-[22px] text-xs'
                        >
                          {tag}
                        </Tag>
                      ))}
                    </div>
                    <Link href={news.link}>
                      <h3
                        className='text-neutral-7 w-[400px] line-clamp-2 mt-3 mb-8 h-16'
                        data-swiper-parallax-scale='0.5'
                        data-swiper-parallax-x='312'
                      >
                        {news.title}
                      </h3>
                    </Link>
                  </div>
                  <Link href={news.link}>
                    <div className='h-[465px] w-full absolute overflow-hidden rounded-2xl'>
                      <Image
                        src={news.image}
                        fill
                        alt='news img'
                        sizes='max-width: 100%; height: auto;'
                        className='object-cover object-center'
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className='!w-[212px] !h-[130px] !absolute right-1/2 top-0 swiper-wrapper '>
              <div className='w-[212px] absolute top-7 right-0 z-10 '>
                <p className='text-xs text-neutral-6 mb-2'>Tiếp theo:</p>
                <div className='swiper-button-next text-xs text-neutral-7 font-semibold line-clamp-2  cursor-pointer !w-auto opacity-0'>
                  {newsData[currentSlide + 1]?.title
                    ? newsData[currentSlide + 1].title
                    : newsData[0].title}
                </div>
              </div>
            </div>
            <div className='!w-full !h-[53px] !absolute left-0 bottom-0 swiper-wrapper '>
              <div className='swiper-pagination !w-1/2 h-full'></div>
              <div className='flexBetween gap-2 absolute bottom-0 left-2 z-10  w-[72px] h-full'>
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        paddingInline: 10,
                      },
                    },
                    token: {
                      controlHeight: 32,
                    },
                  }}
                >
                  <Button
                    type='primary'
                    className='swiper-button-prev w-8 h-8'
                    ghost
                  ></Button>
                  <Button
                    type='primary'
                    className='swiper-button-next w-8 h-8'
                    ghost
                  ></Button>
                </ConfigProvider>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='w-[408px] h-full relative text-neutral-1 ml-4'>
        <div className='flexBetween mb-4 mt-[66px]'>
          <h3>Tin mới</h3>

          <Link href={`/news`}>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    fontWeight: 600,
                  },
                },
              }}
            >
              <Button type='primary' ghost>
                Xem tất cả
              </Button>
            </ConfigProvider>
          </Link>
        </div>
        {articlesData.slice(0, 3).map((article, index) => (
          <div
            key={index}
            className={`flexBetween gap-[30px] w-full min-h-[182px] py-4${
              index !== 2 ? ' border-b border-b-neutral-5' : ''
            } `}
          >
            <div className='flex flex-wrap'>
              <Link href={article.link}>
                <div className='w-[120px] h-[120px] relative rounded-lg overflow-hidden'>
                  <Image
                    src={article.image}
                    alt='news img'
                    fill
                    sizes='max-width:100%; height:auto;'
                  />
                </div>
              </Link>
              <p className='text-xs text-neutral-6 font-semibold mt-[10px] line-clamp-1'>
                Theo: {article.credit}
              </p>
            </div>
            <div className='flex flex-col grow h-full'>
              <div className='flex flex-wrap  mb-2  max-h-[22px] overflow-hidden'>
                {article.tags.map((tag, index) => (
                  <Tag key={index} type='block' className='h-[22px] text-xs'>
                    {tag}
                  </Tag>
                ))}
              </div>
              <Link href={article.link}>
                <p className='text-neutral-10 font-semibold line-clamp-2 mb-4'>
                  {article.title}
                </p>
              </Link>
              <p className='text-neutral-8 text-xs line-clamp-3 leading-5'>
                {article.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
