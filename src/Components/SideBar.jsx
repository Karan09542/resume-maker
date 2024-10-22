import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { GoDownload } from "react-icons/go";
import {
  useChangeResumesObjsStore,
  useResumeIdStore,
  useResumeStore,
} from "../../Store/Resume";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import PdfResume from "./react-pdf/PdfResume";
import { pdf } from "@react-pdf/renderer";

function SideBar() {
  const [resumesObjs, setResumesObjs] = useState({});
  const setResume = useResumeStore((state) => state.setResume);
  const isChangeResumesObjs = useChangeResumesObjsStore(
    (state) => state.isChangeResumesObjs
  );
  const setIsChangeResumesObjs = useChangeResumesObjsStore(
    (state) => state.setIsChangeResumesObjs
  );

  const setResumeId = useResumeIdStore((state) => state.setResumeId);

  useEffect(() => {
    const resumes = JSON.parse(localStorage.getItem("resumesObjs"));
    if (!resumes) {
      localStorage.setItem("resumesObjs", JSON.stringify({}));
    }
    setResumesObjs(resumes);
  }, [isChangeResumesObjs]);
  const handleEditResume = (key) => {
    const resume = resumesObjs[key];
    setResume({ ...resume, heading: "RESUME" });
    setResumeId(key);
  };
  const handleDeleteResume = (key) => {
    delete resumesObjs[key];
    localStorage.setItem("resumesObjs", JSON.stringify(resumesObjs));
    setIsChangeResumesObjs();
  };

  const handleDownloadResume = async (key) => {
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

  const [show, setShow] = useState(false);

  return (
    <>
      {!show ? (
        <IoReorderThreeOutline
          size={40}
          className={`absolute z-10 bg-white border  cursor-pointer left-2 top-2.5 text-rose-500 active:scale-95`}
          onClick={() => setShow(true)}
        />
      ) : (
        <div className="absolute z-10 w-1/4 bg-white min-w-[253px] rounded-lg shadow-lg top-10 left-10 max-w-80 border ">
          <div className="flex items-center px-5">
            <RxCross1
              onClick={() => setShow(false)}
              className="p-2 rounded-full cursor-pointer text-rose-500 hover:bg-stone-100 active:scale-95"
              size={36}
            />
            <h1 className="px-5 py-3 text-3xl font-semibold text-rose-500 ">
              Your CV
            </h1>
          </div>
          <hr />
          <div
            className="overflow-y-auto
scroll-width-thin max-h-[500px] px-5 py-3 bg-white divide-y-2 divide-gray-100"
          >
            {!resumesObjs || Object.keys(resumesObjs).length === 0 ? (
              <p className="text-center">No resumes found</p>
            ) : (
              Object?.keys(resumesObjs)
                ?.reverse()
                ?.map((key) => {
                  return (
                    <div
                      className="flex items-center justify-between gap-2 py-2 "
                      key={key}
                    >
                      <p
                        className="px-1 mb-2 font-serif break-all text-ellipsis rounded-lg hover:text-white hover:bg-rose-400 w-fit !max-w-[178px]"
                        title="show resume"
                      >
                        <Link to={`/pdf-resume/${key}`}>{key}</Link>
                      </p>
                      <div className="flex gap-3 scale-95">
                        <FaPencil
                          size={36}
                          className="p-2 text-orange-300 border rounded-lg shadow-lg cursor-pointer active:scale-95"
                          onClick={() => handleEditResume(key)}
                        />
                        <MdDelete
                          size={36}
                          className="p-2 border rounded-lg shadow-lg cursor-pointer text-rose-500 active:scale-95"
                          onClick={() => handleDeleteResume(key)}
                        />
                        <GoDownload
                          size={36}
                          className="p-2 border rounded-lg shadow-lg cursor-pointer text-rose-500 active:scale-95"
                          onClick={() => handleDownloadResume(key)}
                        />
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default SideBar;
