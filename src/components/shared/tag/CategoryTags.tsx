interface CategoryTags {
  data: {
    _id: string;
    lang: 'en' | 'vi';
    translation: { en: { name: string }; vi: { name: string } };
    name: string;
  }[];
  className?: string;
}

const CategoryTags: React.FC<CategoryTags> = ({ data, className }) => {
  return (
    <div className='h-[22px] flex flex-wrap gap-2 line-clamp-1 list'>
      {data &&
        data.map((cate: any, index: number) => (
          <span
            key={index}
            className={`h-full rounded border inline-block border-royalBlue-60 text-royalBlue-80 text-xs leading-[22px] px-2 ${className}`}
          >
            {cate.name}
          </span>
        ))}
    </div>
  );
};

export default CategoryTags;
