import React from "react";
import { useResumeStore } from "../../../Store/Resume";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfResume from "./PdfResume";

const Download = ({ candidate, image }) => {
  return (
    // p-6 bg-gray-100 font-openSans
    <div className="">
      <PDFDownloadLink
        document={<PdfResume candidate={candidate} image={image} />}
        fileName={candidate.name + ".pdf"}
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            "Loading document..."
          ) : (
            // <button className="px-2 py-1 styles.spacebottomtext-white bg-blue-500 rounded-md hover:bg-blue-600 active:scale-95">
            //   Download
            // </button>
            <span className="px-2 py-1 styles.spacebottomtext-white bg-blue-500 rounded-md hover:bg-blue-600 active:scale-95">
              Download
            </span>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default Download;
