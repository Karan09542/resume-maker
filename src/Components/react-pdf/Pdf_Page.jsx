import { PDFViewer } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import PdfResume from "./PdfResume";
import { useParams } from "react-router-dom";

const Pdf_Page = () => {
  const [candidate, setCandidate] = useState({});
  const params = useParams();
  useEffect(() => {
    const resumesObjs = JSON.parse(localStorage.getItem("resumesObjs"));
    setCandidate(resumesObjs[params.resumeId]);
    document.title = resumesObjs[params.resumeId].name;
  }, []);

  return (
    <PDFViewer style={{ width: "100vw", height: "100vh" }}>
      <PdfResume candidate={candidate} />
    </PDFViewer>
  );
};

export default Pdf_Page;
