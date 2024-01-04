'use client';
import { useState, useEffect } from 'react';
import * as categoryServices from '@/apiServices/categoryServices';
import SubpageBreadcrumb from '@/components/SubpageBreadcrumb';
import SubpageBanner from '@/components/SubpageBanner';
import SubpageSearch from '@/components/SubpageSearch';
import Pagination from '@/components/Pagination';
import Tag from '@/components/Tag/Tag';
import CategoryCard from '@/components/CategoryCard';
import { Select, ConfigProvider } from 'antd';
import Header from '@/components/Header';

// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: {
//     absolute: 'Danh mục ngành nghề',
//   },
// };
const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
const items = [
  { title: 'Trang chủ', href: '/' },
  {
    title: 'Danh mục ngành nghề',
  },
];
interface alphabetCategoriesProps {
  letter: string;
  categories: any[];
}
const CategoriesPage = () => {
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const [alphabetCategories, setAlphabetCategories] = useState<
    alphabetCategoriesProps[]
  >([]);
  const [filteredLetters, setFilteredLetters] = useState<any[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // pagination
  const [page, setPage] = useState(1);
  const pagination = {
    limit: 3,
    totalItems: filteredLetters.length || 0,
    page: page,
  };

  // START: featch data
  useEffect(() => {
    const fetchData = async () => {
      const res = await categoryServices.getAll();
      setCategoriesData(res);
    };
    fetchData();
  }, []);

  // END: featch data

  //START: tao array moi chua cac object co key la chu cai dau tien cua ten nganh nghe
  useEffect(() => {
    if (categoriesData) {
      const newArray = alphabet.map((letter) => {
        const filteredCategories = categoriesData.filter(
          (category) => category.name.charAt(0).toUpperCase() === letter
        );
        return { letter, categories: filteredCategories };
      });
      setAlphabetCategories(newArray);
    }
  }, [categoriesData]);
  // END

  // START: filter array moi chua theo chu cai dau tien
  useEffect(() => {
    const newArray = alphabetCategories.filter((item) => {
      if (item.categories.length > 0) {
        return item;
      }
    });
    setFilteredLetters(newArray);
  }, [alphabetCategories]);
  // END: filter array moi chua theo chu cai dau tien

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
  };

  return (
    <>
      <Header />
      <div className='mt-20'>
        <SubpageBreadcrumb items={items} />
      </div>
      <SubpageBanner
        title='Danh mục ngành nghề'
        desc='Khám phá đối tác tiềm năng của bạn trong hơn 3,000+ doanh nghiệp trên iCongty'
        image='/images/categories-banner.png'
      />
      <SubpageSearch />
      <div className='max-container padding-container mb-[120px]'>
        <div className='flexBetween pb-4 mb-8 '>
          <div className='flexStart gap-4 max-w-[50%]'>
            <h3 className=''>Tất cả ngành nghề</h3>
            <Tag type='block'>6,545</Tag>
          </div>
          <div className='flexEnd '>
            <p>Sắp xếp theo:</p>
            <ConfigProvider
              theme={{
                token: {
                  colorText: '#2f61e6',
                },
              }}
            >
              <Select
                defaultValue='Từ A-Z'
                style={{ width: 102 }}
                bordered={false}
                options={[
                  { value: 'asc', label: 'Từ A-Z' },
                  { value: 'desc', label: 'Từ Z-A' },
                ]}
              />
            </ConfigProvider>
          </div>
        </div>
        <div className='block  w-full  border-b border-black border-opacity-5 pb-6 mb-12'>
          <h5 className=' text-base font-semibold max-w-[550px] flexBetween '>
            {alphabet.map((letter, index) => (
              <span
                key={index}
                className={`hover:cursor-pointer hover:text-royalBlue-70 transition-all duration-300 ${
                  selectedLetter === letter
                    ? 'text-royalBlue'
                    : 'text-neutral-7'
                }`}
                onClick={() => handleLetterClick(letter)}
              >
                {letter}
              </span>
            ))}
          </h5>
        </div>
        {alphabetCategories && (
          <>
            <>
              {alphabetCategories
                .filter((item) => item.categories.length > 0)
                .map(
                  (item, index) =>
                    item.categories.length > 0 &&
                    index >= pagination.limit * (page - 1) &&
                    index < pagination.limit * page && (
                      <div
                        key={index}
                        className='flex flex-wrap lg:flex-nowrap border-b border-black border-opacity-5 pb-12 mb-12'
                      >
                        <h3 className='text-2xl font-semibold mb-4 w-full block shrink-0  lg:w-[200px]'>
                          {item.letter}
                        </h3>
                        <div className='w-full grid grid-cols-2  gap-x-6  gap-y-6 md:grid-cols-3 lg:gap-x-[73px] '>
                          {item.categories.map((category, index) => (
                            <CategoryCard
                              key={index}
                              name={category.name}
                              companyCount={category.companyCount}
                            />
                          ))}
                        </div>
                      </div>
                    )
                )}
            </>
            <div className='flexEnd'>
              {pagination.totalItems / pagination.limit > 1 && (
                <Pagination
                  pagination={pagination}
                  onPageChange={(page) => {
                    setPage(page);
                  }}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CategoriesPage;
