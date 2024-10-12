import { pdf, PDFViewer } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import PdfResume from "./PdfResume";
import { useParams } from "react-router-dom";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import Download from "./Download";
import { useImageStore } from "../../../Store/Resume";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Pdf_Page = () => {
  const [candidate, setCandidate] = useState({});
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null); // State to hold generated PDF blob URL
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const params = useParams();

  useEffect(() => {
    const resumesObjs = JSON.parse(localStorage.getItem("resumesObjs"));
    const candidateData = resumesObjs[params.resumeId];
    setCandidate(candidateData);
    document.title = candidateData.name;
  }, [params.resumeId]);

  // Helper function to detect mobile browsers
  function isMobileBrowser() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  useEffect(() => {
    if (isMobileBrowser()) {
      const generatePdfForMobile = async () => {
        const resumesObjs = JSON.parse(localStorage.getItem("resumesObjs"));
        const resume = resumesObjs[params.resumeId];
        const doc = <PdfResume candidate={resume} />;
        const asPdf = pdf(doc);
        const blob = await asPdf.toBlob(); // Convert to Blob
        const blobUrl = URL.createObjectURL(blob); // Create Blob URL for Document
        setPdfBlobUrl(blobUrl);
      };

      generatePdfForMobile();
    }
  }, [params.resumeId]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1); // Reset to page 1 when loading a new document
  }

  // Rendering for mobile browsers
  if (isMobileBrowser()) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="sticky top-0 z-10 flex items-center justify-between w-full px-4 py-2 text-center bg-white">
          Page {pageNumber} of {numPages}
          <Download candidate={candidate} />
        </p>
        {pdfBlobUrl ? (
          <>
            <Document
              className={""}
              file={pdfBlobUrl}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.from(new Array(numPages), (x, i) => i + 1).map((page) => (
                <Page
                  key={`page_${page}`}
                  pageNumber={page}
                  renderTextLayer={false}
                  renderAnnotations={false} // Typo fixed here (renderAnnotations instead of randerAnnotations)
                  scale={0.6}
                  width={595}
                  height={20}
                />
              ))}
            </Document>
          </>
        ) : (
          <p>Loading PDF...</p>
        )}
      </div>
    );
  }

  const image = useImageStore((state) => state.image);
  // Rendering for non-mobile browsers
  return (
    <PDFViewer style={{ width: "100vw", height: "100vh" }}>
      <PdfResume candidate={candidate} image={image} />
    </PDFViewer>
  );
};

export default Pdf_Page;
