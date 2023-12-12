const Categories = ({ data }: any) => {
  return (
    <div className='h-[22px] flex flex-wrap gap-2 line-clamp-1  list'>
      {data &&
        data.map((cate: any, index: number) => (
          <span
            key={index}
            className='h-full rounded border inline-block border-royalBlue-60 text-royalBlue-80 text-[12px] leading-[22px] pl-2 pr-2'
          >
            {cate.name}
          </span>
        ))}
    </div>
  );
};

export default Categories;
