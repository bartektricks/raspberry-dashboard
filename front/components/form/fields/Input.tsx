import React, { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  error?: string;
};

const Input: React.FC<InputProps> = ({
  name,
  label,
  type = "text",
  error,
  ...props
}) => {
  return (
    <div className="rounded-lg pb-6">
      <label className="uppercase font-medium text-xs" htmlFor={name}>
        {label}
      </label>
      <input
        {...props}
        className="block w-full pt-1 pb-2 bg-transparent text-lg border-b-2 focus:border-indigo-600 transition-all outline-none"
        type={type}
        id={name}
        name={name}
      />
      {error && <div className="text-pink-600 pt-2">{error}</div>}
    </div>
  );
};

export default Input;
