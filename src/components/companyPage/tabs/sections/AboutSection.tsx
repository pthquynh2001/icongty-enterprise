'use-client';
import { useEffect, useState, useRef } from 'react';
import Frame from '@/components/subpage/ContentFrame';
import styles from './AboutSection.module.scss';
import classNames from 'classnames/bind';
import { Skeleton } from 'antd';
const cx = classNames.bind(styles);

const AboutSection = ({
  content,
  loading,
}: {
  content: string;
  loading: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [previewContent, setPreviewContent] = useState<string>('');

  // Lấy the p đầu tiên
  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const firstParagraph = doc.querySelector('p');
    setPreviewContent(firstParagraph?.innerHTML || '');
  }, [isExpanded, content]);

  return (
    <Frame title='Về chúng tôi'>
      {loading ? (
        <Skeleton active />
      ) : (
        <div className=''>
          <div className={cx('about-content')}>
            <div
              className='transition-all duration-300 '
              dangerouslySetInnerHTML={{
                __html: isExpanded ? content : previewContent,
              }}
            />
          </div>
          <div className='relative flexCenter mt-8 '>
            <div className='w-full  h-[1px] bg-[#000]/[.06]'></div>
            {isExpanded ? (
              <div
                className='shrink-0 flexCenter gap-2 cursor-pointer pl-6'
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <svg className='w-4 h-4 '>
                  <use
                    className='text-royalBlue '
                    xlinkHref='/icons/collapse.svg#collapse-icon'
                  />
                </svg>
                <span className='text-royalBlue font-semibold'>Thu gọn</span>
              </div>
            ) : (
              <div
                className='shrink-0 cursor-pointer pl-6'
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <span className='text-royalBlue font-semibold'>Đọc tiếp</span>
              </div>
            )}
          </div>
        </div>
      )}
    </Frame>
  );
};

export default AboutSection;
