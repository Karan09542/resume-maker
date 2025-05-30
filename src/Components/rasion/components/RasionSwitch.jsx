import React, { useState } from "react";

export default function RasionSwitch({placeholder, isOn, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-white">{isOn ? `On ${placeholder}`: `Off ${placeholder}`}</span>

      <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          isOn ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            isOn ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
