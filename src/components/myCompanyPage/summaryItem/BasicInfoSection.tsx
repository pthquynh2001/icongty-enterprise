import React from 'react';
import Image from 'next/image';
import {
  CalendarOutlined,
  PhoneFilled,
  MailFilled,
  GlobalOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { ContentFrame } from '@/components/subpage';
import { Tag } from '@/components/shared';
import { Button, ConfigProvider, DatePicker, Select, Tag as ATag } from 'antd';
import type { SelectProps } from 'antd';

type TagRender = SelectProps['tagRender'];

const cateOptions: SelectProps['options'] = [
  { value: 'cat1', label: 'Category 1' },
  { value: 'cat2', label: 'Category 2' },
  { value: 'cat3', label: 'Category 3' },
  { value: 'cat4', label: 'Category 4' },
  { value: 'cat5', label: 'Category 5' },
];

const catTagRender: TagRender = (props) => {
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

const IdentitySection = () => {
  return (
    <ContentFrame title='Basic Information'>
      <form className=''>
        <div className='border-b border-neutral-4 pb-10 mb-8'>
          <p className='text-neutral-6 font-semibold uppercase mb-4'>
            Corporate Info
          </p>
          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='corpName'
                className='text-neutral-10 text-base font-semibold'
              >
                Corporate Name
              </label>
              <input
                type='text'
                id='corpName'
                placeholder='Fill Your Corporate Name'
                className='h-12 p-3 border border-neutral-6 outline-none placeholder:text-neutral-6 rounded hover:border-royalBlue'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='corpInterName'
                className='text-neutral-10 text-base font-semibold'
              >
                International Name
              </label>
              <input
                type='text'
                id='corpInterName'
                placeholder='Fill Your International Name'
                className='h-12 p-3 border border-neutral-6 outline-none placeholder:text-neutral-6 rounded hover:border-royalBlue'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='taxCode'
                className='text-neutral-10 text-base font-semibold'
              >
                Tax Code
              </label>
              <input
                type='text'
                id='taxCode'
                placeholder='Fill Your Tax Code'
                className='h-12 p-3 border border-neutral-6 outline-none placeholder:text-neutral-6 rounded hover:border-royalBlue'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='status'
                className='text-neutral-10 text-base font-semibold'
              >
                Business Status
              </label>
              <input
                type='text'
                id='status'
                placeholder='Fill Your Business Status'
                className='h-12 p-3 border border-neutral-6 outline-none placeholder:text-neutral-6 rounded hover:border-royalBlue'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='representative'
                className='text-neutral-10 text-base font-semibold'
              >
                Representative
              </label>
              <input
                type='text'
                id='representative'
                placeholder='Fill Your Representative'
                className='h-12 p-3 border border-neutral-6 outline-none placeholder:text-neutral-6 rounded hover:border-royalBlue'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='foundationDate'
                className='text-neutral-10 text-base font-semibold'
              >
                Foundation Date
              </label>
              <div className='relative'>
                <ConfigProvider
                  theme={{
                    components: {
                      DatePicker: {
                        cellWidth: 40,
                        cellHeight: 30,
                      },
                    },
                    token: {
                      controlHeight: 48,
                      colorBorder: '#BFBFBF',
                    },
                  }}
                >
                  <DatePicker
                    style={{
                      paddingLeft: '40px',
                      position: 'relative',
                      width: '100%',
                    }}
                    format='YYYY-MM-DD'
                    id='foundationDate'
                    showToday={false}
                    suffixIcon={null}
                  />
                </ConfigProvider>
                <CalendarOutlined className='absolute left-3 top-1/2 -translate-y-1/2 text-base' />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='companySize'
                className='text-neutral-10 text-base font-semibold'
              >
                Company Size
              </label>
              <input
                type='text'
                id='companySize'
                placeholder='Fill Your Company Size'
                className='h-12 p-3 border border-neutral-6 outline-none placeholder:text-neutral-6 rounded hover:border-royalBlue'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='corpType'
                className='text-neutral-10 text-base font-semibold'
              >
                Corporate Type
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
                  id='corpType'
                  placeholder='Select Corporate Type'
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
            </div>
          </div>
        </div>
        <div className='border-b border-neutral-4 pb-10 mb-8'>
          <p className='text-neutral-6 font-semibold uppercase mb-4'>contact</p>
          <div className='grid grid-cols-3 gap-6'>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='country'
                className='text-neutral-10 text-base font-semibold'
              >
                Country
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
                  id='country'
                  placeholder='Select country'
                  options={[
                    { value: 'country1', label: 'Country 1' },
                    { value: 'country2', label: 'Country 2' },
                    { value: 'country3', label: 'Country 3' },
                    { value: 'country4', label: 'Country 4' },
                  ]}
                />
              </ConfigProvider>
            </div>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='city'
                className='text-neutral-10 text-base font-semibold'
              >
                City
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
                  id='city'
                  placeholder='Select City'
                  options={[
                    { value: 'city1', label: 'City 1' },
                    { value: 'city2', label: 'City 2' },
                    { value: 'city3', label: 'City 3' },
                    { value: 'city4', label: 'City 4' },
                  ]}
                />
              </ConfigProvider>
            </div>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='address'
                className='text-neutral-10 text-base font-semibold'
              >
                Address
              </label>
              <input
                type='text'
                id='address'
                placeholder='Fill Address'
                className='h-12 p-3 border border-neutral-6 outline-none placeholder:text-neutral-6 rounded hover:border-royalBlue'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='phone'
                className='text-neutral-10 text-base font-semibold'
              >
                Phone
              </label>
              <div className='w-full relative'>
                <input
                  type='text'
                  id='phone'
                  placeholder='Fill Your Phone Number'
                  className='w-full h-12 py-3 pr-3 pl-10 border border-neutral-6 outline-none placeholder:text-neutral-6 rounded hover:border-royalBlue'
                />
                <PhoneFilled className='absolute left-3 top-1/2 -translate-y-1/2 text-base' />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='email'
                className='text-neutral-10 text-base font-semibold'
              >
                Email
              </label>
              <div className='relative'>
                <input
                  type='text'
                  id='email'
                  placeholder='Fill Your Email'
                  className='w-full h-12 py-3 pr-3 pl-10 border border-neutral-6 outline-none placeholder:text-neutral-6 rounded hover:border-royalBlue'
                />
                <MailFilled className='absolute left-3 top-1/2 -translate-y-1/2 text-base' />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='website'
                className='text-neutral-10 text-base font-semibold'
              >
                Website
              </label>
              <div className='relative'>
                <input
                  type='text'
                  id='website'
                  placeholder='Fill Your Website'
                  className='w-full h-12 py-3 pr-3 pl-10 border border-neutral-6 outline-none placeholder:text-neutral-6 rounded hover:border-royalBlue'
                />
                <GlobalOutlined className='absolute left-3 top-1/2 -translate-y-1/2 text-base' />
              </div>
            </div>
          </div>
        </div>
        <div className='border-b border-neutral-4 pb-10 mb-8'>
          <p className='text-neutral-6 font-semibold uppercase mb-4'>
            Classification
          </p>
          <div className='grid grid-cols-3 gap-6'>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='keywords'
                className='text-neutral-10 text-base font-semibold'
              >
                Keywords{' '}
                <span className='text-xs font-normal'>
                  (separate with comma)
                </span>
              </label>
              <input
                type='text'
                id='keywords'
                placeholder='Eg: Banking,Investment'
                className='h-12 p-3 border border-neutral-6 outline-none placeholder:text-neutral-6 rounded hover:border-royalBlue'
              />
            </div>
            <div className='flex flex-col gap-2 col-span-2'>
              <label
                htmlFor='categories'
                className='text-neutral-10 text-base font-semibold'
              >
                Categories
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
                  id='categories'
                  mode='multiple'
                  allowClear
                  placeholder={
                    <p className='text-[#cbcbcb] pl-[10px]'>
                      Select categories
                    </p>
                  }
                  options={cateOptions}
                  tagRender={catTagRender}
                />
              </ConfigProvider>
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
                    <p className='text-[#cbcbcb] pl-[10px]'>Select languages</p>
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
                Last Updated at 2023/04/19 16:02:15
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
                Publish
              </Button>
            </ConfigProvider>
          </div>
        </div>
      </form>
    </ContentFrame>
  );
};

export default IdentitySection;
