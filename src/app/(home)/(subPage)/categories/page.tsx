'use client';
import { useState, useEffect } from 'react';
import * as categoryServices from '@/apiServices/categoryServices';

const CategoriesPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pagination = { limit: 12, totalItems: 100, page: page };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await categoryServices.getAll({
        params: { page: page, limit: pagination.limit },
      });
      setLoading(false);
      setData(res);
    };
    fetchData();
  }, [page, pagination.limit]);
  return <div>CategoriesPage</div>;
};

export default CategoriesPage;
