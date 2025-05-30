import React, { useState } from "react";

const LabeledTextInput = ({
    register,
    label,
    type = "text",
    className,
    name
}) => {
  return (
    <div className={`relative w-[300px] ${className}`}>
      <input
        id={name}
        type={type}
        {...register}
        placeholder=" "
        required
        className="peer h-12 w-full border-2 border-white  px-2 pt-5 pb-1 text-sm placeholder-transparent focus:outline-none focus:border-blue-500"
      />
      <label
        htmlFor={name}
        className="absolute capitalize left-2 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
      >
        {label}
      </label>
    </div>
  );
};

export default LabeledTextInput;
