import React from "react";

export const InputField = ({
  formData,
  type,
  name,
  value,
  onChange,
  placeholder,
  index,
  autoFocus,
  required,
  showPassword,
  handleTogglePassword,
}) => {
  const isPassword = type === "password";

  return (
    <div
      className={
        isPassword
          ? "password-input-wrapper input-container"
          : "input-container"
      }
    >
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || ""}
        className={
          index === 0
            ? "first-input"
            : index === formData.length - 1
              ? "last-input"
              : ""
        }
        autoFocus={autoFocus}
        required={required || false}
      />
      {isPassword ? (
        <>
          <label htmlFor={name} required={true}>
            {placeholder}
          </label>
          <button
            type="button"
            className="password-toggle-btn"
            onClick={handleTogglePassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </>
      ) : (
        <label htmlFor={name} required={required || false}>
          {placeholder}
        </label>
      )}
    </div>
  );
};
