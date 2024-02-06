import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import * as productsServices from '@/apiServices/productServices';
import ItemTitle from '../ItemTitle';
import {
  SearchOutlined,
  EyeFilled,
  UserOutlined,
  PlusOutlined,
  ClockCircleFilled,
} from '@ant-design/icons';
import { Button, ConfigProvider, Empty } from 'antd';
import EditingProduct from './EditingProduct';
import SearchBar from '@/components/shared/SearchBar';
import TabToggle from '../TabToggle';
import SortBy from '@/components/shared/SortBy';
const tabs = [
  {
    id: 'published',
    name: 'Published',
    icon: { location: '/icons/paper-plane.svg', id: 'published' },
  },
  {
    id: 'pending',
    name: 'Pending',
    icon: { location: '/icons/pending.svg', id: 'pending' },
  },
  {
    id: 'draft',
    name: 'Draft',
    icon: { location: '/icons/draft.svg', id: 'draft' },
  },
];
const MyProductItem = ({ companyId }: { companyId: string }) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState('');
  const [editing, setEditing] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const searchParam = useSearchParams().get('product');

  //   START: fetch data
  useEffect(() => {
    const fetchData = async () => {
      const res = await productsServices.getAll({
        params: { companyId: companyId },
      });
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, [companyId]);
  //   END: fetch data

  const handleEditProduct = (productId: string) => {
    setEditingProduct(productId);
    router.push(`${path}?page=product&product=${productId}`);
  };

  useEffect(() => {
    if (searchParam) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  }, [searchParam]);

  return !editing ? (
    <div>
      <ItemTitle
        title='Product'
        subtitle='This is the place to add products to your company.'
      />
      <div className='flexBetween mb-8'>
        <div className='flexStart gap-6'>
          <SearchBar placeholder='Search your product' />
          <TabToggle tabs={tabs} />
        </div>
        <SortBy />
      </div>
      {!loading &&
        (data?.length > 0 ? (
          <>
            <div className='h-[600px] overflow-y-scroll pr-2 mb-6'>
              {data.map((product: any, index: number) => (
                <div
                  className='bg-neutral-1 rounded-2xl flex justify-between px-12 py-6 mb-6'
                  key={index}
                >
                  <div className='left flex gap-6'>
                    <div className='shrink-0 w-[135px] h-[135px] relative'>
                      <Image
                        src={product.coverPhoto.location}
                        alt='product img'
                        fill
                        className='object-cover rounded'
                        sizes='(max-width: 767px) 100vw, 430px'
                      />
                    </div>

                    <div className='w-full max-w-[430px]'>
                      <h5 className='mb-2 truncate'>{product.name}</h5>
                      <p className='mb-4 truncate'>{product.excerpt}</p>
                      <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
                        <div className='flexStart gap-2'>
                          <EyeFilled className='text-base !text-sunsetOrange-6' />
                          <span>1000 views</span>
                        </div>
                        <div className='flexStart gap-2'>
                          <UserOutlined className='text-base !text-sunsetOrange-6' />
                          <span>Ha Nguyen Phuong</span>
                        </div>
                        <div className='flexStart gap-2'>
                          <Image
                            src='/icons/flag-vi.svg'
                            alt='icon'
                            width={16}
                            height={16}
                          />
                          <span>VI</span>
                        </div>
                        <div className='flexStart gap-2'>
                          <ClockCircleFilled className='text-base !text-sunsetOrange-6' />
                          <span>2023-03-09 14:40:41</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='right w-[200px]  ml-6'>
                    <div className=' w-full'>
                      <ConfigProvider
                        theme={{
                          components: {
                            Button: {
                              fontWeight: 600,
                              colorLink: '#2f61e6',
                            },
                          },
                        }}
                      >
                        <Button
                          type='primary'
                          size='large'
                          block
                          onClick={() => handleEditProduct(product.id)}
                        >
                          <div className='flexCenter gap-2 font-semibold'>
                            <Image
                              src='/icons/edit.svg'
                              width={14}
                              height={14}
                              alt='icon'
                            />
                            Edit Product
                          </div>
                        </Button>
                        <Button type='link' size='large' block className='mt-3'>
                          <div className='flexCenter gap-2 font-semibold'>
                            Delete
                          </div>
                        </Button>
                      </ConfigProvider>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='h-[182px] bg-neutral-1 rounded-2xl  card-dashed-border flexCenter'>
              <div className='flexCenter flex-col'>
                <PlusOutlined
                  className=' text-[22px] p-1 cursor-pointer'
                  style={{ color: '#2f61e6' }}
                />
                <p className='text-base text-neutral-8 mt-2 mb-4'>
                  Add a Product for your company
                </p>
                <Button
                  type='primary'
                  size='large'
                  onClick={() => handleEditProduct('new')}
                >
                  <p className='font-semibold px-4'>Add a Product</p>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className='rounded-2xl bg-neutral-1 flexCenter py-12 px-6'>
            <div className='flexCenter flex-col'>
              <Empty description={false} />
              <p className='text-base text-neutral-8 mt-2 mb-4'>
                No products have been updated, update now!
              </p>
              <Button
                type='primary'
                size='large'
                onClick={() => handleEditProduct('new')}
              >
                <span className='font-semibold px-4'>Add a Product</span>
              </Button>
            </div>
          </div>
        ))}
    </div>
  ) : (
    <div>
      <ItemTitle
        title={editingProduct === 'new' ? 'Add a Product' : 'Edit a Product'}
        subtitle={
          editingProduct === 'new'
            ? 'This is the place to add a product to your company.'
            : "This is the place to edit your company's product."
        }
        backLink={`${path}?page=product`}
        onClick={() => setEditingProduct('')}
      />
      <EditingProduct productId={editingProduct} />
    </div>
  );
};

export default MyProductItem;
