import React, { useState } from "react";

const Switch = ({ onClick }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className={`flex items-center cursor-pointer select-none`}>
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
            onClick={onClick}
          />
          <div
            className={`block h-8 w-14 rounded-full ${
              isChecked ? "bg-blue-500" : "bg-[#E5E7EB]"
            }`}
          ></div>
          <div
            className={`absolute w-6 h-6 transition-transform bg-white rounded-full dot left-1 top-1 ${
              isChecked ? "transform translate-x-6" : ""
            }`}
          ></div>
        </div>
        <div className="ml-3 text-sm font-medium uppercase text-blue-gray-900">
          {isChecked ? "hindi" : "english"}
        </div>
      </label>
    </>
  );
};

export default Switch;
