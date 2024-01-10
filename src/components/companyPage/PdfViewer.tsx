// components/PdfViewer.tsx
'use-client';
import React from 'react';
import { Document, Page, Thumbnail } from 'react-pdf';
import { saveAs } from 'file-saver';

import { pdfjs } from 'react-pdf';
import Image from 'next/image';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

interface PdfViewerProps {
  downloadUrl: string;
  thumbnailUrl: string | null;
  className?: string;
}

const Loading = () => (
  <div className='flexCenter w-[95px] h-[132px] bg-neutral-1 rounded border border-neutral-3 overflow-hidden'>
    <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-royalBlue'></div>
  </div>
);

const ErrorLoading = () => (
  <div className='flexCenter w-[95px] h-[132px] bg-neutral-1 rounded border border-neutral-3 overflow-hidden'>
    <p>Error loading PDF.</p>
  </div>
);

const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
  e.preventDefault();
};

const PdfViewer: React.FC<PdfViewerProps> = (props) => {
  return (
    <div className={`flexCenter ${props.className ? props.className : ''}`}>
      <Document
        file={props.downloadUrl}
        loading={<Loading />}
        error={<ErrorLoading />}
        className='flex'
      >
        <div className='relative w-[95px] h-[132px] flexCenter bg-neutral-1 rounded border border-neutral-3 overflow-hidden '>
          {props.thumbnailUrl ? (
            <Image
              src={props.thumbnailUrl}
              alt='thumbnail'
              fill
              sizes='(max-width: 640px) 100vw'
              className='object-cover bg-royalBlue'
            />
          ) : (
            <Thumbnail
              pageNumber={1}
              height={132}
              canvasBackground='transparent'
              onClick={handleClick}
            />
          )}
        </div>
      </Document>
    </div>
  );
};

export default PdfViewer;
