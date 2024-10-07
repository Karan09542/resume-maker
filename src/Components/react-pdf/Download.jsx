import React from "react";
import { useResumeStore } from "../../../Store/Resume";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfResume from "./PdfResume";

const Download = ({ candidate }) => {
  return (
    <div className="p-6 bg-gray-100 font-openSans">
      <PDFDownloadLink
        document={<PdfResume candidate={candidate} />}
        fileName={candidate.name + ".pdf"}
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            "Loading document..."
          ) : (
            <button className="px-2 py-1 styles.spacebottomtext-white bg-blue-500 rounded-md hover:bg-blue-600 active:scale-95">
              Download
            </button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default Download;
