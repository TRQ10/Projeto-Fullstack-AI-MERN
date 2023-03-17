import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => (
  <div className="w-full">
    <div className="flex items-center gap-2 mb-2 indent-2 mt-[2rem]">
      <label htmlFor={name} className="block text-sm font-medium text-white">
        {labelName}
      </label>
      {isSurpriseMe && (
        <button
          type="button"
          onClick={handleSurpriseMe}
          className=" font-semibold text-xs bg-indigo-600 py-1 px-2 rounded-[5px] text-white hover:bg-[#8250e6]"
        >
          Me surpreenda!
        </button>
      )}
    </div>
    <input
      type={type}
      id={name}
      name={name}
      className="bg-gray-50 border-2 border-indigo-600 text-[#8544ff] text-sm rounded-lg outline-none block w-full p-3"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

export default FormField;
