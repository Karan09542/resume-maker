import PdfResume from "../Components/react-pdf/PdfResume";

export const handleDownloadResume = async (key) => {
    const resume = resumesObjs[key];
    const doc = <PdfResume candidate={resume} />;
    const asPdf = pdf(doc);
    const blob = await asPdf.toBlob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${resume.name}.pdf`;
    link.click();
    document.body.removeChild(link);
  };