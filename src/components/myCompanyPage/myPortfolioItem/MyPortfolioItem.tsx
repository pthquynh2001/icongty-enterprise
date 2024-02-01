import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import * as portfolioServices from '@/apiServices/portfolioServices';
import Image from 'next/image';
import TabToggle from '../TabToggle';
import SortBy from '@/components/shared/SortBy';
import SearchBar from '@/components/shared/SearchBar';
import ItemTitle from '../ItemTitle';
import { Button, ConfigProvider, Empty } from 'antd';
import {
  EyeFilled,
  UserOutlined,
  PlusOutlined,
  ClockCircleFilled,
} from '@ant-design/icons';
import EditingPortfolio from './EditingPortfolio';
import { PdfViewer } from '@/components/companyPage';

const tabs = [
  {
    id: 'active',
    name: 'Active',
    icon: { location: '/icons/paper-plane.svg', id: 'published' },
  },
  {
    id: 'inactive',
    name: 'Inactive',
    icon: { location: '/icons/pending.svg', id: 'pending' },
  },
  {
    id: 'draft',
    name: 'Draft',
    icon: { location: '/icons/draft.svg', id: 'draft' },
  },
];

const MyPortfolioItem = ({ companyId }: { companyId: string }) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [editingPortfolio, setEditingPortfolio] = useState('');
  const [editing, setEditing] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const searchParam = useSearchParams().get('portfolio');

  // fetch api
  useEffect(() => {
    const fetchData = async () => {
      const res = await portfolioServices.getAll();
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, [companyId]);

  const handleEditPortfolio = (portfolioId: string) => {
    setEditingPortfolio(portfolioId);
    router.push(`${path}?page=portfolio&portfolio=${portfolioId}`);
  };

  useEffect(() => {
    if (searchParam) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  }, [searchParam]);

  return !editing ? (
    <div className=''>
      <ItemTitle
        title='Portfolio'
        subtitle='This is the place to add portfolio to your company.'
      />
      <div className='flexBetween mb-8'>
        <div className='flexStart gap-6'>
          <SearchBar placeholder='Search your portfolio' />
          <TabToggle tabs={tabs} />
        </div>
        <SortBy />
      </div>
      {!loading &&
        (data?.length > 0 ? (
          <>
            <div className='h-[600px] overflow-y-scroll pr-2 mb-6'>
              {data.map((portfolio: any, index: number) => (
                <div
                  className='bg-neutral-1 rounded-2xl flex justify-between px-12 py-6 mb-6 '
                  key={index}
                >
                  <div className='left flex gap-6'>
                    <PdfViewer
                      downloadUrl={portfolio.downloadUrl}
                      thumbnailUrl={portfolio.thumbnailUrl}
                    />

                    <div className='w-full max-w-[500px]'>
                      <h5 className='mb-2 truncate'>{portfolio.name}</h5>
                      <p className='mb-4 line-clamp-2'>{portfolio.excerpt}</p>
                      <div className='flex justify-between'>
                        <div className='flexStart gap-8'>
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
                            <UserOutlined className='text-base !text-sunsetOrange-6' />
                            <span>Ha Nguyen Phuong</span>
                          </div>
                        </div>
                        <div className='flexStart gap-2'>
                          <ClockCircleFilled className='text-base !text-sunsetOrange-6' />
                          <span>2023-03-09 14:40:41</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='right w-[200px] ml-6 shrink-0'>
                    <div className='w-full'>
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
                          onClick={() => handleEditPortfolio(portfolio.id)}
                        >
                          <div className='flexCenter gap-2 font-semibold'>
                            <Image
                              src='/icons/edit.svg'
                              width={14}
                              height={14}
                              alt='icon'
                            />
                            Edit Portfolio
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
                  Add a Portfolio for your company
                </p>
                <Button
                  type='primary'
                  size='large'
                  onClick={() => handleEditPortfolio('new')}
                >
                  <p className='font-semibold px-4'>Add a Portfolio</p>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className='rounded-2xl bg-neutral-1 flexCenter py-12 px-6'>
            <div className='flexCenter flex-col'>
              <Empty description={false} />
              <p className='text-base text-neutral-8 mt-2 mb-4'>
                No portfolios have been updated, update now!
              </p>
              <Button
                type='primary'
                size='large'
                onClick={() => handleEditPortfolio('new')}
              >
                <span className='font-semibold px-4'>Add a Portfolio</span>
              </Button>
            </div>
          </div>
        ))}
    </div>
  ) : (
    <div>
      <ItemTitle
        title={
          editingPortfolio === 'new' ? 'Add a Portfolio' : 'Edit a Portfolio'
        }
        subtitle={
          editingPortfolio === 'new'
            ? 'This is the place to add a portfolio to your company.'
            : "This is the place to edit your company's portfolio."
        }
        backLink={`${path}?page=portfolio`}
        onClick={() => setEditingPortfolio('')}
      />
      <EditingPortfolio portfolioId={editingPortfolio} />
    </div>
  );
};

export default MyPortfolioItem;
