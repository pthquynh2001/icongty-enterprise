import React from 'react';
import { User } from 'next-auth';

interface CompaniesItemProps {
  user: User;
}

const CompaniesItem = ({ user }: CompaniesItemProps) => {
  return <div>Companies Item</div>;
};

export default CompaniesItem;
