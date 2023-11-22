import React, { useState } from "react";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
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
        <div className="input-container" key={index}>
          <input
            type={field.type}
            name={field.name}
            value={values[field.name] || ""}
            onChange={handleChange}
            placeholder={field.placeholder || ""}
            className={
              index === 0
                ? "first-input"
                : index === formData.length - 1
                  ? "last-input"
                  : ""
            }
            autoFocus={index === 0 ? true : false}
          />
          <label htmlFor={field.name}>{field.placeholder}</label>
        </div>
      ))}
      <button
        className={
          submitButtonClasses ? `${submitButtonClasses} button` : "button mt-3"
        }
        type="submit"
      >
        {submitButtonText || "Submit"}
      </button>
    </form>
  );
};
