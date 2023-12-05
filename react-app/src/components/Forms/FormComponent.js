import React, { useState } from "react";
import { InputField } from "./InputField";

export const FormComponent = ({
  formTitle,
  formData,
  onSubmit,
  initialValues = {},
  formClasses,
  submitButtonClasses,
  submitButtonText,
}) => {
  const [values, setValues] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const isAnyRequiredInputEmpty = () => {
    return formData.some(
      (field) => field.required && !values[field.name]?.trim()?.length
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
    setValues(initialValues);
  };

  return (
    <form className={formClasses || ""} onSubmit={handleSubmit}>
      {formTitle && <h2>{formTitle}</h2>}
      {formData.map((field, index) => (
        <InputField
          formData={formData}
          key={index}
          type={field.type}
          name={field.name}
          value={values[field.name] || ""}
          onChange={handleChange}
          placeholder={field.placeholder}
          index={index}
          autoFocus={index === 0}
          required={Boolean(field.required)}
          showPassword={showPassword}
          handleTogglePassword={handleTogglePassword}
        />
      ))}
      <button
        className={
          submitButtonClasses ? `${submitButtonClasses} button` : "button mt-3"
        }
        type="submit"
        disabled={isAnyRequiredInputEmpty()}
      >
        {submitButtonText || "Submit"}
      </button>
    </form>
  );
};
