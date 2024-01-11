'use client';
import { useState } from 'react';
import Image from 'next/image';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Select, ConfigProvider, Button } from 'antd';
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
  console.log(value);
};

// END: Select menu setting

//
const onSearchActive = (value: string) => {
  console.log(value);
};

//

const HomeSearch: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const onFocus = () => {
    setIsFocused(true);
  };
  const btnCollapse = () => {
    setIsFocused(false);
    console.log(isFocused);
  };

  return (
    <div
      className={`${
        isFocused && 'background--focused'
      } absolute padding-container w-full h-[600px] m-auto flexCenter flex-col md:max-w-[684px]`}
    >
      <h1 className='font-semibold text-[38px] lg:text-[56px] text-white mb-6 md:mb-12'>
        Tìm công ty đối tác
      </h1>
      <div className='w-full hidden md:block'>
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
            size='large'
            suffix={suffix}
            onSearch={onSearch}
            className='h-[40px]'
          />
        </ConfigProvider>
      </div>
      <div className='w-full block md:hidden'>
        <Input
          placeholder='Nhập tên công ty...'
          suffix={suffix}
          className='h-[38px] md:hidden'
          onFocus={onFocus}
        />
      </div>
      <div
        className={`${!isFocused && 'invisible'} w-full mt-6 mb-4 md:visible`}
      >
        <div className='flexBetween w-full mb-3'>
          <div className='flexStart gap-2'>
            <Image src='/icons/dots.svg' width={16} height={16} alt='dots' />
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
                    src='/icons/collapse.svg'
                    alt='collapse'
                    width={16}
                    height={16}
                  />
                }
                onClick={btnCollapse}
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
                allowClear
              />
            ))}
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default HomeSearch;
