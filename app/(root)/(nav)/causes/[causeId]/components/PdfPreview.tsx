// "use client";
// import React, { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Download } from "lucide-react";

// // Single worker configuration
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();
// interface PdfPreviewProps {
//   url: string;
// }

// export default function PdfPreview({ url }: PdfPreviewProps) {
//   const [numPages, setNumPages] = useState<number>();
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState<number>(1);

//   // Remove the useEffect worker configuration

//   function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
//     setNumPages(numPages);
//   }

//   return (
//     <>
//       <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
//         <Document
//           file={url}
//           onLoadSuccess={onDocumentLoadSuccess}
//           className="border rounded-lg overflow-hidden"
//         >
//           <Page
//             pageNumber={1}
//             width={300}
//             renderTextLayer={false}
//             renderAnnotationLayer={false}
//           />
//         </Document>
//       </div>

//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//         <DialogContent className="max-w-4xl w-full">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold">
//               Page {currentPage} of {numPages}
//             </h3>
//             <a
//               href={url}
//               download
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
//             >
//               <Download className="w-4 h-4" />
//               Download PDF
//             </a>
//           </div>
//           <div className="overflow-auto max-h-[80vh]">
//             <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
//               <Page
//                 pageNumber={currentPage}
//                 width={750}
//                 renderTextLayer={false}
//                 renderAnnotationLayer={false}
//               />
//             </Document>
//           </div>
//           <div className="flex justify-center gap-4 mt-4">
//             <Button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage <= 1}
//             >
//               Previous
//             </Button>
//             <Button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, numPages || 1))
//               }
//               disabled={currentPage >= (numPages || 1)}
//             >
//               Next
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// components/PdfPreview.tsx
import { DocEnum } from "@/constants/enums";
import React from "react";

interface PdfPreviewProps {
  pdfUrl: string;
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ pdfUrl }) => {
  const extension = pdfUrl.split(".").pop();

  return (
    <div className="pdf-preview-container">
      <embed
        src={pdfUrl}
        type={DocEnum[extension as keyof typeof DocEnum]}
        width="100%"
        height="100%"
        style={{ minHeight: "60vh" }}
        className="w-full h-full"
      />
    </div>
  );
};

export default PdfPreview;
