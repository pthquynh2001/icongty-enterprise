import { ConfigProvider, Select } from 'antd';
import React from 'react';

const SortBy = () => {
  return (
    <div className='flexEnd'>
      <p className='text-xs'>Sắp xếp theo:</p>
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
  );
};

export default SortBy;
