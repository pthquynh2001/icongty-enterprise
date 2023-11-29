import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StyledComponentsRegistry from '../../libs/AntdRegistry';

import { ConfigProvider } from 'antd';
import theme from '../../theme/themeConfig';

import './styles/global.css';

export const metadata = {
  title: 'iCongty',
  description:
    'Personal project using Typescript, ReactJS, NextJS, and TailwindCSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <StyledComponentsRegistry>
          <ConfigProvider theme={theme}>
            <Header />
            <main className='relative'>{children}</main>
            <Footer />
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
