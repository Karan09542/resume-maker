import React, { useEffect, useRef, useState } from "react";
import { useResumeStore } from "../../Store/Resume";
import html2pdf from "html2pdf.js";
import { useParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";

function Resume() {
  const resumeRef = useRef();

  // const candidate = useResumeStore((state) => state.resume);
  // if (candidate) {
  //   console.log(candidate);
  // }

  const [candidate, setCandidate] = useState({});
  const params = useParams();
  useEffect(() => {
    const resumesObjs = JSON.parse(localStorage.getItem("resumesObjs"));
    setCandidate(resumesObjs[params.resumeId]);
    document.title = resumesObjs[params.resumeId].name;
  }, []);

  const handleDownloadPdf = () => {
    const element = resumeRef.current;
    const options = {
      margin: [0, 0.3],
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.85 },
      html2canvas: { scale: 3, dpi: 192, letterRendering: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    // Use html2pdf to generate and download the PDF
    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="p-6 bg-gray-100 ">
      <button
        onClick={handleDownloadPdf}
        className="px-2 py-1 mb-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 active:scale-95"
      >
        download
      </button>
      <div
        ref={resumeRef}
        className="max-w-3xl px-4 py-6 mx-auto bg-white rounded-lg"
      >
        <h1 className="mb-4 text-[2rem] font-bold text-center tracking-wide">
          {candidate.heading}
        </h1>
        <h2 className="text-2xl font-bold uppercase">{candidate.name}</h2>
        <p className="mb-2 text-lg capitalize">{candidate.profile}</p>

        <div className="mb-4 text-lg font-semibold capitalize">
          <p>
            {candidate.houseNo},{candidate.landmark}
          </p>
          <p>
            {candidate.area}, {candidate.state} - {candidate.pincode}
          </p>
          <p>Mob No. {candidate.mobileNo}</p>
          <p>Email: {candidate.email}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold sub-heading">
            Career Objective
          </h3>
          <Tooltip id="edit" />
          <p
            className="text-[1rem] font-medium outline-none focus:ring-2"
            contentEditable="true"
            title="Editable"
            data-tooltip-id="edit"
            data-tooltip-content="click to edit"
          >
            To make contribution in the organization with best of my ability and
            also to develop new skills during the interaction to achieve new
            heights.
          </p>
        </div>

        {candidate?.qualifications && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold sub-heading">
              Academic Qualification
            </h3>
            <ul className="list-disc list-inside">
              {candidate?.qualifications?.map((qualifi) => (
                <li key={qualifi}>&bull; {qualifi}</li>
              ))}
            </ul>
          </div>
        )}

        {candidate?.otherQualifications && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold sub-heading">
              Other Qualification
            </h3>
            <ul className="list-disc list-inside">
              {candidate?.otherQualifications?.map((otherQualifi) => (
                <li key={otherQualifi}>&bull; {otherQualifi}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-4">
          <h3 className="text-lg font-semibold sub-heading">Work Experience</h3>
          {candidate?.workExperiences?.map((experience) => (
            <li key={experience}>&bull; {experience}</li>
          ))}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold sub-heading">
            Personal Information
          </h3>
          <div className="[&>p]:flex [&>p>span:nth-child(1)]:w-[30%] [&>p]:justify-between [&>p>span]:w-full text-[1rem] font-medium break-word">
            <p>
              <span>Father's Name</span>{" "}
              <span className="flex gap-10">
                <span>:</span> {candidate.fname}
              </span>
            </p>
            <p>
              <span>Date of Birth</span>{" "}
              <span className="flex gap-10">
                <span>:</span> {candidate.dob}
              </span>
            </p>
            <p>
              <span>Language Known</span>{" "}
              <span className="flex gap-10">
                <span>:</span> {candidate.lang}
              </span>
            </p>
            <p>
              <span>Gender</span>{" "}
              <span className="flex gap-10">
                <span>:</span> {candidate.gender}
              </span>
            </p>
            <p>
              <span>Nationality</span>{" "}
              <span className="flex gap-10">
                <span>:</span> {candidate.nationality}
              </span>
            </p>
            <p>
              <span>Marital Status</span>
              <span className="flex gap-10">
                <span>:</span> {candidate.maritalStatus}
              </span>
            </p>
          </div>
        </div>

        <div className="mb-4 text-[1rem] font-medium [&>*:not(h3)]:mb-2">
          <h3 className="text-lg font-semibold sub-heading">Declaration</h3>
          <p>
            I hereby declare that the above information given by me is true to
            the best of my knowledge.
          </p>
          <p className="text-lg font-bold">Date: </p>
          <p className="flex justify-between text-lg">
            <span>Place: {candidate.state}</span> <span>{candidate.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Resume;
