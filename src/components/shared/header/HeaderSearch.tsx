import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import Search from 'antd/lib/input/Search';
import type { SearchProps } from 'antd/lib/input/Search';

const HSearch = () => {
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

  return (
    <div className='w-full'>
      <ConfigProvider
        theme={{
          token: {
            colorBgElevated: '#2f61e6',
            colorLink: '#2f61e6',
            colorLinkActive: '#2f61e6',
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
  );
};

export default HSearch;
