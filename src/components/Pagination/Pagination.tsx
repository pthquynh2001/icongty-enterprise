import React, { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
const cx = classNames.bind(styles);

// Define the interface for pagination props
interface PaginationProps {
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
  };
  onPageChange: (newPage: number) => void;
}

function Pagination(props: PaginationProps) {
  const { pagination, onPageChange } = props;
  const { page, limit, totalItems } = pagination;
  const totalPages = Math.ceil(totalItems / limit);

  const [numbers, setNumbers] = useState<number[]>([]);
  const [active, setActive] = useState(page ? page : 1);

  // Use effect to update page numbers on total pages change
  useEffect(() => {
    const newNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      newNumbers.push(i);
    }
    setNumbers(newNumbers);
  }, [totalPages]);

  // Handle page change event
  function handlePageChange(newPage: number) {
    if (onPageChange) {
      onPageChange(newPage);
      setActive(newPage);
    }
  }

  return (
    <div className='flexCenter text-royalBlue-80 gap-2'>
      {/* Previous button */}
      <button
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
        className='flexCenter w-8 h-8 rounded bg-royalBlue-80 text-white cursor-pointer disabled:bg-royalBlue-60  disabled:cursor-default'
      >
        <Image src='/icons/left.svg' height={12} width={12} alt='left-icon' />
      </button>

      {/* Page number list */}
      <ul className='flexCenter gap-2'>
        {numbers.map((number) => (
          <li
            key={number}
            // className={cx('number', number === active ? 'active' : '')}
            className={`flexCenter w-8 h-8 inline-block border rounded cursor-pointer ${
              number === active
                ? 'border-royalBlue text-royalBlue bg-[#e1e6f3] font-semibold'
                : 'border-royalBlue-60 text-royalBlue-80'
            }`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </li>
        ))}
      </ul>

      {/* Next button */}
      <button
        disabled={page >= totalPages}
        onClick={() => handlePageChange(page + 1)}
        className='flexCenter w-8 h-8 rounded bg-royalBlue-80 text-white cursor-pointer disabled:bg-royalBlue-60 disabled:cursor-default'
      >
        <Image src='/icons/right.svg' height={12} width={12} alt='right-icon' />
      </button>
    </div>
  );
}

export default Pagination;
