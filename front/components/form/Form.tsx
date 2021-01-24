import React, { FormHTMLAttributes } from "react";

type FormTypes = FormHTMLAttributes<HTMLFormElement> & {
  submitLabel: string;
};

const Form: React.FC<FormTypes> = ({
  children,
  onSubmit,
  submitLabel = "Submit"
}) => {
  return (
    <form onSubmit={onSubmit}>
      {children}
      <button
        className="w-full py-2 uppercase font-bold rounded-md bg-indigo-700"
        type="submit"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default Form;
