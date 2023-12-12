import { Pagination, ConfigProvider } from 'antd';
import type { PaginationProps } from 'antd/lib/pagination/Pagination';

const CustomPagination: React.FC<PaginationProps> = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemActiveBg: 'rgba(47, 97, 230, 0.10)',
            itemLinkBg: '#2F61E6',
            itemInputBg: '#2F61E6',
            itemActiveBgDisabled: '#2F61E6',
          },
          Button: {
            borderColorDisabled: '#2F61E6',
            defaultBg: '#2F61E6',
            defaultColor: '#2F61E6',
            primaryColor: '#2F61E6',
            defaultBorderColor: '#2F61E6',
          },
        },
        token: {
          colorText: '#2F61E6',
          colorBorder: '#2F61E6',
          colorPrimary: '#2F61E6',
          colorPrimaryBorder: '#2F61E6',
          colorPrimaryHover: '#2F61E6',
          controlOutline: '#2F61E6',
          colorBgContainer: '#2F61E6',
          colorBgContainerDisabled: '#2F61E6',
          colorBgTextActive: '#2F61E6',
          colorBgTextHover: '#2F61E6',
          colorTextDisabled: '#2F61E6',
          lineWidth: 1,
          lineType: 'solid',
          colorLink: '#2F61E6',
          colorLinkActive: '#2F61E6',
          colorLinkHover: '#2F61E6',
        },
      }}
    >
      <Pagination
        defaultCurrent={props.defaultCurrent}
        total={props.total}
        current={props.current}
        pageSize={props.pageSize}
        onChange={props.onChange}
      />
    </ConfigProvider>
  );
};

export default CustomPagination;
