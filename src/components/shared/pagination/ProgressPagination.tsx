'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

interface ProgressPaginationProps {
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
  };
  onPageChange: (newPage: number) => void;
}

const ProgressPagination: React.FC<ProgressPaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const { page, limit, totalItems } = pagination || {};
  const [currentPage, setCurrentPage] = useState(page ? page : 1);

  const totalPage = Math.ceil(totalItems / limit);
  useEffect(() => {
    const progress = (currentPage / totalPage) * 100;
    if (progressRef.current) {
      progressRef.current.style.width = `${progress}%`;
    }
  }, [currentPage, totalPage]);

  const handleClick =
    (direction: 'next' | 'prev') => (event: React.MouseEvent<HTMLElement>) => {
      if (direction === 'next') {
        if (currentPage < totalPage) {
          setCurrentPage(currentPage + 1);
        } else {
          setCurrentPage(1);
        }
      } else {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          setCurrentPage(totalPage);
        }
      }
    };
  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage);
    }
  }, [currentPage, onPageChange]);
  return (
    <div className='flexBetween'>
      <div className='flex gap-2'>
        <Button
          onClick={handleClick('prev')}
          type='primary'
          ghost
          icon={<LeftOutlined />}
        ></Button>
        <Button
          onClick={handleClick('next')}
          type='primary'
          ghost
          icon={<RightOutlined />}
        ></Button>
      </div>
      <div className='flexCenter gap-2'>
        <span className='font-semibold text-royalBlue'>
          {currentPage < 10 ? '0' + currentPage : currentPage}
        </span>
        <div className='w-[120px] h-[2.5px] bg-neutral-5 rounded-[2px]'>
          <div
            className='h-[2.5px] w-0 bg-royalBlue rounded-[2px] transition-all duration-300'
            ref={progressRef}
          ></div>
        </div>
        <span className='font-semibold text-royalBlue'>
          {totalPage < 10 ? '0' + totalPage : totalPage}
        </span>
      </div>
    </div>
  );
};

export default ProgressPagination;
