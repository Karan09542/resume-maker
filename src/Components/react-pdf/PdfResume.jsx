import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import React from "react";
import OpenSansSemibold from "../../assets/fonts/open-sans.semibold.ttf";
import OpenSansbold from "../../assets/fonts/open-sans.bold.ttf";
import OpenSansRegular from "../../assets/fonts/open-sans.regular.ttf";
import NotoSansRegular from "../../assets/noto/NotoSansDevanagari-Regular.ttf";
import NotoSansBold from "../../assets/noto/NotoSansDevanagari-Bold.ttf";
import NotoSansSemibold from "../../assets/noto/NotoSansDevanagari-SemiBold.ttf";

const PdfResume = ({ candidate, image }) => {
  if (image) {
    console.log(image);
  }
  Font.register({
    family: "Open Sans",
    fonts: [
      {
        src: OpenSansSemibold,
        fontWeight: "semibold",
      },
      {
        src: OpenSansbold,
        fontWeight: "bold",
      },
      {
        src: OpenSansRegular,
        fontWeight: "normal",
      },
    ],
  });
  Font.register({
    family: "Noto Sans",
    fonts: [
      { src: NotoSansRegular, fontWeight: "normal" },
      { src: NotoSansBold, fontWeight: "bold" },
      { src: NotoSansSemibold, fontWeight: "semibold" },
    ],
  });

  const styles = StyleSheet.create({
    page: {
      padding: "0px 24px",
      backgroundColor: "#ffffff",
      transform: "scale(0.95)",
      fontFamily: candidate?.bhasa === "hindi" ? "Noto Sans" : "Open Sans",
    },
    heading: {
      fontSize: 24,
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: 16,
    },

    name: {
      marginBottom: 4,
      textTransform: "uppercase",
      fontSize: 18,
      fontWeight: "bold",
    },
    profile: {
      marginBottom: 11,
      fontSize: 13,
      textTransform: "capitalize",
    },

    address: {
      fontWeight: "semibold",
      fontSize: 15,
      lineHeight: 1.5,
      marginBottom: 7,
    },

    subHeadingContainer: {
      fontSize: 13,
      margin: "2px 0",
    },
    subHeading: {
      paddingHorizontal: 8, // equivalent to `px-2`
      paddingVertical: 3, // equivalent to `py-1`
      fontSize: 16, // equivalent to `text-xl`
      textTransform: "uppercase", // equivalent to `uppercase`
      backgroundColor: "#E7E5E4", // equivalent to `bg-stone-200`
      marginBottom: 11,

      fontWeight: "bold",
    },
    listItem: {
      width: "90%",
      margin: "auto",
      lineHeight: 1.7,

      fontWeight: "semibold",
    },
    personalItems: {
      display: "flex",
      flexDirection: "row",
      columnGap: "5px",
      rowGap: "50px",
      lineHeight: 1.5,
      fontSize: 12,

      fontWeight: "semibold",
    },
    personalKeys: {
      width: "20%",

      fontWeight: "semibold",
    },
    personalValues: {
      width: "70%",
      display: "flex",
      flexDirection: "row",
      columnGap: "21px",
    },
    date: {
      fontWeight: "bold",
    },
    placeName: {
      display: "flex",
      flexDirection: "row",
      columnGap: "5px",

      fontWeight: "semibold",
      justifyContent: "space-between",
    },
    image: {
      position: "absolute",
      width: 100,
      right: 0,
      top: 30,
      padding: 3,
    },
  });

  return (
    <Document
      title={candidate?.bhasa === "hindi" ? "रेज्यूमे" : candidate?.heading}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <Text style={styles.heading}>
            {candidate?.bhasa === "hindi" ? "रेज्यूमे" : candidate?.heading}
          </Text>

          {image?.image && <Image style={styles.image} src={image?.image} />}

          <Text style={styles.name}>{candidate?.name}</Text>
          <Text style={styles.profile}>{candidate?.profile}</Text>

          <View style={styles.address}>
            <Text>
              {candidate?.houseNo}, {candidate?.landmark}
            </Text>
            <Text>
              {candidate?.area}, {candidate?.state} - {candidate?.pincode}
            </Text>
            <Text>
              {candidate?.bhasa === "hindi" ? "मोबाइल नं." : "Mob No."}{" "}
              {candidate?.mobileNo}
            </Text>
            <Text>
              {candidate?.bhasa === "hindi" ? "ईमेल" : "Email"}:{" "}
              <Text style={{ fontWeight: "semibold", fontFamily: "Open Sans" }}>
                {candidate?.email}
              </Text>
            </Text>
          </View>

          <View style={styles.subHeadingContainer}>
            <Text style={{ ...styles.subHeading, marginBottom: 0 }}>
              {candidate?.bhasa === "hindi"
                ? "करियर उद्देश्य"
                : "Career Objective"}
            </Text>
            <Text
              style={{
                ...styles.listItem,
                width: "100%",
                lineHeight: 0,
                margin: "10px 0",
              }}
            >
              {candidate?.bhasa === "hindi"
                ? candidate?.objective ||
                  "अपनी सर्वोत्तम क्षमता के साथ संगठन में योगदान देना और नई ऊंचाइयों को प्राप्त करने के लिए बातचीत के दौरान नए कौशल विकसित करना।"
                : candidate?.objective ||
                  "To make contribution in the organization with best of my ability and also to develop new skills during the interaction to achieve new heights."}
            </Text>
          </View>

          {candidate?.qualifications && (
            <View style={styles.subHeadingContainer}>
              <Text style={styles.subHeading}>
                {candidate?.bhasa === "hindi"
                  ? "शैक्षणिक योग्यता"
                  : "Academic Qualifications"}
              </Text>
              <View>
                {candidate?.qualifications.map((qualifi, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {qualifi}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {candidate?.otherQualifications && (
            <View style={styles.subHeadingContainer}>
              <Text style={styles.subHeading}>
                {candidate?.bhasa === "hindi"
                  ? "अन्य योग्यता"
                  : "Other Qualifications"}
              </Text>
              <View>
                {candidate?.otherQualifications.map((otherQualifi, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {otherQualifi}
                  </Text>
                ))}
              </View>
            </View>
          )}

          <View style={styles.subHeadingContainer}>
            <Text style={styles.subHeading}>
              {candidate?.bhasa === "hindi" ? "कार्य अनुभव" : "Work Experience"}
            </Text>
            {candidate?.workExperiences?.map((experience, index) => (
              <Text key={index} style={styles.listItem}>
                • {experience}
              </Text>
            ))}
          </View>

          <View style={styles.subHeadingContainer}>
            <Text style={styles.subHeading}>
              {candidate?.bhasa === "hindi"
                ? "व्यक्तिगत जानकारी"
                : "Personal Information"}
            </Text>
            <View style={styles.personal}>
              <View style={styles.personalItems}>
                <Text style={styles.personalKeys}>
                  {candidate?.bhasa === "hindi"
                    ? "पिता का नाम"
                    : "Father's Name"}
                </Text>
                <View style={styles.personalValues}>
                  <Text>:</Text> <Text>{candidate?.fname}</Text>
                </View>
              </View>
              <View style={styles.personalItems}>
                <Text style={styles.personalKeys}>
                  {candidate?.bhasa === "hindi"
                    ? "जन्म तारीख"
                    : "Date of Birth"}
                </Text>
                <View style={styles.personalValues}>
                  <Text>:</Text> <Text>{candidate?.dob}</Text>
                </View>
              </View>
              <View style={styles.personalItems}>
                <Text style={styles.personalKeys}>
                  {candidate?.bhasa === "hindi"
                    ? "भाषा ज्ञात"
                    : "Language Known"}
                </Text>
                <View style={styles.personalValues}>
                  <Text>:</Text> <Text>{candidate?.lang}</Text>
                </View>
              </View>
              <View style={styles.personalItems}>
                <Text style={styles.personalKeys}>
                  {candidate?.bhasa === "hindi" ? "लिंग" : "Gender"}
                </Text>
                <View style={styles.personalValues}>
                  <Text>:</Text> <Text>{candidate?.gender}</Text>
                </View>
              </View>
              <View style={styles.personalItems}>
                <Text style={styles.personalKeys}>
                  {candidate?.bhasa === "hindi" ? "राष्ट्रीयता" : "Nationality"}
                </Text>
                <View style={styles.personalValues}>
                  <Text>:</Text>
                  <Text>{candidate?.nationality}</Text>
                </View>
              </View>
              <View style={styles.personalItems}>
                <Text style={styles.personalKeys}>
                  {candidate?.bhasa === "hindi"
                    ? "वैवाहिक स्थिति"
                    : "Marital Status"}
                </Text>
                <View style={styles.personalValues}>
                  <Text>:</Text>
                  <Text>{candidate?.maritalStatus}</Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              ...styles.subHeadingContainer,
              lineHeight: 1.8,
              marginTop: 8,
            }}
          >
            <Text
              style={{ ...styles.subHeading, marginBottom: 10, lineHeight: 0 }}
            >
              {candidate?.bhasa === "hindi" ? "घोषणा" : "Declaration"}
            </Text>
            <Text>
              {candidate?.bhasa === "hindi"
                ? candidate?.declaration ||
                  "मैं एतद्द्वारा घोषणा करता हूं कि मेरे द्वारा दी गई उपरोक्त जानकारी मेरी सर्वोत्तम जानकारी के अनुसार सत्य है।"
                : candidate?.declaration ||
                  "I hereby declare that the above information given by me is true to the best of my knowledge."}
            </Text>
            <Text style={styles.date}>
              {candidate?.bhasa === "hindi" ? "दिनांक" : "Date"}:
            </Text>
            <View style={styles.placeName}>
              <Text>
                {candidate?.bhasa === "hindi" ? "स्थान" : "Place"}:{" "}
                {candidate?.state}
              </Text>
              <Text>{candidate?.name}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfResume;
