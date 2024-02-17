'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';
import * as categoryServices from '@/apiServices/categoryServices';
import {
  AudioOutlined,
  SearchOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { Input, Button, ConfigProvider, Select } from 'antd';
import { PROVINCE_OPTIONS, COMPANY_SIZE_OPTIONS } from '@/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type SelectOption = {
  label: string;
  value: string;
  key: number;
};

type props = {
  onSearch: (params: any) => void;
  loading: boolean;
};
const SubpageSearch: React.FC<props> = ({ onSearch, loading }) => {
  const searchedName = useSearchParams().get('name');
  const [searchValue, setSearchValue] = useState(searchedName || '');
  const [selectedCat, setSelectedCat] = useState('Ngành nghề');
  const [selectedProvince, setSelectedProvince] = useState('Địa điểm');
  const [selectedSize, setSelectedSize] = useState('Quy mô');
  const [isOpened, setIsOpened] = useState(false);
  const [catOptions, setCatOptions] = useState<SelectOption[]>([]);
  const [searchParams, setSearchParams] = useState({});

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
  const router = useRouter();
  const path = usePathname();

  //
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  // handle click advanced search
  const handleAdvancedSearchClick = () => {
    setIsOpened(!isOpened);
    handleClear();
  };

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

  const onSelectCat = (value: string) => {
    setSelectedCat(value);
    setSearchParams({ ...searchParams, category: value });
  };
  const onSelectProvince = (value: string) => {
    setSelectedProvince(value);
    setSearchParams({ ...searchParams, city: value });
  };
  const onSelectSize = (value: string) => {
    setSelectedSize(value);
    setSearchParams({ ...searchParams, companySize: value });
  };

  const handleClear = () => {
    setSelectedCat('Ngành nghề');
    setSelectedProvince('Địa điểm');
    setSelectedSize('Quy mô');
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    if (search.startsWith(' ')) {
      setSearchValue('');
      return;
    } else {
      setSearchValue(search);
    }
  };

  const handleSearch = () => {
    // onSearch(searchParams)
    if (searchValue) {
      router.push(`${path}?name=${searchValue}`, { scroll: false });
      onSearch({ name: searchValue });
    }
  };
  return (
    <div className='max-container padding-container mt-[54px]'>
      <div className='flex gap-6'>
        <div className='w-[910px] shadow-card'>
          <Input
            placeholder='Nhập tên công ty, mã số thuế, ngành nghề...'
            size='large'
            suffix={<AudioOutlined className='text-base text-royalBlue-60' />}
            value={searchValue}
            onChange={(e) => handleInput(e)}
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
              onClick={handleSearch}
              loading={loading}
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
                icon={<EllipsisOutlined className='text-base' />}
              >
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
              <Button type='text' onClick={handleClear}>
                Xoá bộ lọc
              </Button>
            </ConfigProvider>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubpageSearch;
