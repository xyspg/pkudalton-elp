import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

interface PDFProps {
  url: string;
  pageWidth?: number;
}

const PDF: React.FC<PDFProps> = ({ url, pageWidth }) => {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  });
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const toggleGroupItemClasses =
    "hover:bg-slate-300 dark:hover:bg-slate-600 color-mauve11 flex h-[35px] w-[35px] items-center justify-center bg-white dark:bg-slate-800 text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none";

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }






  return (
    <>
      <p className="text-center text-slate-600 dark:text-slate-300 text-sm mb-2 ">
         {pageNumber} / {numPages}
      </p>
      <div className="flex justify-center mb-4">
        <ToggleGroup.Root
            className="inline-flex bg-mauve6 dark:bg-slate-700 rounded shadow-[0_2px_10px] shadow-blackA7 space-x-px"
            type="single"
            defaultValue="center"
            aria-label="Text alignment"
        >
          <ToggleGroup.Item
              className={toggleGroupItemClasses}
              onClick={previousPage}
              disabled={pageNumber === 1}
              value="left"
              aria-label="Left aligned"
          >
            <ArrowLeftIcon />
          </ToggleGroup.Item>
          <ToggleGroup.Item
              className={toggleGroupItemClasses}
              onClick={nextPage}
              disabled={pageNumber === numPages}
              value="center"
              aria-label="Center aligned"
          >
            <ArrowRightIcon />
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </div>
          <div className="flex justify-center gap-4 mb-8">
            <div className="border-slate-800 border-1 shadow-2xl dark:border-slate-200 dark:shadow-slate-500">
              <Document file={url} loading={<div className='w-[300px]'></div>} onLoadSuccess={onDocumentLoadSuccess}>
                {pageWidth && <Page width={pageWidth} pageNumber={pageNumber} />}
              </Document>
            </div>
          </div>

    </>
  );
};

export default PDF;
