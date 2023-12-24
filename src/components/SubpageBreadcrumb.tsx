import React from 'react';
import { Breadcrumb, ConfigProvider } from 'antd';
import Link from 'next/link';

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const SubpageBreadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const breadcrumbItems = items.map((item) => {
    if (item.href) {
      return {
        title: <Link href={item.href}>{item.title}</Link>,
      };
    } else {
      return { title: item.title };
    }
  });

  return (
    <div className='pt-8 pb-[22px] max-container padding-container'>
      <ConfigProvider
        theme={{
          token: {
            colorBgTextHover: 'transparent',
          },
        }}
      >
        <Breadcrumb items={items} />
      </ConfigProvider>
    </div>
  );
};

export default SubpageBreadcrumb;
