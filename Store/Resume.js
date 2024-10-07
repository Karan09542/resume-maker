import {create} from "zustand"

export const useResumeStore = create((set)=>({
    resume: {
        heading: "RESUME",
        name: "",
        houseNo: null,
        landmark: "",
        area: "",
        state: "",
        pincode: null,
        mobileNo: null,
        profile: "",
        qualifications: [],
        otherQualifications: [],
        workExperiences: [],
        gender: "",
        fname: "",
        email: "",
        dob: "",
        lang: "",
        city: "",
        nationality: "",
        maritalStatus: ""
    },
//     resume: {
//     heading: "RESUME",
//     name: "Sambhu",
//     houseNo: 0,
//     landmark: "kashi",
//     area: "varanashi",
//     state: "Uttar Pradesh",
//     pincode: 212011,
//     mobileNo: "000000000",
//     profile: "Prabhu",
//     qualifications: [9,2,11],
//     otherQualifications: [123,321],
//     workExperiences: ["helper","cleaner"],
//     gender: "male",
//     fname: "om",
//     email: "sitaram@gmail.com",
//     dob: "0/0/0",
//     lang: "hindi",
//     nationality: "india",
//     maritalStatus: "unmarried",
//     bhasa: "hindi",
// },

    setResume: (data)=> set({resume: data})
}))


export const  useChangeResumesObjsStore = create((set)=>({
    isChangeResumesObjs: false,
    setIsChangeResumesObjs: ()=> set((state)=>({isChangeResumesObjs: !state.isChangeResumesObjs }))
}))

export const useResumeIdStore = create((set)=>({
    resumeId: null,
    setResumeId: (data)=> set({resumeId: data})
}))
