// 'use client';
// import { use, useEffect } from 'react';
// import Swiper from 'swiper';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import './News.scss';
// import { Pagination, Autoplay } from 'swiper/modules';
// import { SwiperOptions } from 'swiper/types';

// const News = () => {
//   useEffect(() => {
//     const swiperParams: SwiperOptions = {
//       modules: [Pagination, Autoplay],
//       slidesPerView: 1,
//       spaceBetween: 0,
//       mousewheel: true,
//       direction: 'horizontal',
//       // autoplay: {
//       //   delay: 1000,
//       // },
//       pagination: {
//         type: 'custom',
//         el: '.swiper-pagination',
//         renderCustom: function (swiper, current, total) {
//           const progressPercentage = (current / total) * 100;

//           const customPaginationHTML = `
//             <div class="pagination-container">
//               <div class="swiper-pagination-current">${current}</div>
//               <div class="progress-bar">
//                 <div class="progress-bar-inner" style="width: ${progressPercentage}%"></div>
//               </div>
//               <div class="swiper-pagination-total">${total}</div>
//             </div>
//           `;

//           return (swiper.pagination.el.innerHTML = customPaginationHTML);
//         },
//       },
//     };

//     const swiper = new Swiper('.swiper', swiperParams);

//     // Listen for slide change event
//     swiper.on('slideChange', () => {
//       const currentSlide = swiper.activeIndex + 1;
//       const totalSlides = swiper.slides.length;
//       const progressPercentage = (currentSlide / totalSlides) * 100;

//       // Update the progress bar dynamically
//       const progressBarInner = document.querySelector('.progress-bar-inner');
//       if (progressBarInner) {
//         console.log('inner', progressBarInner);
//       }
//     });

//     return () => {
//       swiper.destroy(true, true);
//     };
//   }, []);

//   return (
//     <div className='news max-container padding-container w-full h-[600px] relative'>
//       <div className='swiper h-1/2 w-full max-container padding-container'>
//         <div className='swiper-wrapper h-full'>
//           <div className='swiper-slide bg-pink-200'>Slide 1</div>
//           <div className='swiper-slide bg-pink-200'>Slide 2</div>
//           <div className='swiper-slide bg-pink-200'>Slide 3</div>
//           <div className='swiper-slide bg-pink-200'>Slide 4</div>
//         </div>
//         <div className='swiper-pagination'></div>
//       </div>
//     </div>
//   );
// };

// export default News;

import React from 'react';

const News = () => {
  return <div>News</div>;
};

export default News;
