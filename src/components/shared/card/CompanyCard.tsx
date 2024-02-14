import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, ConfigProvider, Divider, message, Skeleton } from 'antd';
import CategoryTags from '@/components/shared/tag/CategoryTags';
import { StarFilled } from '@ant-design/icons';
import { Company } from '@/types';
import Tag from '../tag/Tag';

const CompanyCard = ({
  card,
  favorite,
  list,
  skeleton,
}: {
  card?: Company;
  favorite?: boolean;
  list?: boolean;
  skeleton?: boolean;
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  // pop up message thong bao thanh cong
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Đã sao chép nội dung!',
    });
  };

  const handleCopyText = () => {
    const textarea = document.createElement('textarea');
    if (card) textarea.value = card.taxCode;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    console.log('Đã sao chép nội dung!');
    success();
  };
  return skeleton ? (
    list ? (
      <div className='flexBetween gap-5 px-10 py-[14px] bg-neutral-1 rounded-lg shadow-card hover:shadow-cardHover'>
        <Skeleton.Avatar active size={62} shape='square' />
        <div className='grow w-full'>
          <Skeleton title={false} active paragraph={{ rows: 1, width: 200 }} />
        </div>
        <div className='w-[145px] shrink-0'>
          <Skeleton title={false} paragraph={{ rows: 1, width: '100%' }} />
        </div>
        <div className='w-[145px] shrink-0'>
          <Skeleton title={false} paragraph={{ rows: 1, width: '100%' }} />
        </div>
        <div className='w-[100px] shrink-0'>
          <Skeleton title={false} paragraph={{ rows: 1, width: '100%' }} />
        </div>
      </div>
    ) : (
      <div className='relative w-full p-6 bg-white rounded-lg shadow-card hover:shadow-cardHover transition-all flexBetween flex-col	'>
        <div className='w-full'>
          <div className='w-full h-[92px] relative'>
            <div className='w-full h-full absolute bg-neutral-4 rounded'></div>
            <Skeleton.Avatar
              active
              size={76}
              shape='square'
              className='z-10 absolute top-2 left-2'
            />
            <Skeleton
              className='absolute right-5 bottom-2 max-w-[130px] w-full'
              title={false}
              paragraph={{ rows: 1, width: '100%' }}
            />
          </div>

          <div className=''>
            <Skeleton
              active
              title={false}
              paragraph={{ rows: 1, width: '100%' }}
              className='mt-6 mb-2'
            />
            <div className='w-full flex gap-3'>
              {[...Array(4)].map((_, index) => (
                <Skeleton
                  key={index}
                  title={false}
                  paragraph={{ rows: 1, width: '100%' }}
                />
              ))}
            </div>
          </div>

          <Divider className='mt-4 mb-2' />
          <div className='text-xs'>
            <div className='grid grid-cols-8'>
              <div className='col-span-3'>
                <div className='flexStart gap-2'>
                  <Image
                    src={'/icons/location.svg'}
                    width={12}
                    height={12}
                    alt='Location-icon'
                  />
                  <span className='font-semibold inline-block '>Địa điểm</span>
                </div>
              </div>
              <Skeleton
                paragraph={{ rows: 1, width: '100%' }}
                title={false}
                className='col-span-5'
              />
            </div>
            <div className='grid grid-cols-8 mt-2 mb-2'>
              <div className='col-span-3'>
                <div className='flexStart gap-2'>
                  <Image
                    src={'/icons/company.svg'}
                    width={12}
                    height={12}
                    alt='company-icon'
                  />
                  <span className='font-semibold  inline-block'>Quy mô</span>
                </div>
              </div>
              <Skeleton
                paragraph={{ rows: 1, width: '50%' }}
                title={false}
                className='col-span-5'
              />
            </div>
            <div className='grid grid-cols-8'>
              <div className='col-span-3'>
                <div className='flexStart gap-2'>
                  <Image
                    src={'/icons/members.svg'}
                    width={12}
                    height={12}
                    alt='members-icon'
                  />
                  <span className='font-semibold'>Năm thành lập</span>
                </div>
              </div>
              <Skeleton
                paragraph={{ rows: 1 }}
                title={false}
                className='col-span-5'
              />
            </div>
          </div>
        </div>
        {favorite && (
          <div className='flexEnd w-full mt-4 hover:opacity-90'>
            <ConfigProvider
              theme={{
                components: {
                  Button: { defaultBg: '#FA8C16' },
                },
                token: {
                  colorPrimaryHover: 'none',
                  colorBgContainer: '#FA8C16',
                },
              }}
            >
              <Button block>
                <p className='flexCenter gap-2 text-neutral-1 font-semibold'>
                  <StarFilled />
                  Yêu thích
                </p>
              </Button>
            </ConfigProvider>
          </div>
        )}
      </div>
    )
  ) : list ? (
    card && (
      <div className='flexBetween gap-5 px-10 py-[14px] bg-neutral-1 rounded-lg shadow-card hover:shadow-cardHover'>
        {contextHolder}
        <Image
          src={card.logo?.location}
          alt='logo'
          width={62}
          height={62}
          className='object-cover border border-neutral-4 rounded shrink-0'
        />
        <p className='text-neutral-10 font-semibold grow text-left'>
          {card.name}
        </p>
        <div className='flexStart gap-2 w-[145px]'>
          <span className='text-xs text-neutral-10'>{card.taxCode}</span>
          <Image
            onClick={handleCopyText}
            src='/icons/copy.svg'
            width={12}
            height={12}
            alt='copy icon'
            title='copy'
            className='cursor-pointer'
          />
        </div>
        <div className='w-[145px] overflow-hidden flex flex-wrap h-5 shrink-0'>
          {card.categories?.map((cat, index) => (
            <Tag type='line' key={index} className='h-5 leading-5 text-xs'>
              {cat.name}
            </Tag>
          ))}
        </div>
        <div className='w-[100px] flexEnd gap-2'>
          <Image
            src={'/icons/location.svg'}
            width={12}
            height={12}
            alt='Location-icon'
          />
          <span className='font-semibold text-neutral-10'>{card.address}</span>
        </div>
      </div>
    )
  ) : (
    card && (
      <div className='relative w-full p-6 bg-white rounded-lg shadow-card hover:shadow-cardHover transition-all flexBetween flex-col	'>
        <div className='w-full'>
          <div className='w-full h-[92px] relative'>
            <Link
              href={`/companies/${card.slug}-${card._id}`}
              className='block w-full h-full absolute'
            >
              <Image
                src={card.coverPhoto?.location || '/images/blank-banner.png'}
                alt={card.coverPhoto?.alt || 'company-banner'}
                fill
                sizes="width:'100%'"
                className='rounded object-cover bg-royalBlue'
                priority
              />
              <Image
                src={
                  card.logo?.location ||
                  'https://s3.cloud.cmctelecom.vn/icongty-upload/b3-208-f.webp'
                }
                alt={card.logo?.alt || 'company-logo'}
                width={76}
                height={76}
                className='rounded-[2px] object-cover z-10 absolute top-2 left-2'
              />
            </Link>

            <p className='absolute right-5 bottom-2 text-xs text-white'>
              MST: {card.taxCode}
            </p>
          </div>

          <div className='min-h-[78px]'>
            <Link href={`/companies/${card.slug}-${card._id}`}>
              <h5 className='text-base text-neutral-10 line-clamp-2 mt-6 mb-2 hover:text-royalBlue'>
                {card.name}
              </h5>
            </Link>
            <CategoryTags data={card.categories} />
          </div>
          <Divider className='mt-4 mb-2' />
          <div className='text-xs'>
            <div className='grid grid-cols-8'>
              <div className='col-span-3'>
                <div className='flexStart gap-2'>
                  <Image
                    src={'/icons/location.svg'}
                    width={12}
                    height={12}
                    alt='Location-icon'
                  />
                  <span className='font-semibold inline-block '>Địa điểm</span>
                </div>
              </div>

              <span className='col-span-5'>{card.address}</span>
            </div>
            <div className='grid grid-cols-8 mt-2 mb-2'>
              <div className='col-span-3'>
                <div className='flexStart gap-2'>
                  <Image
                    src={'/icons/company.svg'}
                    width={12}
                    height={12}
                    alt='company-icon'
                  />
                  <span className='font-semibold  inline-block'>Quy mô</span>
                </div>
              </div>

              <span className='col-span-5'>
                {card.companySize ? `Trên ${card.companySize} nhân sự` : ''}
              </span>
            </div>
            <div className='grid grid-cols-8'>
              <div className='col-span-3'>
                <div className='flexStart gap-2'>
                  <Image
                    src={'/icons/members.svg'}
                    width={12}
                    height={12}
                    alt='members-icon'
                  />
                  <span className='font-semibold'>Năm thành lập</span>
                </div>
              </div>

              <span className='col-span-5'>
                {card.foundationDate?.split('-')[0]}
              </span>
            </div>
          </div>
        </div>
        {favorite && (
          <div className='flexEnd w-full mt-4 hover:opacity-90'>
            <ConfigProvider
              theme={{
                components: {
                  Button: { defaultBg: '#FA8C16' },
                },
                token: {
                  colorPrimaryHover: 'none',
                  colorBgContainer: '#FA8C16',
                },
              }}
            >
              <Button block>
                <p className='flexCenter gap-2 text-neutral-1 font-semibold'>
                  <StarFilled />
                  Yêu thích
                </p>
              </Button>
            </ConfigProvider>
          </div>
        )}
      </div>
    )
  );
};

export default CompanyCard;
