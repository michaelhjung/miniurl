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
          {field.type === "password" ? (
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name={field.name}
                value={values[field.name] || ""}
                onInput={handleChange}
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
              <button
                type="button"
                className="password-toggle-btn"
                onClick={handleTogglePassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          ) : (
            <>
              <input
                type={field.type}
                name={field.name}
                value={values[field.name] || ""}
                onInput={handleChange}
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
            </>
          )}
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
