'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Select, ConfigProvider, Button } from 'antd';
import Search from 'antd/lib/input/Search';
import * as categoryServices from '@/apiServices/categoryServices';
import type { SearchProps } from 'antd/lib/input/Search';
import {
  COMPANY_SIZE_OPTIONS,
  HOME_SEARCH_SELECT,
  PROVINCE_OPTIONS,
} from '@/constants';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

type SelectOption = {
  label: string;
  value: string;
  key: number;
};

const HomeSearch: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCat, setSelectedCat] = useState('Ngành nghề');
  const [selectedProvince, setSelectedProvince] = useState('Địa điểm');
  const [selectedSize, setSelectedSize] = useState('Quy mô');
  const [catOptions, setCatOptions] = useState<SelectOption[]>([]);
  const router = useRouter();

  const provinceOptions = PROVINCE_OPTIONS.map((item, index) => ({
    label: item.name,
    value: item.id,
    key: index,
  }));
  const companySizeOptions = COMPANY_SIZE_OPTIONS.map((item, index) => ({
    label: item.name,
    value: item.id,
    key: index,
  }));
  useEffect(() => {
    const fetchData = async () => {
      const res = await categoryServices.getAll();
      setCatOptions(
        res.map((item: { name: any; _id: any }, index: any) => ({
          label: item.name,
          value: item._id,
          key: index,
        }))
      );
    };
    fetchData();
  }, []);
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const onFocus = () => {
    setIsFocused(true);
  };
  const btnCollapse = () => {
    setIsFocused(false);
    handleClear();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    if (search == ' ') {
      setSearchValue('');
    } else {
      setSearchValue(search);
    }
  };

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    if (value) {
      router.push(`/companies?name=${value}`);
    }
  };

  const onSelectCat = (value: string) => {
    setSelectedCat(value);
  };
  const onSelectProvince = (value: string) => {
    setSelectedProvince(value);
  };
  const onSelectSize = (value: string) => {
    setSelectedSize(value);
  };

  const handleClear = () => {
    setSelectedCat('Ngành nghề');
    setSelectedProvince('Địa điểm');
    setSelectedSize('Quy mô');
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
            suffix={
              <AudioOutlined
                style={{
                  fontSize: 16,
                  color: '#2f61e6',
                  opacity: 0.6,
                }}
              />
            }
            onSearch={onSearch}
            value={searchValue}
            className='h-[40px]'
            onChange={(e) => handleInput(e)}
          />
        </ConfigProvider>
      </div>
      <div className='w-full block md:hidden'>
        <Input
          placeholder='Nhập tên công ty...'
          suffix={
            <AudioOutlined
              style={{
                fontSize: 16,
                color: '#2f61e6',
                opacity: 0.6,
              }}
            />
          }
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
                icon={<VerticalAlignTopOutlined />}
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
            <Select
              defaultValue='Ngành nghề'
              options={catOptions}
              filterOption={filterOption}
              showSearch
              value={selectedCat}
              onSelect={onSelectCat}
            />
            <Select
              defaultValue='Địa Điểm'
              options={provinceOptions}
              filterOption={filterOption}
              showSearch
              value={selectedProvince}
              onSelect={onSelectProvince}
            />
            <Select
              defaultValue='Quy mô'
              options={companySizeOptions}
              filterOption={filterOption}
              showSearch
              value={selectedSize}
              onSelect={onSelectSize}
            />
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default HomeSearch;
