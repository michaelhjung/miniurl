import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormComponent } from "./FormComponent";
import { createUser, login } from "../../store/users";
import { useNavigate } from "react-router-dom";
import { isNoCurrentUserError } from "../../utils/errors";

export const SignUpForm = () => {
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
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "email",
    },
    {
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "username",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "password",
    },
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      placeholder: "first name",
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      placeholder: "last name",
    },
  ];

  const handleSubmit = async (values) => {
    const userCredentials = {
      email: values.email,
      username: values.username,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    };

    try {
      // 1. Create user
      const userAction = await dispatch(createUser(userCredentials));
      if (userAction.type === "user/createUser/fulfilled") {
        // 2. Log the user in
        const loginCredentials = {
          emailOrUsername: values.email,
          password: values.password,
        };

        dispatch(login(loginCredentials));
      }
    } catch (error) {
      console.error(`Error when creating user and profile: ${error}`);
    }
  };

  return (
    <div className="form-wrapper signup-form-wrapper">
      {error && !noCurrentUserError && <div className="error">{error}</div>}
      <FormComponent
        formTitle="Sign Up"
        formData={formData}
        onSubmit={handleSubmit}
      />
      <p>
        Already have an account? Log in <a href="/login">here</a>.
      </p>
    </div>
  );
};
