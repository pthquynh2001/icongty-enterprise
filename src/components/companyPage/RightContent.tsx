import React from 'react';
import { useState, useEffect } from 'react';
import * as companyServices from '@/apiServices/companyServices';
import Image from 'next/image';
import Link from 'next/link';
import Tag from '@/components/shared/tag/Tag';

interface RightContentProps {
  company: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

const RightContent: React.FC<RightContentProps> = ({ company }) => {
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);
  const [relatedCompanies, setRelatedCompanies] = useState<any>([]);

  //   START: fetch data, 5 related companies
  useEffect(() => {
    const fetchData = async () => {
      const res = await companyServices.getAll({
        params: { limit: 5, page: 1 },
      });
      setRelatedCompanies(res);
    };
    fetchData();
  }, []);
  //   END: fetch data, 5 related companies

  function formatUrl(inputUrl: string) {
    // Loại bỏ 'https://' hoặc 'http://'
    let formattedUrl = inputUrl.replace(/^https?:\/\//, '');

    // Loại bỏ 'www.'
    formattedUrl = formattedUrl.replace(/^www\./, '');

    // Loại bỏ dấu '/' cuối cùng
    formattedUrl = formattedUrl.replace(/\/$/, '');

    return formattedUrl;
  }

  return (
    <div className='flex flex-col'>
      <div className='w-full px-8 py-12  rounded-2xl  bg-neutral-1 shadow-banner mb-6'>
        <h5>Thông tin liên hệ</h5>
        <div className='flex flex-col gap-3 border-y border-neutral-5 pt-4 pb-8 mt-2 mb-4'>
          {/* START: PHONE */}
          {company.phone && (
            <div className='flexStart gap-4 '>
              <div className='w-8 h-8 flexCenter bg-sunsetOrange-1 rounded shrink-0'>
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
          )}

          {/* END: PHONE */}

          {/* START: EMAIL */}
          {company.email && (
            <div className='flexStart gap-4 '>
              <div className='w-8 h-8 flexCenter bg-sunsetOrange-1 rounded shrink-0'>
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
          )}
          {/* END: EMAIL */}

          {/* START: WEBSITE */}
          {company.website && (
            <div className='flexStart gap-4 '>
              <div className='w-8 h-8 flexCenter bg-sunsetOrange-1 rounded shrink-0'>
                <Image
                  src='/icons/link.svg'
                  width={12}
                  height={12}
                  alt='icon'
                />
              </div>
              {!showWebsite && (
                <p
                  onClick={() => setShowWebsite(!showWebsite)}
                  className='text-royalBlue text-xs font-semibold cursor-pointer'
                >
                  Xem địa chỉ website
                </p>
              )}
              {showWebsite && (
                <p className='text-xs font-semibold'>
                  <a href={company.website}>{formatUrl(company.website)}</a>
                </p>
              )}
            </div>
          )}

          {/* END: WEBSITE */}
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
                  xlinkHref='/icons/linkedin.svg#LinkedIn-icon'
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
                  <Link href={`/companies/${company.slug}-${company._id}`}>
                    <p
                      className='text-xs font-semibold text-neutral-10 line-clamp-2 mb-2'
                      title={company.name}
                    >
                      {company.name}
                    </p>
                  </Link>

                  <div className='h-[22px] max-h-[22px] flex flex-wrap overflow-hidden'>
                    {company.categories?.map((category: any, index: number) => (
                      <Tag key={index} type='line' className='h-[22px] text-xs'>
                        {category.name}
                      </Tag>
                    ))}
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
  );
};

export default RightContent;
