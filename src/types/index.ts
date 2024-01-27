export interface Company {
  service?: any[];
  _id: string;
  author: {
    _id: string;
    username: string;
    email: string;
    phone: string;
    lastName: string;
    firstName: string;
    avatar: string;
  };
  status: 'active' | 'inactive';
  name: string;
  slug: string;
  internationalName: string;
  internationalNameSort: string;
  taxCode: string;
  keyword: string | null;
  address: string | null;
  representative: null;
  phone: string | null;
  email: string | null;
  foundationDate: string;
  website: string;
  companySize: string;
  coverPhoto: {
    location: string;
    alt: string | null;
  };
  logo: {
    location: string;
    alt: string | null;
  };
  excerpt: string | null;
  categories: {
    _id: string;
    lang: 'en' | 'vi';
    translation: {
      en: {
        name: string;
      };
      vi: {
        name: string;
      };
    };
    name: string;
  }[];
  technologies: [];
  businessStatus: string;
  portfolio: string[];
  product: string[];
  members: [];
  viewer: number | null;
  isSupported: boolean;
  typical: boolean;
  token: null | string;
  nameSort: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
}
