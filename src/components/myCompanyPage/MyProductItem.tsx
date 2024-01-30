import { useState, useEffect } from 'react';
import Image from 'next/image';
import * as productsServices from '@/apiServices/productServices';
import ItemTitle from './ItemTitle';
import {
  SearchOutlined,
  EyeFilled,
  UserOutlined,
  PlusOutlined,
  ClockCircleFilled,
} from '@ant-design/icons';
import { Button, ConfigProvider, Select } from 'antd';
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
  const [activeTab, setActiveTab] = useState(tabs[0].id || 'published');
  const [data, setData] = useState<any>([]);
  //   START: fetch data

  useEffect(() => {
    const fetchData = async () => {
      const res = await productsServices.getAll({
        params: { companyId: companyId },
      });
      setData(res);
    };
    fetchData();
  }, [companyId]);

  //   END: fetch data

  return (
    <div>
      <ItemTitle
        title='Product'
        subtitle='This is the place to add products to your company.'
      />
      <div className='flexBetween mb-8'>
        <div className='flex gap-7'>
          <div className='flex h-10'>
            <div className='flexCenter bg-royalBlue w-12 h-full rounded-s'>
              <SearchOutlined style={{ color: 'white' }} />
            </div>
            <input
              className='w-[400px] rounded-e outline-none px-6 py-2 placeholder:text-neutral-6 h-full'
              placeholder='Search your product'
            />
          </div>
          <div className='bg-neutral-3 rounded-lg flexBetween p-1 relative h-11'>
            {tabs.map((tab, index) => (
              <div
                className={`group rounded-md flexCenter gap-[6px] py-[7px] px-3 cursor-pointer z-10 grow transition-all duration-300  ${
                  activeTab === tab.id && 'bg-neutral-1 shadow-sm'
                }`}
                key={index}
                onClick={() => setActiveTab(tab.id)}
              >
                <svg
                  width='14'
                  height='14'
                  className={`font-semibold leading-[22px] transition-all duration-300  ${
                    activeTab === tab.id
                      ? 'text-royalBlue'
                      : 'text-sunsetOrange-6'
                  }`}
                >
                  <use xlinkHref={`${tab.icon.location}#${tab.icon.id}`} />
                </svg>
                <span
                  className={`font-semibold leading-[22px] transition-all duration-300 group-hover:text-royalBlue ${
                    activeTab === tab.id ? 'text-royalBlue' : 'text-neutral-8'
                  }`}
                >
                  {tab.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className='flexEnd'>
          <p className='text-xs'>Sắp xếp theo:</p>
          <ConfigProvider
            theme={{
              token: {
                colorText: '#2f61e6',
              },
            }}
          >
            <Select
              defaultValue='Từ A-Z'
              style={{ width: 102 }}
              bordered={false}
              options={[
                { value: 'asc', label: 'Từ A-Z' },
                { value: 'desc', label: 'Từ Z-A' },
              ]}
            />
          </ConfigProvider>
        </div>
      </div>
      <div className='h-[600px] overflow-y-scroll pr-2 mb-6'>
        {data.map((product: any, index: number) => (
          <div
            className='bg-neutral-1 rounded-2xl flex px-12 py-6 mb-6'
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

              <div className='grow max-w-[430px]'>
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
                    <span>1000 views</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='right w-full ml-6'>
              <div className='float-right max-w-[200px]'>
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
                  <Button type='primary' size='large' block>
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
                      Delete{' '}
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
          <Button type='primary' size='large'>
            <p className='font-semibold px-4'>Add a Product</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyProductItem;
