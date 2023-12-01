'use client';
import React from 'react';
import Image from 'next/image';
import { AudioOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import { Space, Select, ConfigProvider, Button } from 'antd';
import Search from 'antd/lib/input/Search';
import type { SearchProps } from 'antd/lib/input/Search';
import { HOME_SEARCH_SELECT } from '@/constants';

// START: search bar setting
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#2f61e6',
      opacity: 0.6,
    }}
  />
);

const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
  console.log(info?.source, value);
// END: search bar setting

// START Select menu setting
const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

// END: Select menu setting

const HomeSearch: React.FC = () => (
  <div className=' padding-container w-full h-full m-auto flexCenter flex-col absolute md:max-w-[684px]'>
    <h1 className='font-semibold text-[38px] lg:text-[56px] text-white mb-12'>
      Tìm công ty đối tác
    </h1>
    <div className='w-full'>
      <ConfigProvider
        theme={{
          token: {
            colorBgElevated: '#2f61e6',
          },
          components: {
            Button: {
              defaultBg: '#2f61e6',
            },
          },
        }}
      >
        <Search
          placeholder='Nhập tên công ty, mã số thuế, ngành nghề...'
          enterButton={true}
          allowClear
          size='large'
          suffix={suffix}
          onSearch={onSearch}
          className=' h-[38px] md:h-[40px]'
        />
      </ConfigProvider>
    </div>
    <div className='flexBetween w-full  mt-6 mb-4'>
      <div className='flexStart gap-2'>
        <Image src='/images/dots.svg' width={16} height={16} alt='dots' />
        <p className='font-semibold text-white'>Tìm kiếm nâng cao:</p>
      </div>
      <div className='flexBetween md:hidden'>
        <ConfigProvider
          theme={{
            token: {
              controlHeight: 28,
            },
            components: {
              Button: {
                paddingInline: 8,
                contentFontSize: 12,
              },
            },
          }}
        >
          <Button
            type='primary'
            className='flexBetween'
            icon={
              <Image
                src='/images/collapse.svg'
                alt='collapse'
                width={16}
                height={16}
                // className='leading-[22px]'
              />
            }
          >
            Thu gọn
          </Button>
        </ConfigProvider>
      </div>
    </div>
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionActiveBg: '#E6F7FF',
          },
        },
      }}
    >
      <div className=' w-full grid grid-cols-2 grid-flow-row gap-2 md:grid-cols-3 md:grid-flow-row md:gap-6'>
        {HOME_SEARCH_SELECT.map((menu, index) => (
          <Select
            key={index}
            className='w-full h-[38px]'
            defaultValue={menu.title}
            onChange={handleChange}
            options={menu.options}
          />
        ))}
      </div>
    </ConfigProvider>
  </div>
);

export default HomeSearch;
