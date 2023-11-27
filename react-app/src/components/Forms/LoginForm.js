import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormComponent } from "./FormComponent";
import { login } from "../../store/users";
import { useNavigate } from "react-router-dom";
import { isNoCurrentUserError } from "../../utils/errors";
import { toLowerCase } from "../../utils/strings";

export const LoginForm = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.users.error);
  const noCurrentUserError = isNoCurrentUserError(error);

  useEffect(() => {
    if (!currentUser) return;

    navigate("/dashboard");
  }, [currentUser, navigate]);

  const formData = [
    {
      label: "Email/Username",
      name: "emailOrUsername",
      type: "text",
      placeholder: "email or username",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "password",
    },
  ];

  const handleSubmit = async (values) => {
    let credentials = {
      emailOrUsername: toLowerCase(values.emailOrUsername),
      password: values.password,
    };
    dispatch(login(credentials));
  };

  const loginWithDemo = async (e) => {
    e.preventDefault();
    const demoCredentials = {
      emailOrUsername: "demouser",
      password: "hiremichaeljung",
    };
    dispatch(login(demoCredentials));
  };

  return (
    <div className="form-wrapper login-form-wrapper">
      {error && !noCurrentUserError && <div className="error">{error}</div>}
      <FormComponent
        formTitle="Log In"
        formData={formData}
        onSubmit={handleSubmit}
      />
      <p className="under-form-text">
        Don't have an account? Sign up <a href="/signup">here</a>.
      </p>
      <button className="button demo-login-button" onClick={loginWithDemo}>
        Login as a demo user
      </button>
    </div>
  );
};
