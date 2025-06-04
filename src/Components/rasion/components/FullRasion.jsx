import React from "react";
import { useRasionStore } from "../../../../Store/Resume";

const FullRasion = () => {
  const rasionData = useRasionStore((state) => state.rasionData);
  const familyMembers = rasionData?.familyMembers || [];
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="select-none shree-dev">
      <style jsx>
        {`
          page {
            background: white;
            display: block;
            /*margin: 0 auto;
            margin-bottom: 0.5cm;
            box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);*/
          }

          page[size="A4"] {
            width: 21cm;
            height: 29.7cm;
          }

          page[size="A4"][layout="landscape"] {
            /*width: 29.7cm;
                    height: 21cm;*/
            width: 30.7cm;
            height: 21.4cm;
          }

          /*NOTE: change page and body height and width both*/

          body {
            margin: 0;
            width: 30.7cm !important;
            height: 21.4cm !important;
            overflow-x: hidden;
            overflow-y: hidden;
          }

          page[size="A3"] {
            width: 29.7cm;
            height: 42cm;
          }

          page[size="A3"][layout="landscape"] {
            width: 42cm;
            height: 29.7cm;
          }

          page[size="A5"] {
            width: 14.8cm;
            height: 21cm;
          }

          page[size="A5"][layout="landscape"] {
            width: 21cm;
            /*height: 14.8cm;*/
            height: 13cm;
          }

          @media print {
            body,
            page {
              background: white;
              /*margin: 0% !important;*/
              margin-left: 5%;
              box-shadow: 0;
              padding: 0 !important;
              -webkit-print-color-adjust: exact;
            }

            @page {
              size: A4 landscape;
            }
          }

          body {
            /*font-family: SHREE-DEV-OTF-0709_q_2;*/
          }

          table {
            border-collapse: collapse;
            text-align: center;
          }

          thead {
            border-bottom: 1px solid black;
          }

          th,
          td {
            padding: 15px;
          }

          /*@media print{
            @page {
                size:A4 landscape;
                
            }

            body {
                background-color: white !important;
                margin: 0;
                box-shadow: 0;
            }
        }*/
          .user-select-none {
            user-select: none;
          }

          h5 {
            font-size: 0.92em;
            font-weight: bold;
          }

          .displayflex {
            display: flex;
          }

          .widthTag {
            width: 48%;
          }
          .widthTagContent {
            width: 52%;
          }

          .widthTag2 {
            width: 36%;
          }
          .widthTagContent2 {
            width: 52%;
          }
        `}
      </style>
      <form method="post" id="form1">
        <div id="PrintableArea">
          <div style={{ width: "110%", height: "83%", display: "flex" }}>
            <div style={{ width: "50%" }}>
              <h4
                id="memberTitle"
                style={{
                  marginLeft: "20%",
                  marginRight: "40%",
                  padding: "0.7rem",
                  borderRadius: "5px",
                  backgroundColor: "darkgray",
                }}
              >
                परिवार के सदस्यों का विवरण
              </h4>

              <table>
                <thead>
                  <tr>
                    <th>स.क्र.</th>
                    <th>नाम</th>
                    <th>लिंग</th>
                    <th>उम्र</th>
                    <th>मुखिया से संबंध</th>
                  </tr>
                </thead>
                <tbody>
                  {familyMembers.map((member, index) => (
                    <tr
                      key={member.name + index}                    >
                      <td>{index + 1}</td>
                      <td>{member.name}</td>
                      <td>{member.gender}</td>
                      <td>{member.age}</td>
                      <td>{member.relation}</td>
                    </tr>
                  ))}
                  {/* <tr>
                  <td>1</td>
                  <td>कामीनी मौर्य</td>
                  <td>महिला</td>
                  <td>34</td>
                  <td>स्वयं</td>
                </tr> */}
                </tbody>
              </table>
            </div>

            <div style={{ width: "10%" }}></div>

            <div style={{ width: "50%" }}>
              <div style={{ width: "100%" }}>
                <h4 style={{ textAlign: "end", marginRight: "17%" }}>
                  राशनकार्ड क्रमांक: &nbsp; &nbsp;
                  <span id="LabelRCnumber">227601052241</span>
                </h4>

                <h4 style={{ textAlign: "center" }}>
                  <span style={{ borderBottom: "1px solid black" }}>
                    छत्तीसगढ़ खाद्य एवं पोषण सुरक्षा अधिनियम 2012 एवं छत्तीसगढ़
                    सार्वजनिक वितरण
                  </span>
                  <br />
                  <span style={{ borderBottom: "1px solid black" }}>
                    प्राणाली (नियंत्रण) आदेश 2016 के अंतर्गत जारी राशनकार्ड
                  </span>
                </h4>

                <h4 style={{ textAlign: "center" }}>नवीनीकृत राशनकार्ड</h4>

                <div style={{ marginLeft: "5%" }}>
                  <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ width: "75%" }}>
                      <h5 className="displayflex">
                        <span className="widthTag">
                          1. परिवार के मुखिया का नाम{" "}
                        </span>
                        <span className="widthTagContent">
                          :{" "}
                          <span id="LabelMukhiyaName">
                            {rasionData?.mukhiya || "MukhiyaName"}
                          </span>
                        </span>
                      </h5>

                      <h5 className="displayflex">
                        <span className="widthTag">2. पिता/पति का नाम </span>
                        <span className="widthTagContent">
                          :{" "}
                          <span id="LabelFatherOrHusbandName">
                            {rasionData?.pati || "PatiName"}
                          </span>
                        </span>
                      </h5>

                      <h5 className="displayflex">
                        <span className="widthTag">3. जाति संवर्ग </span>
                        <span className="widthTagContent">
                          :{" "}
                          <span id="LabelCategoryCast">
                            {rasionData?.jaati || "अन्य पिछड़ा वर्ग"}
                          </span>
                        </span>
                      </h5>
                    </div>

                    <div
                      style={{
                        width: "25%",
                        border: "2px solid black",
                        textAlign: "center",
                        marginRight: "-20px",
                      }}
                    >
                      <span id="LabelImagePlace">
                        <span>पासपोर्ट साइज़ का</span>
                        <br />
                        <span>रंगीन फोटो</span>
                        <br />
                        <span>लगायें</span>
                      </span>
                    </div>
                  </div>

                  <h5 className="displayflex">
                    <span className="widthTag2">4. पता </span>
                    <span className="widthTagContent2">
                      :
                      <span>
                        <span id="LabelAddressDistrict">
                          {" "}
                          जिला -मनेन्द्रगढ़-चिरमिरी-भरतपुर
                        </span>
                        <span id="LabelAddressBlock">
                          , नगरीय निकाय -मनेन्द्रगढ़
                        </span>
                        <br />
                        <span id="LabelMemberWard">
                          वार्ड -{rasionData?.pata?.ward || "सीताराम वार्ड"}
                        </span>
                      </span>
                    </span>
                  </h5>

                  <h5 className="displayflex">
                    <span className="widthTag2">5. परिवार की श्रेणी </span>
                    <span className="widthTagContent2">
                      : <span id="LabelFamilyType">अन्‍त्‍योदय कार्ड</span>
                    </span>
                  </h5>

                  <h5 className="displayflex">
                    <span className="widthTag2">
                      6. संलग्न उचित मूल्य दुकान{" "}
                    </span>
                    <span className="widthTagContent2">
                      :
                      <span>
                        <span id="LabelShopAddress">
                          {" "}
                          ग्राम पंचायत/वार्ड -
                          {rasionData?.rasionStore?.ward || "सीताराम वार्ड"}
                        </span>
                        <br />
                        दुकान क्रमांक -{" "}
                        <span id="LabelShopNumber">
                          {rasionData?.rasionStore?.id || "010101010"}
                        </span>
                      </span>
                    </span>
                  </h5>

                  <img
                    id="ImageQR"
                    src="download.png"
                    alt="QR Code"
                    style={{
                      width: "150px",
                      height: "150px",
                      marginLeft: "12%",
                    }}
                  />

                  <h5 style={{ marginTop: 0 }}>
                    (कृपया क्यूआर कोड के ऊपर कुछ न लिखें / चिपकाएं)
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <footer
            style={{
              width: "110%",
              height: "17%",
              display: "flex",
              paddingRight: "8%",
            }}
          >
            <div style={{ width: "50%", textAlign: "end" }}>
              <h4 style={{ marginRight: "5%" }}>
                परिवार के मुखिया का हस्ताक्षर / अंगुठे का निशान
              </h4>
              <br />

              <h5 id="signUrban" style={{ marginRight: "5%" }}>
                <span>{rasionData?.signatureOf?.split(",")[0]}</span>
                <br />
                <span>{rasionData?.signatureOf?.split(",")[1]}</span>
              </h5>
            </div>

            <div style={{ width: "10%" }}></div>

            <div style={{ width: "50%", textAlign: "end", marginLeft: "5%" }}>
              <h5 style={{ marginRight: "5%", marginTop: "4.5%" }}>
                <span>कलेक्टर द्वारा अधिकृत राशनकार्ड जारी करने वाले</span>
                <br />
                <span>
                  अधिकारी के हस्ताक्षर व सील &nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              </h5>

              <h5
                style={{
                  textAlign: "center",
                  fontWeight: "bolder",
                  marginLeft: "10%",
                }}
              >
                नोट: राशनकार्ड अन्य किसी वैधानिक उपयोग तथा अन्य किसी शासकीय
                योजनाओ
                <br />
                के लिये, पहचान/प्रमाण पत्र के तौर पर मान्य नहीं किया जावेगा |
              </h5>

              <h3 style={{ textAlign: "center" }}>
                <span id="LabelCardType">अन्‍त्‍योदय कार्ड</span>
              </h3>
            </div>
          </footer>
        </div>
      </form>
    </div>
  );
};

export default FullRasion;
