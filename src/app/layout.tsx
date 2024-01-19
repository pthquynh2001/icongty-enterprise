import StyledComponentsRegistry from '../lib/AntdRegistry';
import { ConfigProvider } from 'antd';
import theme from '@theme/themeConfig';

import './styles/global.scss';
import AuthProvider from '../context/Provider';

export const metadata = {
  title: 'iCongty',
  description:
    'Personal project using Typescript, ReactJS, NextJS, Antdesign and TailwindCSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <StyledComponentsRegistry>
            <ConfigProvider theme={theme}>{children}</ConfigProvider>
          </StyledComponentsRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
