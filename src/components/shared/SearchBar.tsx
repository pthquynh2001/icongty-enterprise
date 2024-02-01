import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
const SearchBar = ({ placeholder }: { placeholder?: string }) => {
  return (
    <div className='flex h-10'>
      <div className='flexCenter bg-royalBlue w-12 h-full rounded-s'>
        <SearchOutlined style={{ color: 'white' }} />
      </div>
      <input
        className='w-[400px] rounded-e outline-none px-6 py-2 placeholder:text-neutral-6 h-full'
        placeholder={placeholder ? placeholder : ''}
      />
    </div>
  );
};

export default SearchBar;
