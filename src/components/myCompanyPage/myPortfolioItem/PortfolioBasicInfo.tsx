import React, { useState } from 'react';
import Image from 'next/image';
import {
  CloseOutlined,
  PictureOutlined,
  UploadOutlined,
} from '@ant-design/icons';
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

const PortfolioBasicInfo = ({ portfolioId }: { portfolioId: string }) => {
  const [attachmentValue, setAttachmentValue] = useState(1);
  const [statusValue, setStatusValue] = useState(1);

  const onAttachmentChange = (e: RadioChangeEvent) => {
    setAttachmentValue(e.target.value);
  };
  const onStatusChange = (e: RadioChangeEvent) => {
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
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='portfolioName'
                  className='text-neutral-10 text-base font-semibold'
                >
                  Portfolio Name
                </label>
                <input
                  type='text'
                  id='portfolioName'
                  placeholder='Fill Your Portfolio Name'
                  className='h-12 p-3 border border-neutral-6 outline-none placeholder:text-neutral-6 rounded hover:border-royalBlue'
                />
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
              Picture
            </p>
            <div className='border border-neutral-6 rounded px-10 py-24'>
              <div className='flexCenter flex-col gap-6'>
                <PictureOutlined className='text-[48px] !text-royalBlue' />
                <p className='text-base'>
                  You only can upload JPG,PNG file. Maximum file size is 5MB.
                </p>
                <Button type='primary' size='large'>
                  <span className='font-semibold px-6'>Update Picture</span>
                </Button>
              </div>
            </div>
          </div>

          <div className='border-b border-neutral-4 pb-10 mb-8'>
            <p className='text-neutral-6 font-semibold uppercase mb-4'>
              attachments
            </p>
            <div className='flex gap-20'>
              <label
                htmlFor='attachment'
                className='text-neutral-10 text-base font-semibold'
              >
                Choose a attachment
              </label>
              <Radio.Group
                onChange={onAttachmentChange}
                value={attachmentValue}
                id='attachment'
                className='flexStart gap-20'
              >
                <Radio value={1}>File (.pdf,.doc,.xxls,...)</Radio>
                <Radio value={2}>Link</Radio>
              </Radio.Group>
            </div>
            {attachmentValue == 1 && (
              <div className='border border-neutral-6 rounded px-10 py-24 mt-8'>
                <div className='flexCenter flex-col gap-6'>
                  <UploadOutlined className='text-[48px] !text-royalBlue' />
                  <p className='text-base'>
                    You only can upload .pdf, .doc, .xxls file. Maximum file
                    size is 20MB.
                  </p>
                  <Button type='primary' size='large'>
                    <span className='font-semibold px-6'>
                      Update Attachment
                    </span>
                  </Button>
                </div>
              </div>
            )}
            {attachmentValue == 2 && (
              <div className='flex flex-col gap-2 mt-8'>
                <label
                  htmlFor='link'
                  className='text-neutral-10 text-base font-semibold'
                >
                  Import a link
                </label>
                <input
                  type='text'
                  id='link'
                  placeholder='Add a link'
                  className='h-12 p-3 border border-neutral-6 outline-none placeholder:text-neutral-6 rounded hover:border-royalBlue'
                />
              </div>
            )}
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
                onChange={onStatusChange}
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
                  {portfolioId == 'new' ? 'Create' : 'Save'}
                </Button>
              </ConfigProvider>
            </div>
          </div>
        </form>
      </ContentFrame>
    </div>
  );
};

export default PortfolioBasicInfo;
