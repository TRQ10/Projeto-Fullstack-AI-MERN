import React from 'react';

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
  <div className='w-full'>
    <div className="mb-2">
      <label
        htmlFor={name}
        className="text-s font-medium text-white text-left"
      >
        {labelName}
      </label>
      {isSurpriseMe && (
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounded-[5px] text-black"
        >
          Surprise me
        </button>
      )}
    </div>
    <input
      type={type}
      id={name}
      name={name}
      className="bg-gray-50 border border-[#9d2053] text-gray-900 text-sm rounded-xl 
      focus:ring-[#6469ff] focus:border-[#6469ff] outline-none p-3 w-full"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

export default FormField;
