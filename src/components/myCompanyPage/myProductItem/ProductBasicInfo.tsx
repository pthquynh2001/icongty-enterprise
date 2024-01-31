import React, { useState } from 'react';
import Image from 'next/image';
import { CloseOutlined } from '@ant-design/icons';
import { ContentFrame } from '@/components/subpage';
import {
  Button,
  ConfigProvider,
  Select,
  Tag as ATag,
  Image as AntdImg,
  Radio,
} from 'antd';
import type { SelectProps, RadioChangeEvent } from 'antd';

type TagRender = SelectProps['tagRender'];

const techOptions: SelectProps['options'] = [
  { value: 'tech1', label: 'Technology 1' },
  { value: 'tech2', label: 'Technology 2' },
  { value: 'tech3', label: 'Technology 3' },
  { value: 'tech4', label: 'Technology 4' },
  { value: 'tech5', label: 'Technology 5' },
];

const techTagRender: TagRender = (props) => {
  const { label, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <ATag
      color={'rgba(47, 97, 230, 0.10)'}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      closeIcon={<CloseOutlined style={{ color: '#2f61e6' }} />}
      style={{
        marginLeft: 4,
        color: '#2f61e6',
        display: 'flex',
        gap: 4,
        alignItems: 'center',
      }}
    >
      {label}
    </ATag>
  );
};

const langOptions: SelectProps['options'] = [
  { value: 'en', label: 'English', icon: '/icons/flag-en.svg' },
  { value: 'vi', label: 'Vietnamese', icon: '/icons/flag-vi.svg' },
];

const langTagRender: TagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <ATag
      color={'rgba(47, 97, 230, 0.10)'}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      closeIcon={<CloseOutlined style={{ color: '#2f61e6' }} />}
      style={{
        marginLeft: 4,
        color: '#2f61e6',
        display: 'flex',
        gap: 4,
        alignItems: 'center',
      }}
    >
      <Image
        src={`/icons/flag-${value}.svg`}
        alt='icon'
        width={20}
        height={20}
      />
      {label}
    </ATag>
  );
};

