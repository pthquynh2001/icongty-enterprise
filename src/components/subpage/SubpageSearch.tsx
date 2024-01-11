'use client';

import { useState } from 'react';
import Image from 'next/image';

import {
  AudioOutlined,
  SearchOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { Input, Button, ConfigProvider, Select } from 'antd';
import { HOME_SEARCH_SELECT } from '@/constants';

const SubpageSearch: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  // START Select menu setting
  const handleChange = (value: string) => {
    console.log(value);
  };

  // handle click advanced search
  const handleAdvancedSearchClick = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className='max-container padding-container mt-[54px]'>
      <div className='flex gap-6'>
        <div className='w-[910px] shadow-card'>
          <Input
            placeholder='Nhập tên công ty, mã số thuế, ngành nghề...'
            size='large'
            suffix={<AudioOutlined className='text-base text-royalBlue-60' />}
          />
        </div>
        <div className='grow align-middle'>
          <ConfigProvider
            theme={{
              token: {
                lineHeight: 1.5,
              },
            }}
          >
            <Button
              type='primary'
              size='large'
              block
              icon={<SearchOutlined className='text-sm' />}
            >
              Tìm kiếm
            </Button>
          </ConfigProvider>
        </div>
      </div>
      <div className='w-full mt-4 mb-20 flex relative'>
        <div className='max-w-full w-[910px] flex  gap-6 flex-wrap'>
          <div className='w-full md:w-auto'>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    ghostBg: '#e1e6f3',
                    fontWeight: 600,
                  },
                },
                token: {
                  controlHeight: 38,
                },
              }}
            >
              <Button
                type='primary'
                ghost
                className='flexCenter gap-[10px]'
                onClick={handleAdvancedSearchClick}
              >
                <Image
                  src='/icons/ellipsis.svg'
                  alt='EllipsisOutlined'
                  width={16}
                  height={16}
                />
                Tìm kiếm nâng cao
              </Button>
            </ConfigProvider>
          </div>

          {isOpened && (
            <div className='grow grid grid-cols-2 grid-flow-row gap-2 md:grid-cols-3 md:grid-flow-row md:gap-6'>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      optionActiveBg: '#E6F7FF',
                    },
                  },
                  token: {
                    controlHeight: 38,
                  },
                }}
              >
                {HOME_SEARCH_SELECT.map((menu, index) => (
                  <Select
                    key={index}
                    defaultValue={menu.title}
                    onChange={handleChange}
                    options={menu.options}
                  />
                ))}
              </ConfigProvider>
            </div>
          )}
        </div>

        {isOpened && (
          <div className='ml-2 opacity-80 hover:opacity-100 absolute right-0 md:relative '>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    fontWeight: 600,
                    textHoverBg: 'transparent',
                  },
                },
                token: {
                  colorText: '#577fe9',
                  controlHeight: 38,
                  colorBgTextActive: 'transparent',
                },
              }}
            >
              <Button type='text'>Xoá bộ lọc</Button>
            </ConfigProvider>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubpageSearch;
