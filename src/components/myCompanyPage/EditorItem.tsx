import { useState, useEffect } from 'react';
import { Button, ConfigProvider, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { Company } from '@/types';
import ItemTitle from './ItemTitle';
import { ContentFrame } from '../subpage';
import * as companyServices from '@/apiServices/companyServices';

const EditorItem = ({ companyId }: { companyId: string }) => {
  const [company, setCompany] = useState<Company>({} as Company);
  //   START: fetch data
  useEffect(() => {
    const fetchData = async () => {
      const res = await companyServices.getAll({
        params: { _id: companyId },
      });
      setCompany(res[0]);
    };
    fetchData();
  }, [companyId]);
  //   END: fetch data

  return (
    <div>
      <ItemTitle
        title='Editor'
        subtitle='This is the place to add editors to your company. Add editors to help improve your campaign content.'
      />
      <div className=''>
        <ContentFrame title='Basic Information'>
          <div className='border-b border-neutral-4 pb-10 mb-8'>
            <p className='text-neutral-6 font-semibold uppercase mb-4'>
              EDITOR INFO
            </p>
            <>
              <div className='flex flex-col gap-2 mb-2'>
                <label
                  htmlFor='editorEmail'
                  className='text-neutral-10 text-base font-semibold'
                >
                  Add an Editor
                </label>
                <div className='grid grid-cols-4 gap-6'>
                  <input
                    type='text'
                    id='editorEmail'
                    placeholder='Select Editor’s Email/ID number'
                    className='h-12 p-3 border border-neutral-6 outline-none placeholder:text-neutral-6 rounded hover:border-royalBlue col-span-2'
                  />
                  <div className='w-full'>
                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            fontWeight: 600,
                          },
                        },
                        token: {
                          controlHeight: 48,
                          colorBorder: '#BFBFBF',
                        },
                      }}
                    >
                      <Select
                        placeholder='Choose position'
                        className='w-full'
                        options={[
                          { value: 'position1', label: 'Position 1' },
                          { value: 'position2', label: 'Position 2' },
                          { value: 'position3', label: 'Position 3' },
                          { value: 'position4', label: 'Position 4' },
                        ]}
                      />
                    </ConfigProvider>
                  </div>
                  <div className='w-full'>
                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            fontWeight: 600,
                          },
                        },
                        token: {
                          controlHeight: 48,
                          colorBorder: '#BFBFBF',
                        },
                      }}
                    >
                      <Button block type='primary'>
                        Send Invite
                      </Button>
                    </ConfigProvider>
                  </div>
                </div>
              </div>
              <p className='text-xs text-neutral-7'>
                You can add only 1 owner and 4 editors for your company.
              </p>
            </>
          </div>
          <div className=''>
            <p className='text-neutral-6 font-semibold uppercase mb-4'>
              EDITOR INFO
            </p>
            <table className='table-fixed w-full border-spacing-0 mb-16'>
              <thead className=''>
                <tr className='h-14 bg-royalBlue/[0.1] text-royalBlue text-base font-semibold'>
                  <th className='px-10 w-5/12'>Name</th>
                  <th className='px-4 w-2/12'>Position</th>
                  <th className='px-4 w-3/12'>ID number/Email</th>
                  <th className='px-4 w-2/12'>Manage</th>
                </tr>
              </thead>
              <tbody>
                <tr className='h-14 even:bg-royalBlue/[0.1]'>
                  <td className='px-16 py-3 flexStart gap-2'>
                    <Image
                      src='/images/banner.png'
                      alt='avatar'
                      width={32}
                      height={32}
                      className='rounded-full object-cover'
                    />
                    <span className='font-semibold text-neutral-10'>
                      The Sliding Mr. Bones
                    </span>
                  </td>
                  <td className='text-center py-3 '>Owner</td>
                  <td className='text-center py-3'>1961112412</td>
                  <td className='py-3 text-center'>
                    <div className='flexCenter'>
                      <EditOutlined
                        className='cursor-pointer text-xl !text-royalBlue px-3'
                        title='Edit'
                      />
                      <span className='inline-block h-5 w-[1px] bg-neutral-6 mx-3 '></span>
                      <DeleteOutlined
                        className='cursor-pointer text-xl !text-royalBlue px-3'
                        title='Delete'
                      />
                    </div>
                  </td>
                </tr>
                <tr className='h-14 even:bg-royalBlue/[0.1]'>
                  <td className='px-16 py-3 flexStart gap-2'>
                    <Image
                      src='/images/banner.png'
                      alt='avatar'
                      width={32}
                      height={32}
                      className='rounded-full object-cover'
                    />
                    <span className='font-semibold text-neutral-10'>
                      The Sliding Mr. Bones
                    </span>
                  </td>
                  <td className='text-center py-3 '>Owner</td>
                  <td className='text-center py-3'>1961112412</td>
                  <td className='py-3 text-center'>
                    <div className='flexCenter'>
                      <EditOutlined
                        className='cursor-pointer text-xl !text-royalBlue px-3'
                        title='Edit'
                      />
                      <span className='inline-block h-5 w-[1px] bg-neutral-6 mx-3 '></span>
                      <DeleteOutlined
                        className='cursor-pointer text-xl !text-royalBlue px-3'
                        title='Delete'
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='flexEnd gap-2 mb-8'>
            <Image
              src='/icons/verified.svg'
              alt='icon'
              width={16}
              height={16}
            />
            <div className=' text-xs font-semibold text-polarGreen-7'>
              Auto-saved at 2023/04/19 16:02:15
            </div>
          </div>
          <div className='grid gap-6 grid-cols-3'>
            <div className='col-start-3 flex gap-6'>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      fontWeight: 600,
                    },
                  },
                }}
              >
                <Button type='primary' ghost size='large' block>
                  Cancel
                </Button>
                <Button type='primary' size='large' block>
                  Save
                </Button>
              </ConfigProvider>
            </div>
          </div>
        </ContentFrame>
      </div>
    </div>
  );
};

export default EditorItem;
