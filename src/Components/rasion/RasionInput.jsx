import React from "react";
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
  } = useForm({
    defaultValues: rasionData,
  });

  const mapping = {
    mukhiya: "मुखिया",
    pati: "पिता/पति का नाम",
    jaati: "जाति संवर्ग",
    pata: "पता",
    familyCategory: "परिवार की श्रेणी",
    rasionStore: "संलग्न उचित मूल्य दुकान",
    cardType: "कार्ड का प्रकार",
  };
  function onSubmit(data) {
    console.log(data);
    setRasionData(data);
    toast.success("Rasion added successfully");
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

    {
      name: "pata",
      label: mapping.pata,
    },
    {
      name: "rasionStore",
      label: mapping.rasionStore,
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
      className="bg-gradient-to-t from-gray-900 to-gray-800 p-8"
    >
      <label htmlFor="scale" className="text-white text-2xl">
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
      />
      <form className="w-fit" onSubmit={handleSubmit(onSubmit)}>
        {/* reset button */}
        <div className="flex justify-between gap-3 mb-3">
          <button
            className="bg-rose-500 text-white px-4 py-2 rounded feeling-press"
            onClick={() => {
              reset();
              setRasionData({});
            }}
          >
            Reset
          </button>
          <RasionSwitch
            placeholder="Hint"
            isOn={isHint}
            onChange={() => setIsHint((prev) => !prev)}
          />
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
              <option value="प्राथमिकता परिवार">प्राथमिकता परिवार</option>
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
