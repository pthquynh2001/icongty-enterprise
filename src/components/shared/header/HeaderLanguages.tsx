import React from 'react';

import { Select, ConfigProvider } from 'antd';
const { Option } = Select;

import Image from 'next/image';
const HeaderLanguages = () => {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            fontSizeIcon: 0,
            controlPaddingHorizontal: 0,
            paddingSM: 0,
            colorBorder: 'transparent',
            lineWidth: 0,
          },
          components: {
            Select: {
              optionHeight: 28,
              optionSelectedColor: '#2f54eb',
              optionPadding: 2,
              selectorBg: 'transparent',
            },
          },
        }}
      >
        <Select
          defaultValue='en'
          className='w-20 -ml-[2px] -mr-4'
          popupMatchSelectWidth={64}
          dropdownRender={(menu) => <div>{menu}</div>}
        >
          <Option value='en' className='full'>
            <div className='flexCenter relative gap-2'>
              <Image
                src='/icons/flag-en.svg'
                width={24}
                height={24}
                alt='flag US'
                className='inline-block'
              />
              <p className='font-semibold text-neutral-8'>EN</p>
            </div>
          </Option>
          <Option value='vi'>
            <div className='flexCenter relative gap-2'>
              <Image
                src='/icons/flag-vi.svg'
                width={24}
                height={24}
                alt='flag US'
                className='inline-block'
              />
              <p className='font-semibold text-neutral-8'>VN</p>
            </div>
          </Option>
        </Select>
      </ConfigProvider>
    </div>
  );
};

export default HeaderLanguages;
