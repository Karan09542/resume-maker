import React from "react";
import { useRasionStore } from "../../../Store/Resume";

const RasionRight = ({ scale, A4size, isHint }) => {
  const rasionData = useRasionStore((state) => state.rasionData);
  const familyObj = {
    "परिवार के मुखिया का नाम": rasionData?.mukhiya
      ? rasionData?.mukhiya
      : !isHint
      ? "सरला सोनी"
      : "मुखिया का नाम",
    "पिता/पति का नाम": rasionData?.pati
      ? rasionData?.pati
      : !isHint
      ? "शकर लाल सोनी"
      : "पति का नाम",
    "जाति संवर्ग": rasionData?.jaati ? (
      rasionData?.jaati
    ) : !isHint ? (
      "सामान्य"
    ) : (
      <span className="text-green-500">
        जाति संवर्ग जैसे : <span className={`highlight-red`}>सामान्य</span>
      </span>
    ),
    पता: rasionData?.pata ? (
      <p>
        जिला - मनेन्द्रगढ़-चिरमिरी-भरतपुर,नगरीय <br /> निकाय - मनेन्द्रगढ़ <br />{" "}
        वार्ड - {rasionData?.pata.ward}
      </p>
    ) : !isHint ? (
      "जिला - बेमेतरा, विकासखंड - नवागढ़, ग्राम पंचायत - टेमरी, ग्राम - टेमरी"
    ) : (
      <span className="text-green-500">
        पता जैसे: <span className="highlight-red">1/7 सीतारामगली</span>
      </span>
    ),
    "परिवार की श्रेणी": rasionData?.familyCategory ? (
      rasionData?.familyCategory
    ) : !isHint ? (
      "सामान्य परिवार"
    ) : (
      <span className="text-green-500">
        परिवार की श्रेणी जैसे:{" "}
        <span className="highlight-red">सामान्य परिवार</span>
      </span>
    ),
    "संलग्न उचित मूल्य दुकान": rasionData?.rasionStore ? (
      <p>
        ग्राम पंचायत/वार्ड - {rasionData?.rasionStore.ward} <br /> दुकान क्रमांक
        - {rasionData?.rasionStore.id}
      </p>
    ) : !isHint ? (
      "ग्राम पंचायत/वार्ड - टेमरी, दुकान क्रमांक - 432012065"
    ) : (
      <span className="text-green-500">
        रासन दुकान का पता जैसे:{" "}
        <span className="highlight-red">
          ग्राम पंचायत/वार्ड - टेमरी, दुकान क्रमांक - 432012065
        </span>
      </span>
    ),
  };
  //   A4 paper size
  return (
    <div style={{ width: A4size }}>
      <div
        style={{ fontSize: `${16 * scale}px`, lineHeight: `${22 * scale}px` }}
        className="text-center font-bold"
      >
        <h1>
          <span>
            <span className="font-bold">राशनकार्ड क्रमांक</span> <span>:</span>
          </span>{" "}
          <span
            style={{ textIndent: `${21 * scale}px` }}
            className="font-bold inline-block"
          >
            {rasionData?.rasionCardNo ? (
              rasionData?.rasionCardNo
            ) : !isHint ? (
              "226507810206"
            ) : (
              <span className="font-bold text-red-500">राशनकार्ड क्रमांक</span>
            )}
          </span>
        </h1>
        <p
          style={{
            marginTop: `${25 * scale}px`,
            marginBottom: `${25 * scale}px`,
          }}
          className="font-bold underline"
        >
          छत्तीशगढ़ खाद्य एवं पोषण सुरक्षा अधिनियम 2012 एवं छत्तीशगढ़ सार्वजनिक
          वितरण प्राणाली {`(नियंत्रण)`} आदेश 2016 के अंतर्गत जारी राशनकार्ड
        </p>
        <p>नवीनीकृत राशनकार्ड</p>
      </div>
      <div className="relative">
        {/* photo */}
        <div
          style={{ top: `${-40 * scale}px`, fontSize: `${12 * scale}px` }}
          className="absolute right-10 w-[100px] aspect-[3/4] border-2 border-black font-normal text-center"
        >
          पासपोर्ट साइज़ का रंगीन फोटो लगायें
        </div>
        <table
          style={{
            marginTop: `${48 * scale}px`,
            fontSize: `${14 * scale}px`,
            lineHeight: `${20 * scale}px`,
          }}
          className="font-bold"
        >
          {/* ration details */}
          {Object.keys(familyObj).map((key, index) => (
            <tr
              key={key}
              style={{
                height: [2, 3].includes(index)
                  ? `${56 * scale}px`
                  : `${40 * scale}px`,
                lineHeight: [4].includes(index) ? `${45 * scale}px` : "unset",
              }}
              className={`align-top `}
            >
              <td
                style={{ marginRight: `${40 * scale}px` }}
                className="inline-block text-nowrap"
              >
                {index + 1}. {key}
              </td>
              <td className={`max-w-[260px]`}>
                <div className="flex gap-x-1">
                  <span>:</span> {familyObj[key]}
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
      {/* qr code kutumb*/}
      <div
        style={{ fontSize: `${14 * scale}px`, lineHeight: `${20 * scale}px` }}
        className="font-semibold"
      >
        <div
          style={{
            marginTop: `${8 * scale}px`,
            marginBottom: `${8 * scale}px`,
          }}
          className="max-w-[270px] text-center"
        >
          <img
            style={{
              width: `${140 * scale}px`,
              aspectRatio: "1/1",
              marginTop: `${20 * scale}px`,
            }}
            src="/qrcode.png"
            alt="QR Code"
          />
        </div>
        <p>{`(कृप्या क्यूआर कोड के ऊपर कुछ न लिखें/चिपकांए)
`}</p>
        <div style={{ marginTop: `${44 * scale}px` }}>
          <p className="text-center max-w-[320px] ml-auto">
            कलेक्टा द्वारा अधिकृत राशन कार्ड जारी करने वाले अधिकारी के हस्ताक्षर
            व सील
          </p>
          <p
            style={{ marginTop: `${24 * scale}px` }}
            className="text-center w-[90%] ml-auto"
          >
            नोट: राशनकार्ड अन्य किसी वैधानिक उपयोग तथा अन्य किसी शासकीय योजनाओं
            के लिये, पहचान/प्रमाण पत्र के तौर पर मान्य नहीं किया जावेगा।
          </p>
          <p
            style={{
              fontSize: `${16 * scale}px`,
              marginTop: `${18 * scale}px`,
            }}
            className="text-center w-[90%] ml-auto font-semibold"
          >
            {rasionData?.cardType || `एपीएल (सामान्य परिवार)`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RasionRight;
