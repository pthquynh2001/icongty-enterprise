'use client';
import { useState, useEffect, ChangeEvent, use } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { ConfigProvider, Dropdown, Empty } from 'antd';
import Search from 'antd/lib/input/Search';
import type { SearchProps } from 'antd/lib/input/Search';
import * as companyServices from '@/apiServices/companyServices';
import type { MenuProps } from 'antd';
import { useDebounce } from '@/hooks/useDebounce';
import Link from 'next/link';
import { Company } from '@/types';
const HeaderSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [items, setItems] = useState<MenuProps['items']>([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await companyServices.getAll();
      if (res) {
        setAllData(res);
        setItems(
          res.slice(0, 5).map((item: Company, index: number) => ({
            key: index,
            label: (
              <Link href={`/companies/${item.slug}-${item._id}`}>
                {item.name}
              </Link>
            ),
          })) as MenuProps['items']
        );
      }
    };
    fetchData();
  }, []);

  const debouncedSearchValue: string = useDebounce(searchValue, 300);
  useEffect(() => {
    if (!debouncedSearchValue.trim()) {
      setItems(
        allData.slice(0, 5).map((item: Company, index: number) => ({
          key: index,
          label: (
            <Link href={`/companies/${item.slug}-${item._id}`}>
              {item.name}
            </Link>
          ),
        })) as MenuProps['items']
      );
      return;
    }
    const fetchData = async () => {
      const res = await companyServices.getAll({
        params: { name: debouncedSearchValue },
      });
      if (res) {
        setItems(
          res?.slice(0, 5).map((item: Company, index: number) => ({
            key: index,
            label: (
              <Link href={`/companies/${item.slug}-${item._id}`}>
                {item.name}
              </Link>
            ),
          })) as MenuProps['items']
        );
      } else {
        setItems([
          {
            key: 0,
            label: (
              <Empty className='py-10' description='Không tìm thấy kết quả' />
            ),
          },
        ]);
      }
    };
    fetchData();
  }, [allData, debouncedSearchValue]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    if (!search.startsWith(' ')) {
      setSearchValue(search);
    }
  };

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {};

  return (
    <div className='w-full' onClick={(e) => e.stopPropagation}>
      <ConfigProvider
        theme={{
          components: {
            Dropdown: {
              paddingBlock: 10,
            },
          },
        }}
      >
        <Dropdown
          placement='bottom'
          menu={{ items }}
          open={openDropdown}
          trigger={[]}
          overlayClassName='dropdown-search'
        >
          <Search
            placeholder='Nhập tên công ty, mã số thuế, ngành nghề...'
            enterButton={true}
            onFocus={() => setOpenDropdown(true)}
            onBlur={() => setTimeout(() => setOpenDropdown(false), 500)}
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
            className='h-[40px]'
            value={searchValue}
            onChange={(e) => handleSearch(e)}
          />
        </Dropdown>
      </ConfigProvider>
    </div>
  );
};

export default HeaderSearch;
