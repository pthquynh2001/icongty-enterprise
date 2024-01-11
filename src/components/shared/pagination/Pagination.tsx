'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// Define the interface for pagination props
interface PaginationProps {
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
  };
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  const { page, limit, totalItems } = pagination || {};
  const totalPages = Math.ceil(totalItems / limit);
  type PageNumberItem = number | string;

  const [numbers, setNumbers] = useState<PageNumberItem[]>([]);
  const [active, setActive] = useState(page ? page : 1);

  // Use effect to update page numbers on total pages change
  useEffect(() => {
    const newNumbers: PageNumberItem[] = [];
    // set max visible buttons
    const maxVisibleButtons = 4;
    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        newNumbers.push(i);
      }
    } else {
      const halfVisibleButtons = Math.floor(maxVisibleButtons / 2);
      const start =
        active <= halfVisibleButtons
          ? 1
          : Math.min(
              active - halfVisibleButtons,
              totalPages - maxVisibleButtons + 1
            );
      const end = Math.min(start + maxVisibleButtons - 1, totalPages);

      if (start > 1) {
        newNumbers.push(1);
        if (start > 2) {
          newNumbers.push('...'); // Display ellipsis
        }
      }

      for (let i = start; i <= end; i++) {
        newNumbers.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) {
          newNumbers.push('...'); // Display ellipsis
        }
        newNumbers.push(totalPages);
      }
    }
    setNumbers(newNumbers);
  }, [totalPages, active]);

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
        className='flexCenter w-8 h-8 rounded bg-royalBlue-80 text-white cursor-pointer  hover:bg-royalBlue disabled:bg-royalBlue-60  disabled:cursor-default'
        title='Previous page'
      >
        <Image src='/icons/left.svg' height={12} width={12} alt='left-icon' />
      </button>

      {/* Page number list */}
      <ul className='flexCenter gap-2'>
        {numbers.map((number, index) => (
          <li
            key={index}
            className={`flexCenter w-8 h-8 inline-block border rounded cursor-pointer hover:border-royalBlue hover:text-royalBlue ${
              number === active
                ? 'border-royalBlue text-royalBlue bg-[#e1e6f3] font-semibold'
                : 'border-royalBlue-60 text-royalBlue-80'
            }`}
            onClick={() =>
              typeof number === 'number' ? handlePageChange(number) : null
            }
          >
            {number}
          </li>
        ))}
      </ul>

      {/* Next button */}
      <button
        disabled={page >= totalPages}
        onClick={() => handlePageChange(page + 1)}
        className='flexCenter w-8 h-8 rounded bg-royalBlue-80 text-white cursor-pointer  hover:bg-royalBlue disabled:bg-royalBlue-60 disabled:cursor-default'
        title='Next page'
      >
        <Image src='/icons/right.svg' height={12} width={12} alt='right-icon' />
      </button>
    </div>
  );
};

export default Pagination;
