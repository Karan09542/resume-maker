import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import LabeledTextInput from "./components/LabeledTextInput";
import { toast } from "react-toastify";
import { useRasionStore } from "../../../Store/Resume";
import useOutsideClose from "../../hooks/useOutsideClose";
import RasionSwitch from "./components/RasionSwitch";

const RasionInput = ({
  setIsRasionInputOpen,
  isHint,
  setIsHint,
  scale,
  setScale,
}) => {
  const rasionData = useRasionStore((state) => state.rasionData);
  const setRasionData = useRasionStore((state) => state.setRasionData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm({
    defaultValues: rasionData,
  });

  // const watchFamilyMembers = watch("familyMembers");
  const watchForm = watch();

  const mapping = {
    mukhiya: "मुखिया",
    pati: "पिता/पति का नाम",
    jaati: "जाति संवर्ग",
    pata: "पता",
    familyCategory: "परिवार की श्रेणी",
    rasionStore: "संलग्न उचित मूल्य दुकान",
    cardType: "कार्ड का प्रकार",
    storeWard: "दुकान वर्ड",
    storeId: "दुकान क्रमांक",
    pataWard: "पता वर्ड",
    pataId: "पता क्रमांक",
  };
  function onSubmit(data) {
    setRasionData(data);
    setIsRasionInputOpen(false);
  }

  const inputList = [
    {
      name: "rasionCardNo",
      label: "रासन कार्ड नंबर",
    },
    {
      name: "mukhiya",
      label: mapping.mukhiya,
    },
    {
      name: "pati",
      label: mapping.pati,
    },
  ];

  const memberErrorMessage = {
    name: `श्रीमान/मति का नाम दर्ज करें`,
    age: `उम्र श्रीमान/मति का क्या हैं`,
    relation: `मुखिया से संबंध श्रीमान/मति का क्या हैं`,
    gender: `लिंग श्रीमान/मति का क्या हैं`,
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "familyMembers",
  });

  const formContainerRef = React.useRef(null);
  useOutsideClose({
    setState: setIsRasionInputOpen,
    reference: formContainerRef,
    arg: false,
  });

  return (
    <div
      ref={formContainerRef}
      style={{ maxHeight: "98vh", overflowY: "auto" }}
      className="max-h-[98vh] modern-scrollbar overflow-y-auto bg-gradient-to-t from-gray-900 to-gray-800 p-8"
    >
      <style jsx>
        {`
          /* General form styling */
          .custom-form {
            background-color: #1e293b; /* Dark background, adjust as needed */
            color: #f8fafc;
            padding: 1.5rem;
            border-radius: 0.5rem;
            -width: fit-content;
            margin: 0 auto;
          }

          /* Reset button */
          .bg-rose-500 {
            background-color: #f43f5e;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .bg-rose-500:hover {
            background-color: #e11d48;
          }

          /* Input grid */
          .grid-cols-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
            width: fit-content;
          }
          .w-fit {
            width: fit-content;
          }

          /* Input fields */
          .my-3 {
            margin-top: 0.75rem;
            margin-bottom: 0.75rem;
          }
          .mb-3 {
            margin-bottom: 0.75rem;
          }
          .mb-2 {
            margin-bottom: 0.5rem;
          }
          .mt-6 {
            margin-top: 1.5rem;
          }
          .gap-2 {
            gap: 0.5rem;
          }
          .gap-3 {
            gap: 0.75rem;
          }

          /* Input and select styling */
          .border {
            border: 1px solid #64748b;
            border-radius: 0.25rem;
          }
          .px-2 {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
          .py-1 {
            padding-top: 0.25rem;
            padding-bottom: 0.25rem;
          }
          .px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .py-2 {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }
          .outline-none {
            outline: none;
          }
          .text-white {
            color: #ffffff;
          }
          .text-2xl {
            font-size: 1.5rem;
            line-height: 2rem;
          }
          .text-rose-500 {
            color: #f43f5e;
          }
          .text-yellow-500 {
            color: #eab308;
          }
          .text-sm {
            font-size: 0.875rem;
            line-height: 1.25rem;
          }
          .font-bold {
            font-weight: 700;
          }
          .text-red-500 {
            color: #ef4444;
          }

          /* Member card styling */
          .flex {
            display: flex;
          }
          .flex-col {
            flex-direction: column;
          }
          .items-center {
            align-items: center;
          }
          .justify-between {
            justify-content: space-between;
          }
          .gap-x-2 {
            column-gap: 0.5rem;
          }
          .p-2 {
            padding: 0.5rem;
          }
          .rounded {
            border-radius: 0.25rem;
          }

          /* Member remove button */
          .text-red-600 {
            color: #dc2626;
          }
          .border-red-600 {
            border-color: #dc2626;
          }
          .w-fit {
            width: fit-content;
          }
          .mt-1 {
            margin-top: 0.25rem;
          }

          /* Submit and add member buttons */
          .bg-blue-500 {
            background-color: #3b82f6;
            color: white;
            padding: 0.25rem 1rem;
            border-radius: 0.25rem;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .bg-blue-500:hover {
            background-color: #2563eb;
          }
          .bg-green-700 {
            background-color: #15803d;
            color: white;
            padding: 0.25rem 1rem;
            border-radius: 0.25rem;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .bg-green-700:hover {
            background-color: #166534;
          }

          /* Error message */
          .text-red-500 {
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
          }

          /* Custom utility for select dropdown */
          select.border {
            background-color: #f8fafc;
            color: #1e293b;
          }
        `}
      </style>
      {/* <label htmlFor="scale" className="text-white text-2xl">
        Rasion Scale up/down
      </label>
      <input
        id="scale"
        type="range"
        value={scale}
        onChange={(e) => setScale(+e.target.value)}
        min="0"
        max="1"
        step={"0.01"}
        className="w-full"
      /> */}
      <form className="w-fit custom-form" onSubmit={handleSubmit(onSubmit)}>
        {/* reset button */}
        <div className="flex justify-between gap-3 mb-3">
          <button
            type="reset"
            className="bg-rose-500 text-white px-4 py-2 rounded feeling-press"
            onClick={() => {
              reset();
              setRasionData({});
            }}
          >
            Reset
          </button>
          {/* <RasionSwitch
            placeholder="Hint"
            isOn={isHint}
            onChange={() => setIsHint((prev) => !prev)}
          /> */}
        </div>
        {/* input fields */}
        <div className="grid grid-cols-2 w-fit gap-2">
          {inputList.map((input, index) => (
            <div>
              <LabeledTextInput
                {...input}
                className={`my-3`}
                register={register(input.name, {
                  required: `${input.label} अनिवार्य हैं`,
                  validate: (value) => {
                    if (input.name === "rasionCardNo") {
                      const rasionNo = value.trim();
                      if (isNaN(rasionNo))
                        return `कार्ड नंबर 12 अंक नंबर का होना चाहियें`;
                      if (rasionNo.length > 12)
                        return `${input.label} 12 अंक से अधिक हैं`;
                      if (rasionNo.length < 12)
                        return `${input.label} 12 अंक से कम हैं`;
                      return rasionNo.length === 12;
                    }
                    return value.trim() !== "" || `${input.label} अनिवार्य हैं`;
                  },
                })}
                key={index}
              />
              {errors[input.name] && (
                <p className="text-red-500">{errors[input.name].message}</p>
              )}
            </div>
          ))}
        </div>
        {/* pata */}
        <div>
          <h2 className="text-white text-2xl mb-3">{mapping.pata}</h2>
          <LabeledTextInput
            register={register("pata.ward")}
            label={mapping.pataWard}
          />
        </div>
        {/* store */}
        <div>
          <h2 className="text-white text-2xl mb-3">{mapping.rasionStore}</h2>
          <div className="grid grid-cols-2 [&>*]:w-full gap-2 mb-3">
            <LabeledTextInput
              register={register("rasionStore.ward")}
              label={mapping.storeWard}
            />
            <LabeledTextInput
              register={register("rasionStore.id")}
              label={mapping.storeId}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 w-fit gap-2">
          <div className="flex flex-col border">
            <label className="px-1 py-1 text-sm text-yellow-500">
              {mapping.jaati}
            </label>
            <select
              {...register(`jaati`, {
                value: "सामान्य",
              })}
              className="border px-2 py-1 outline-none"
            >
              <option value="सामान्य">सामान्य</option>
              <option value="अन्य पिछड़ा वर्ग">अन्य पिछड़ा वर्ग</option>
            </select>
          </div>

          <div className="flex flex-col border">
            <label className="px-1 py-1 text-sm text-yellow-500">
              {mapping.familyCategory}
            </label>
            <select
              {...register(`familyCategory`, {
                value: "सामान्य परिवार",
              })}
              className="border px-2 py-1 outline-none"
            >
              <option value="सामान्य परिवार">सामान्य परिवार</option>
              <option value="प्राथमिकता कार्ड">प्राथमिकता कार्ड</option>
              <option value="अन्‍त्‍योदय कार्ड">अन्‍त्‍योदय कार्ड</option>
            </select>
          </div>
          <div className="flex flex-col border">
            <label className="px-1 py-1 text-sm text-yellow-500">
              {mapping.cardType}
            </label>
            <select
              {...register(`cardType`, {
                value: "एपीएल (सामान्य परिवार)",
              })}
              className="border px-2 py-1 outline-none"
            >
              <option value="एपीएल (सामान्य परिवार)">
                एपीएल (सामान्य परिवार)
              </option>
              <option value="प्राथमिकता कार्ड">प्राथमिकता कार्ड</option>
              <option value="अन्‍त्‍योदय कार्ड">अन्‍त्‍योदय कार्ड</option>
            </select>
          </div>

          <div className="flex flex-col border">
            <label className="px-1 py-1 text-sm text-yellow-500">
              कौन से अधिकारी के हस्ताक्षर
            </label>
            <select
              {...register(`signatureOf`, {
                required: memberErrorMessage.gender,
                value: "सरपंच के हस्ताक्षर",
              })}
              className="border px-2 py-1 outline-none"
            >
              <option value="सरपंच के हस्ताक्षर">सरपंच के हस्ताक्षर</option>
              <option
                value="कलेक्टर द्वारा अधिकृत, अधिकारी के हस्ताक्षर
"
              >
                कलेक्टर द्वारा अधिकृत अधिकारी के हस्ताक्षर
              </option>
            </select>
          </div>
        </div>

        {/* family members */}
        <div className="text-2xl font-bold text-rose-500 mt-6 mb-2">
          सदस्यों के नाम
        </div>
        <div className="w-fit [&>*]:mb-2">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col border p-2 rounded [&>*]:mb-2"
            >
              <LabeledTextInput
                register={register(`familyMembers.${index}.name`, {
                  required: memberErrorMessage.name,
                  validate: (value) =>
                    value.trim() !== "" || memberErrorMessage.name,
                })}
                name={`familyMembers.${index}.name`}
                label="नाम"
              />
              <LabeledTextInput
                register={register(`familyMembers.${index}.age`, {
                  required: memberErrorMessage.age,
                  validate: (value) =>
                    value.trim() !== "" || memberErrorMessage.age,
                })}
                type="number"
                name={`familyMembers.${index}.age`}
                label="उम्र"
              />
              <LabeledTextInput
                register={register(`familyMembers.${index}.relation`, {
                  required: memberErrorMessage.relation,
                  validate: (value) =>
                    value.trim() !== "" || memberErrorMessage.relation,
                })}
                name={`familyMembers.${index}.relation`}
                label="मुखिया से संबंध ? जैसे पुत्र, पत्नी, स्वयं आदि"
              />

              <div className="flex flex-col border">
                <label className="px-1 text-yellow-500">लिंग</label>
                <select
                  {...register(`familyMembers.${index}.gender`, {
                    required: memberErrorMessage.gender,
                    value: "पुरुष",
                  })}
                  className="border px-2 py-1 outline-none"
                >
                  <option value="पुरुष">पुरुष</option>
                  <option value="महिला">महिला</option>
                  <option value="अन्य">अन्य</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 text-sm col-span-4 underline mt-1 border border-red-600 w-fit p-2"
              >
                सदस्य हटाएँ
              </button>
            </div>
          ))}

          <div className="flex items-center gap-x-2">
            <button
              type="button"
              onClick={() =>
                append({ name: "", age: "", gender: "", relation: "" })
              }
              className="bg-green-700 text-white px-4 py-1 rounded feeling-press"
            >
              + सदस्य जोड़ें
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded feeling-press"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RasionInput;
