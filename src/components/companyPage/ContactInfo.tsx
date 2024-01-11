import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from 'antd';
import { Company } from '@/types';

const ContactInfo = ({
  company,
  loading,
}: {
  company: Company;
  loading: any;
}) => {
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);

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
    <div className='w-full px-8 py-12  rounded-2xl  bg-neutral-1 shadow-banner mb-6'>
      <h5 className='pb-2 border-b border-neutral-5'>Thông tin liên hệ</h5>
      {loading ? (
        <Skeleton active className='py-4' />
      ) : (
        <div className='flex flex-col gap-3  pt-4 pb-8 '>
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
      )}
      <div className='w-full'>
        <h5 className='pt-4 border-t  border-neutral-5'>
          Chia sẻ doanh nghiệp
        </h5>
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
      </div>
    </div>
  );
};

export default ContactInfo;
