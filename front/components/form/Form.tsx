import React, { FormHTMLAttributes } from "react";
import Button from "../button/Button";

type FormTypes = FormHTMLAttributes<HTMLFormElement> & {
  submitLabel: string;
  isSubmitting?: boolean;
};

const Form: React.FC<FormTypes> = ({
  children,
  onSubmit,
  submitLabel = "Submit",
  isSubmitting
}) => {
  return (
    <form onSubmit={onSubmit}>
      {children}
      <Button type="submit" isLoading={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
};

export default Form;