const ProductBasicInfo = () => {
  const [statusValue, setStatusValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setStatusValue(e.target.value);
  };

  return (
    <div>
      <ContentFrame title='Basic Information'>
        <form className=''>
          <div className='border-b border-neutral-4 pb-10 mb-8'>
            <p className='text-neutral-6 font-semibold uppercase mb-4'>
              PRODUCT Info
            </p>
            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='productName'
                  className='text-neutral-10 text-base font-semibold'
                >
                  Product Name
                </label>
                <input
                  type='text'
                  id='productName'
                  placeholder='Fill Your Product Name'
                  className='h-12 p-3 border border-neutral-6 outline-none placeholder:text-neutral-6 rounded hover:border-royalBlue'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='productType'
                  className='text-neutral-10 text-base font-semibold'
                >
                  Product Type
                </label>
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
                    id='productType'
                    placeholder='Select Product Type'
                    options={[
                      { value: 'type1', label: 'Type 1' },
                      { value: 'type2', label: 'Type 2' },
                      { value: 'type3', label: 'Type 3' },
                      { value: 'type4', label: 'Type 4' },
                    ]}
                  />
                </ConfigProvider>
              </div>
              <div className='flex flex-col gap-2 col-span-2'>
                <label
                  htmlFor='technologies'
                  className='text-neutral-10 text-base font-semibold'
                >
                  Technologies
                </label>
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        multipleItemHeight: 42,
                      },
                    },
                    token: {
                      colorBorder: '#bfbfbf',
                    },
                  }}
                >
                  <Select
                    id='technologies'
                    mode='multiple'
                    allowClear
                    placeholder={
                      <p className='text-[#cbcbcb] pl-[10px]'>
                        Select technologies
                      </p>
                    }
                    options={techOptions}
                    tagRender={techTagRender}
                  />
                </ConfigProvider>
              </div>
              <div className='flex flex-col gap-2 col-span-2'>
                <label
                  htmlFor='excerpt'
                  className='text-neutral-10 text-base font-semibold'
                >
                  Excerpt
                </label>
                <textarea
                  id='excerpt'
                  placeholder='Excerpt...'
                  className='p-3 border border-neutral-6 outline-none placeholder:text-neutral-6 rounded hover:border-royalBlue resize-y h-24'
                />
                <div className='flexEnd text-neutral-7'>0/400</div>
              </div>
            </div>
          </div>

          <div className='border-b border-neutral-4 pb-10 mb-8'>
            <p className='text-neutral-6 font-semibold uppercase mb-4'>
              Description
            </p>
            <div className='flex flex-col gap-2 col-span-2'>
              <textarea
                placeholder='Description...'
                className='p-3 border border-neutral-6 outline-none placeholder:text-neutral-6 rounded hover:border-royalBlue resize-y h-24'
              />
            </div>
          </div>
          <div className='border-b border-neutral-4 pb-10 mb-8'>
            <p className='text-neutral-6 font-semibold uppercase mb-4'>
              GALLERY
            </p>
            <div className='py-8 rounded border border-neutral-6'>
              <div className='border-b border-neutral-6 px-8'>
                <AntdImg.PreviewGroup
                  preview={{
                    onChange: (current, prev) =>
                      console.log(
                        `current index: ${current}, prev index: ${prev}`
                      ),
                    toolbarRender: () => <></>,
                  }}
                >
                  <div className='grid grid-cols-4 gap-5  h-[260px] overflow-y-scroll pr-2 -mr-4'>
                    {[...Array(10)].map((_, index) => (
                      <div
                        className='relative w-full h-32 bg-neutral-2 overflow-hidden'
                        key={index}
                      >
                        <AntdImg
                          src='/images/banner.png'
                          alt='placeholder'
                          width={'100%'}
                          height={'100%'}
                          className='object-cover'
                        />
                      </div>
                    ))}
                  </div>
                </AntdImg.PreviewGroup>
              </div>
              <div className=' px-8 pt-8 grid grid-cols-4 gap-5'>
                <Button className='col-start-4' type='primary' size='large'>
                  <span className='font-semibold'>Add to Gallery</span>
                </Button>
              </div>
            </div>
          </div>
          <div className='border-b border-neutral-4 pb-10 mb-8'>
            <p className='text-neutral-6 font-semibold uppercase mb-4'>video</p>
            <div className='py-8 rounded border border-neutral-6'>
              <div className='border-b border-neutral-6 px-8'>
                <AntdImg.PreviewGroup
                  preview={{
                    onChange: (current, prev) =>
                      console.log(
                        `current index: ${current}, prev index: ${prev}`
                      ),
                    toolbarRender: () => <></>,
                  }}
                >
                  <div className='grid grid-cols-4 gap-5  h-[260px] overflow-y-scroll pr-2 -mr-4'>
                    {[...Array(10)].map((_, index) => (
                      <div
                        className='relative w-full h-32 bg-neutral-2 overflow-hidden'
                        key={index}
                      >
                        <AntdImg
                          src='/images/banner.png'
                          alt='placeholder'
                          width={'100%'}
                          height={'100%'}
                          className='object-cover'
                        />
                      </div>
                    ))}
                  </div>
                </AntdImg.PreviewGroup>
              </div>
              <div className=' px-8 pt-8 grid grid-cols-4 gap-5'>
                <Button className='col-start-4' type='primary' size='large'>
                  <span className='font-semibold'>Add to Videos</span>
                </Button>
              </div>
            </div>
          </div>
          <div className='mb-8 pb-10'>
            <div className='flex gap-20'>
              <label
                htmlFor='status'
                className='text-neutral-10 text-base font-semibold'
              >
                Choose a status
              </label>
              <Radio.Group
                onChange={onChange}
                value={statusValue}
                id='status'
                className='flexStart gap-20'
              >
                <Radio value={1}>Active</Radio>
                <Radio value={2}>Inactive</Radio>
                <Radio value={3}>Draft</Radio>
              </Radio.Group>
            </div>
          </div>
          <div className='mb-8'>
            <div className=' grid grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='languages'
                  className='text-neutral-10 text-base font-semibold'
                >
                  Languages
                </label>
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        multipleItemHeight: 42,
                      },
                    },
                    token: {
                      colorBorder: '#bfbfbf',
                    },
                  }}
                >
                  <Select
                    mode='multiple'
                    style={{ width: '100%' }}
                    id='languages'
                    allowClear
                    placeholder={
                      <p className='text-[#cbcbcb] pl-[10px]'>
                        Select languages
                      </p>
                    }
                    options={langOptions}
                    tagRender={langTagRender}
                    optionRender={(option) => {
                      return (
                        <div className='flexStart gap-2'>
                          <Image
                            src={option.data.icon}
                            alt={option.data.label}
                            width={20}
                            height={20}
                          />
                          {option.data.label}
                        </div>
                      );
                    }}
                  />
                </ConfigProvider>
              </div>
              <div className='flexEnd  gap-2 '>
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
        </form>
      </ContentFrame>
    </div>
  );
};

export default ProductBasicInfo;
