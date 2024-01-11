'use client';
import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Image as AntdImg, Skeleton } from 'antd';
import * as productsServices from '@/apiServices/productsServices';
import * as companyServices from '@/apiServices/companyServices';
import { SubpageBreadcrumb, ContentFrame } from '@/components/subpage';
import { ProgressPagination, Tag, HeaderSearch } from '@/components/shared';
import { ProductCard } from '@/components/productPage';

import { Company } from '@/types';
import Gallery from '@/components/productPage/Gallery';

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const [product, setProduct] = useState<any>({});
  const [otherProducts, setOtherProducts] = useState<any>([]);
  const [relatedProducts, setRelatedProducts] = useState<any>([]);
  const [company, setCompany] = useState<Company>({} as Company);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<any>([]);
  const productId = params.slug.split('-').slice(-1)[0];
  const companyId = product?.companyId || '';

  // gallery
  const [gallery, setGallery] = useState([]);
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const gallery = product?.gallery?.images || [];
  const currentImages = gallery.slice(indexOfFirstItem, indexOfLastItem);

  // fetch API product
  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      const res = await productsServices.getAll({
        params: { page: 1, limit: 1, id: productId },
      });
      setProduct(res[0]);
      setGallery(res[0].gallery?.images || []);
      setIsLoading(false);
    };
    getProduct();
  }, [productId]);

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

  // fetch company other products
  useEffect(() => {
    if (companyId) {
      const getOtherProducts = async () => {
        const res = await productsServices.getAll({
          params: { companyId: companyId },
        });
        setOtherProducts(res);
        console.log('other', res);
      };
      getOtherProducts();
    }
  }, [companyId]);

  // fetch related products
  useEffect(() => {
    const getRelatedProducts = async () => {
      const res = await productsServices.getAll({
        params: { limit: 5, page: 1 },
      });
      setRelatedProducts(res);
    };
    getRelatedProducts();
  }, []);

  useEffect(() => {
    // set breadcrumb items
    if (product && company) {
      const breadcrumbItems = [
        { title: 'Trang chủ', href: '/' },
        {
          title: product.companyName,
          href: `/companies/${company.slug}-${product.companyId}`,
        },
        { title: product.name },
      ];
      setItems(breadcrumbItems);
    }
  }, [product, company]);

  return (
    <div>
      <HeaderSearch />
      {product && company && (
        <div className='pt-[104px] lg:pt-[120px] pb-[120px]'>
          {/* TOP */}

          <div className='max-container padding-container'>
            {isLoading ? (
              <Skeleton
                active
                paragraph={false}
                title={{ width: 300 }}
                className='pt-8 pb-[22px] h-[22px]'
              />
            ) : (
              <SubpageBreadcrumb items={items} />
            )}
            <div className='flexStart gap-2 mb-6'>
              <LeftOutlined className='text-base' />
              <h4>Danh mục sản phẩm</h4>
            </div>
            <div className='w-full relative h-[248px] rounded-2xl  overflow-hidden bg-neutral-5'>
              {!isLoading && (
                <Image
                  src={product.coverPhoto.location}
                  alt='cover photo'
                  quality={100}
                  fill
                  className='object-cover'
                  sizes='(max-width: 640px) 100vw, 640px'
                />
              )}

              <div className='w-full h-full flexStart gap-6 py-12 px-[62px] relative'>
                {isLoading ? (
                  <div className='w-[152px] h-[152px]'>
                    <Skeleton.Image active />
                  </div>
                ) : (
                  <Image
                    src={product.logo?.location}
                    alt='logo'
                    width={152}
                    height={152}
                    className='object-cover  rounded-lg '
                  />
                )}

                <div className='flex flex-col w-full'>
                  {isLoading ? (
                    <Skeleton active paragraph={{ rows: 2 }} />
                  ) : (
                    <>
                      <div className='flex'>
                        <Tag type='line' className='h-5 mb-2 inline-block'>
                          abc
                        </Tag>
                      </div>
                      <div className='mb-4'>
                        <a
                          target='_blank'
                          href='https://example.com/'
                          className='flex gap-2  '
                        >
                          <h2 className='text-neutral-1 '>{product.name}</h2>
                          <ArrowRightOutlined
                            style={{ color: 'white' }}
                            className='text-[17px] self-start pt-2'
                            rotate={-45}
                          />
                        </a>
                      </div>
                      <Link
                        href={`/companies/${company.slug}-${company._id}`}
                        className='flex gap-2'
                      >
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
                  )}
                </div>
              </div>
            </div>
            <div className='flex gap-6 mt-14'>
              {/* Left */}
              <div className='w-full flex flex-col gap-6'>
                <ContentFrame title={`Giới thiệu về ${product.name}`}>
                  <div className='flex flex-col gap-8'>
                    <p>
                      Với thế mạnh về data, {product.name} sẽ gợi ý các sản phẩm
                      mà khách hàng có thể hứng thú dựa vào những sản phẩm mà
                      khách hàng đã mua hoặc đã xem. Việc đề xuất sản phẩm giúp
                      cho khách hàng dễ dàng tìm được sản phẩm mà họ muốn mua.
                    </p>
                    <div>
                      <h5 className='mb-3'>Công nghệ</h5>
                      <div className='flex flex-wrap'>
                        <Tag type='block' className='h-5 text-xs'>
                          tag 1
                        </Tag>
                        <Tag type='block' className='h-5 text-xs'>
                          tag 2
                        </Tag>
                        <Tag type='block' className='h-5 text-xs'>
                          tag 3
                        </Tag>
                        <Tag type='block' className='h-5 text-xs'>
                          tag 4
                        </Tag>
                      </div>
                    </div>
                  </div>
                </ContentFrame>
                {/* Gallery */}
                <Gallery gallery={gallery} isLoading={isLoading} />
                <ContentFrame title='Video'>
                  <div className='bg-royalBlue w-full h-64 text-neutral-1 flexCenter rounded-2xl'>
                    video
                  </div>
                </ContentFrame>
              </div>
              {/* Right */}
              <div className='hidden lg:flex w-[320px] shrink-0  flex-col gap-6'>
                {/* Company's other products */}
                <div className='bg-neutral-1 w-full px-8 py-12 rounded-2xl'>
                  <div className='text-base pb-2 border-b border-neutral-5'>
                    <p className='text-neutral-11'>
                      Sản phẩm khác của{' '}
                      <Link
                        href={`/companies/${company.slug + '-' + company._id}`}
                        className='text-royalBlue font-semibold'
                      >
                        {company.name}
                      </Link>
                    </p>
                  </div>
                  <div className='flex flex-col'>
                    {otherProducts?.map(
                      (product: any, index: number) =>
                        product.id !== productId && (
                          <ProductCard key={index} product={product} />
                        )
                    )}
                  </div>
                </div>
                {/* Related products */}
                {relatedProducts && (
                  <div className='bg-neutral-1 w-full px-8 py-12 rounded-2xl'>
                    <h5 className='pb-2 border-b border-neutral-5'>
                      Sản phẩm tương tự
                    </h5>
                    <div className='flex flex-col'>
                      {relatedProducts.map(
                        (product: any, index: number) =>
                          product.id !== productId && (
                            <ProductCard key={index} product={product} />
                          )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
