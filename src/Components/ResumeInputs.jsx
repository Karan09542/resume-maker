import React, { useEffect, useId, useState } from "react";
import InputField from "./InputField";
import { get, set, useFieldArray, useForm } from "react-hook-form";
import validator from "email-validator";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  useChangeResumesObjsStore,
  useResumeIdStore,
  useResumeStore,
} from "../../Store/Resume";

function ResumeInputs() {
  const navigate = useNavigate();
  const setResume = useResumeStore((state) => state.setResume);
  const resume = useResumeStore((state) => state.resume);
  const setIsChangeResumesObjs = useChangeResumesObjsStore(
    (state) => state.setIsChangeResumesObjs
  );
  const resumeId = useResumeIdStore((state) => state.resumeId);
  const setResumeId = useResumeIdStore((state) => state.setResumeId);

  const {
    register,
    handleSubmit,
    getValues,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      heading: "RESUME",
    },
    values: resume,
  });
  const isSubmitted = () => {
    console.log("value", getValues());
    const isAnyFieldEmpty = Object.keys(getValues()).some((elem) => {
      if (
        elem !== "heading" &&
        elem !== "qualifications" &&
        elem !== "otherQualifications" &&
        elem !== "profile"
      )
        return getValues()[elem] === "";
    });

    if (isAnyFieldEmpty) {
      toast.error("Please fill all the fields");
      return false;
    } else {
      toast.success("Resume created successfully");
      return true;
    }
  };
  const onSubmit = async (data) => {
    if (!localStorage.getItem("resumesObjs")) {
      localStorage.setItem("resumesObjs", JSON.stringify({}));
    }
    const resuemId = `${data.name}-${Date.now()}`;
    let resumes = JSON.parse(localStorage.getItem("resumesObjs"));
    resumes[resuemId] = { ...data, heading: "RESUME" };

    localStorage.setItem("resumesObjs", JSON.stringify(resumes));

    // setResume(data);
    // navigate("/resume");

    setIsChangeResumesObjs();
  };

  const handleResumeUpdate = (resumeId) => {
    if (!localStorage.getItem("resumesObjs")) {
      localStorage.setItem("resumesObjs", JSON.stringify({}));
    }

    if (!resumeId) {
      toast.error("Please select a resume");
      return;
    }
    const resumes = JSON.parse(localStorage.getItem("resumesObjs"));
    delete resumes[resumeId];
    const newResuemId = `${getValues().name}-${Date.now()}`;
    resumes[newResuemId] = getValues();
    localStorage.setItem("resumesObjs", JSON.stringify(resumes));
    setIsChangeResumesObjs();
    setResumeId(null);
    toast.success("Resume updated successfully");
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "qualifications",
  });

  const {
    fields: fields2,
    append: append2,
    remove: remove2,
  } = useFieldArray({
    control,
    name: "otherQualifications",
  });

  const {
    fields: fields3,
    append: append3,
    remove: remove3,
  } = useFieldArray({
    control,
    name: "workExperiences",
  });

  const [isWide, setIsWide] = useState(true);

  // handle resize
  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth > 760);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (resume) {
      reset(resume);
    }
    // console.log(resume);
  }, [resume]);
  return (
    <div className="fixed w-screen h-full py-2 overflow-y-scroll bg-gray-50">
      <h1
        className={` font-serif text-4xl text-center ${
          isWide ? "mb-3" : "mb-10"
        }`}
      >
        Personal Details
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`mx-auto [&>div>input]:mb-3 [&>div>input]:outline-none px-4 ${
          isWide
            ? "grid max-w-[951px] max-[1375px]:w-[60%] max-[1140px]:w-[70%] max-[980px]:w-[80%] max-[850px]:w-[90%] max-[760px]:w-[100%] grid-cols-3 w-[50%] p-5 gap-x-4 items-center"
            : "max-w-96"
        }`}
      >
        <input type="text" register={register("heading")} hidden />
        <InputField
          register={register("name", {
            required: {
              value: true,
              message: "name is required",
            },
          })}
          field_name="Enter Your Name *"
          className={`rounded-lg px-3 outline-blue-500 ${isWide && "max-w-80"}`}
        />
        <InputField
          register={register("houseNo", {
            required: {
              value: true,
              message: "House No. is required",
            },
          })}
          field_name="House No *"
          className={`rounded-lg px-3 outline-blue-500 ${isWide && "max-w-80"}`}
        />
        <InputField
          register={register("landmark")}
          field_name="Landmark / Near by / Gali no."
          className={`rounded-lg px-3 outline-blue-500 ${isWide && "max-w-80"}`}
        />
        <InputField
          register={register("area", {
            required: {
              value: true,
              message: "House No. is required",
            },
          })}
          field_name="Area / Locality *"
          className={`rounded-lg px-3 outline-blue-500 ${isWide && "max-w-80"}`}
        />
        <InputField
          register={register("state", {
            required: {
              value: true,
              message: "state is required",
            },
          })}
          field_name="State *"
          className={`rounded-lg px-3 outline-blue-500 ${isWide && "max-w-80"}`}
          type="text"
        />
        <InputField
          register={register("city", {
            required: {
              value: true,
              message: "city is required",
            },
          })}
          field_name="City *"
          className={`rounded-lg px-3 outline-blue-500 ${isWide && "max-w-80"}`}
          type="text"
        />
        <InputField
          register={register("pincode", {
            required: {
              value: true,
              message: "pincode is required",
            },
          })}
          field_name="Pincode *"
          className={`rounded-lg px-3 outline-blue-500 ${isWide && "max-w-80"}`}
          type="number"
        />
        <InputField
          register={register("mobileNo", {
            required: {
              value: true,
              message: "Mobile No. is required",
            },
          })}
          field_name="Mobile No. *"
          className={`rounded-lg px-3 outline-blue-500 ${isWide && "max-w-80"}`}
          type="number"
        />
        <InputField
          register={register("profile")}
          field_name="What is your Profile ?"
          className={`rounded-lg px-3 outline-blue-500 ${isWide && "max-w-80"}`}
        />
        {/* Qualifications */}
        <div className={`${isWide && "col-span-3 max-w-96"}`}>
          <label className="block mb-2 text-lg text-purple-600">
            Accademic Qualifications
          </label>
          {fields.map((field, index) => (
            <div className="flex justify-between gap-2 mb-2" key={field.id}>
              <input
                {...register(`qualifications.${index}`)}
                className="p-2 border rounded-md focus:shadow-lg border-black/30 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 grow focus:border"
                placeholder={`10th Passed from CGBSE - ${index + 1}`}
              />
              <button
                onClick={() => remove(index)}
                className="px-2 py-1 text-white bg-red-500 rounded-md active:scale-95"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append("")}
            className="block px-2 py-1 bg-yellow-400 rounded-md active:scale-95 active:bg-yellow-500"
          >
            + Add
          </button>
        </div>
        <hr className={`my-3 ${isWide && "col-span-3"}`} />
        {/* Other Qualifications */}
        <div className={`${isWide && "col-span-3 max-w-96"}`}>
          <label className="block mb-2 text-lg text-purple-600">
            Other Qualifications
          </label>
          {fields2.map((field, index) => (
            <div className="flex justify-between gap-2 mb-2" key={field.id}>
              <input
                {...register(`otherQualifications.${index}`, {
                  required: {
                    value: true,
                    message: "at least one Qualification is required",
                  },
                })}
                className="p-2 border rounded-md grow focus:shadow-lg border-black/30 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                placeholder={`Basic Knowledge of Programming/OS - ${index + 1}`}
              />
              <button
                onClick={() => remove2(index)}
                className="px-2 py-1 text-white bg-red-500 rounded-md active:scale-95"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append2("")}
            className="block px-2 py-1 bg-yellow-400 rounded-md active:scale-95 active:bg-yellow-500"
          >
            + Add
          </button>
        </div>

        <hr className={`my-3 ${isWide && "col-span-3"}`} />

        {/* Work Experience */}
        <div className={`${isWide && "col-span-3 max-w-96"}`}>
          <label className="block mb-2 text-lg text-purple-600">
            Work Experience *
          </label>
          {fields3.length === 0 && (
            <div className="flex justify-between gap-2 mb-2">
              <input
                {...register(`workExperiences.${0}`)}
                className="p-2 border rounded-md grow focus:shadow-lg border-black/30 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                placeholder={`Work Experience - ${1}`}
              />
            </div>
          )}
          {fields3.map((field, index) => (
            <div className="flex justify-between gap-2 mb-2" key={field.id}>
              <input
                {...register(`workExperiences.${index}`)}
                className="p-2 border rounded-md grow border-stone-700 focus:border focus:outline-blue-500 outline-blue-500"
                placeholder={`Work Experience - ${index + 1}`}
              />
              {index > 0 && (
                <button
                  onClick={() => remove3(index)}
                  className="px-2 py-1 text-white bg-red-500 rounded-md active:scale-95"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => append3("")}
            className="block px-2 py-1 bg-yellow-400 rounded-md active:scale-95 active:bg-yellow-500"
          >
            + Add
          </button>
        </div>
        <hr className={`my-3 ${isWide && "col-span-3"}`} />
        {/* Gender */}
        <div>
          <label>Gender</label>
          <select
            {...register("gender", {
              required: {
                value: true,
                message: "Gender is required",
              },
            })}
            className="w-full px-2 py-2.5 my-3 border rounded-lg outline-none focus:ring-blue-300 focus:ring-4 border-black/30"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div
          className={` ${
            isWide
              ? "grid grid-cols-3 gap-3 col-span-3 max-w-[]"
              : "[&>div>input]:mb-3"
          }`}
        >
          <InputField
            register={register("fname", {
              required: {
                value: true,
                message: "Father's Name is required",
              },
            })}
            field_name="Father's Name *"
            className={`rounded-lg px-3 outline-none`}
          />

          <InputField
            register={register("email", {
              required: { value: true, message: "Email is required" },
              validate: (value) => validator.validate(value) || "Invalid Email",
            })}
            field_name="Email *"
            className={`rounded-lg px-3`}
            name="email"
            type="email"
            warning={errors.email ? true : false}
          />
          <InputField
            register={register("dob", {
              required: {
                value: true,
                message: "Date of Birth is required",
              },
            })}
            field_name="Date of Birth *"
            className={`rounded-lg px-3 outline-none`}
            name="dob"
          />
          <InputField
            field_name="Language known *"
            register={register("lang", {
              required: { value: true, message: "Language is required" },
            })}
            className={`rounded-lg px-3 outline-none`}
          />
          <InputField
            field_name="Nationality *"
            register={register("nationality", {
              required: { value: true, message: "Nationality is required" },
            })}
            className={`rounded-lg px-3 outline-none`}
          />
          <InputField
            field_name="Marital Status *"
            className={`rounded-lg px-3 `}
            register={register("maritalStatus", {
              required: {
                value: true,
                message: "Marital Status is required",
              },
            })}
          />
        </div>
        <div
          className={` ${
            isWide ? "flex items-center gap-5 mt-3" : "flex gap-5 items-center"
          }`}
        >
          <button
            className={`${
              isWide ? "px-2" : "px-3"
            } py-2 mt-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 active:scale-95`}
            type="submit"
            onClick={isSubmitted}
          >
            save
          </button>

          <button
            className={`${
              isWide ? "px-2" : "px-3"
            } py-2 mt-2 text-white bg-green-500 rounded-md hover:bg-green-600 active:scale-95`}
            type="button"
            onClick={() => handleResumeUpdate(resumeId)}
          >
            update
          </button>
          <button
            onClick={() => {
              const resetValues = Object.keys(resume).reduce((acc, key) => {
                if (Array.isArray(resume[key])) {
                  acc[key] = [];
                } else if (
                  typeof resume[key] === "object" &&
                  resume[key] !== null &&
                  !Array.isArray(resume[key])
                ) {
                  acc[key] = {};
                } else {
                  acc[key] = "";
                }
                return acc;
              }, {});

              setResume({ ...resetValues });
            }}
            type="button"
            className={`${
              isWide ? "px-2" : "px-3"
            } py-2 mt-2 text-white bg-rose-500 rounded-md hover:bg-rose-600 active:scale-95`}
          >
            reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResumeInputs;
