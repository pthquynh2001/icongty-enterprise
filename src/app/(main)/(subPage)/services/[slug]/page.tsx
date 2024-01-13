'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Skeleton } from 'antd';
import * as serviceServices from '@/apiServices/serviceServices';
import * as companyServices from '@/apiServices/companyServices';
import { SubpageBreadcrumb, ContentFrame, Gallery } from '@/components/subpage';
import { HeaderSearch, Tag } from '@/components/shared';
import { Company } from '@/types';
import {
  RelatedServices,
  OtherServices,
  AboutService,
} from '@/components/servicePage';

const ServicePage = ({ params }: { params: { slug: string } }) => {
  const [service, setService] = useState<any>({});
  const [company, setCompany] = useState<Company>({} as Company);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any>([]);
  const [gallery, setGallery] = useState([]);
  const serviceId = params.slug.split('-').slice(-1)[0];
  const companyId = service?.companyId || '';
  const companyParams = company
    ? `/companies/${company?.slug}-${company?._id}`
    : '';

  // fetch API service
  useEffect(() => {
    const getService = async () => {
      setLoading(true);
      const res = await serviceServices.getAll({
        params: { page: 1, limit: 1, id: serviceId },
      });
      setService(res[0]);
      setGallery(res[0].gallery?.images || []);
      setLoading(false);
    };
    getService();
  }, [serviceId]);

  // fetch API company
  useEffect(() => {
    const getCompany = async () => {
      const res = await companyServices.getAll({
        params: { page: 1, limit: 1, _id: companyId },
      });
      setCompany(res[0]);
    };
    getCompany();
  }, [companyId]);

  useEffect(() => {
    // set breadcrumb items
    if (service && companyParams) {
      const breadcrumbItems = [
        { title: 'Trang chủ', href: '/' },
        {
          title: service.companyName,
          href: companyParams,
        },
        { title: service.name },
      ];
      setItems(breadcrumbItems);
    }
  }, [service, companyParams]);

  return (
    <div className='pt-[104px] lg:pt-[120px] pb-[120px]'>
      <HeaderSearch />
      {/* TOP */}
      <div className='max-container padding-container '>
        <div className='mt-8 mb-[22px]'>
          {loading ? (
            <Skeleton
              active
              paragraph={false}
              title={{ width: 300 }}
              className='h-[22px]'
            />
          ) : (
            <SubpageBreadcrumb items={items} />
          )}
        </div>

        <Link href={`${companyParams}?tab=services`}>
          <div className='flexStart gap-2 mb-6'>
            <LeftOutlined className='text-base' />
            <h4>Danh mục dịch vụ</h4>
          </div>
        </Link>
        <div className='w-full relative h-[248px] rounded-2xl  overflow-hidden bg-neutral-5'>
          {!loading && (
            <Image
              src={service.coverPhoto.location}
              alt='cover photo'
              quality={100}
              fill
              className='object-cover'
              sizes='(max-width: 640px) 100vw, 640px'
            />
          )}

          <div className='w-full h-full flexStart gap-6 py-12 px-[62px] relative'>
            {loading ? (
              <div className='px-10 w-[152px]'>
                <Skeleton.Image active />
              </div>
            ) : (
              <Image
                src={service.logo?.location}
                alt='logo'
                width={152}
                height={152}
                className='object-cover  rounded-lg '
              />
            )}

            <div className='flex flex-col w-full'>
              {loading ? (
                <div className='w-[400px]'>
                  <Skeleton active paragraph={{ rows: 2 }} />
                </div>
              ) : (
                company && (
                  <>
                    <div className='flex'>
                      <Tag type='line' grey className='h-5 mb-2  opacity-80'>
                        Customer Data Platform
                      </Tag>
                    </div>
                    <div className='mb-4'>
                      <a
                        target='_blank'
                        href='https://example.com/'
                        className='flex gap-2  '
                      >
                        <h2 className='text-neutral-1 '>{service.name}</h2>
                        <ArrowRightOutlined
                          style={{ color: 'white' }}
                          className='text-[17px] self-start pt-2'
                          rotate={-45}
                        />
                      </a>
                    </div>
                    <Link href={companyParams} className='flex gap-2'>
                      <Image
                        src={company.logo?.location}
                        alt='company logo'
                        width={24}
                        height={24}
                        className='object-cover rounded-[50%]'
                      />
                      <p className='text-neutral-1 opacity-80 font-semibold'>
                        {company.name}
                      </p>
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        </div>
        <div className='flex gap-6 mt-14'>
          {/* Left */}
          <div className='w-full flex flex-col gap-6'>
            <AboutService service={service} loading={loading} />
            <Gallery gallery={gallery} loading={loading} />
            <ContentFrame title='Video'>
              <div className='bg-royalBlue w-full h-64 text-neutral-1 flexCenter rounded-2xl'>
                video
              </div>
            </ContentFrame>
          </div>
          {/* Right */}
          <div className='hidden lg:flex w-[320px] shrink-0  flex-col gap-6'>
            {/* Company's other services */}
            <OtherServices
              companyParams={companyParams}
              mainItemId={serviceId}
              companyName={service.companyName}
            />
            {/* Related services */}
            <RelatedServices mainItemId={serviceId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
