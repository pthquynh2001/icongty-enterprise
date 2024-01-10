'use client';
import { useState, useEffect, use } from 'react';
import SubpageBreadcrumb from '@/components/SubpageBreadcrumb';
import Frame from '@/components/companyPage/Frame';
import Tag from '@/components/Tag/Tag';
import HeaderSearch from '@/components/HeaderSearch';
import * as productsServices from '@/apiServices/productsServices';
import * as companyServices from '@/apiServices/companyServices';
import { LeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }: any) => {
  return (
    <div className='pt-4 pb-6 flex gap-4 border-b border-neutral-4'>
      <div className='w-16 h-16  rounded overflow-hidden shadow-banner shrink-0'>
        <Link
          href={`/products/${
            product.slug + '-' + product.id + '-' + product.companyId
          }`}
          className='block relative w-full h-full'
        >
          <Image
            src={product.logo?.location}
            alt='product logo'
            fill
            sizes='(max-width 768px) 100vw, 33vw'
            className='object-cover'
          />
        </Link>
      </div>
      <div className='w-full'>
        <Link
          href={`/products/${
            product.slug + '-' + product.id + '-' + product.companyId
          }`}
        >
          <p className='text-neutral-10 font-semibold mb-2'>{product.name}</p>
        </Link>
        <div className='flex'>
          <Tag type='line'>tag</Tag>
        </div>
      </div>
    </div>
  );
};

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const [product, setProduct] = useState<any>(null);
  const [otherProducts, setOtherProducts] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<any>([]);
  const companyId = params.slug.split('-').slice(-1)[0];
  const productId = params.slug.split('-').slice(-2)[0];
  console.log(companyId, productId);
  const pagination = { page: currentPage, limit: 10, totalItems: 11 };

  // fetch API product
  useEffect(() => {
    const getProduct = async () => {
      const res = await productsServices.getAll({
        params: { page: 1, limit: 1, id: productId },
      });
      setProduct(res[0]);
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
    const getOtherProducts = async () => {
      const res = await productsServices.getAll({
        params: { companyId: companyId },
      });
      setOtherProducts(res);
    };
    getOtherProducts();
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

  // set breadcrum item
  useEffect(() => {
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
          <SubpageBreadcrumb items={items} />
          <div className='max-container padding-container'>
            <div className='flexStart gap-2 mb-6'>
              <LeftOutlined className='text-base' />
              <h4>Danh mục sản phẩm</h4>
            </div>
            <div className='w-full relative h-[248px] rounded-2xl bg-blue-400 overflow-hidden'>
              <Image
                src={product.coverPhoto?.location}
                alt='cover photo'
                priority
                quality={100}
                fill
                className='object-cover'
                sizes='(max-width: 640px) 100vw, 640px'
              />
              <div className='w-full h-full flexStart gap-6 py-12 px-[62px] relative'>
                <Image
                  src={product.logo?.location}
                  alt='logo'
                  width={152}
                  height={152}
                  className='object-cover  rounded-lg '
                />
                <div className='flex flex-col'>
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
                  <div className='flex gap-2'>
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
                  </div>
                </div>
              </div>
            </div>
            <div className='flex gap-6 mt-14'>
              {/* Left */}
              <div className='w-full flex flex-col gap-6'>
                <Frame title={`Giới thiệu về ${product.name}`}>
                  <div className='flex flex-col gap-8'>
                    <p>
                      Với thế mạnh về data, {product.name} sẽ gợi ý các sản phẩm
                      mà khách hàng có thể hứng thú dựa vào những sản phẩm mà
                      khách hàng đã mua hoặc đã xem. Việc đề xuất sản phẩm giúp
                      cho khách hàng dễ dàng tìm được sản phẩm mà họ muốn mua.
                    </p>
                    <div className=''>
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
                </Frame>
                <Frame title='Hình ảnh'>
                  <div className='grid grid-cols-4 grid-rows-2 gap-6 w-full'>
                    <div className='relative w-full pb-[100%] rounded-lg overflow-hidden'>
                      <Image
                        src={product.logo?.location}
                        fill
                        alt='image'
                        sizes='(max-width 768px) 100vw, 33vw'
                        className='object-cover'
                      />
                    </div>
                  </div>
                </Frame>
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
                <div className='bg-neutral-1 w-full px-8 py-12 rounded-2xl'>
                  <h5 className='pb-2 border-b border-neutral-5'>
                    Sản phẩm tương tự
                  </h5>
                  <div className='flex flex-col'>
                    {relatedProducts.map(
                      (product: any, index: number) =>
                        product.id !== productId &&
                        product.companyId !== companyId && (
                          <ProductCard key={index} product={product} />
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
