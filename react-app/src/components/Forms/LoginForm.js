import React from "react";
import { FormComponent } from "./FormComponent";
import { useDispatch } from "react-redux";
import { login } from "../../store/users";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const error = useSelector(state => state.users.error)

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
      emailOrUsername: values.emailOrUsername,
      password: values.password,
    };

    dispatch(login(credentials));
    navigate("/");
  };

  return (
    <div className="form-wrapper login-form-wrapper">
      {/* {error && <div className="error">{error}</div>} */}
      <FormComponent
        formTitle="Log In"
        formData={formData}
        onSubmit={handleSubmit}
      />
      <p>
        Don't have an account? Sign up <a href="/signup">here</a>.
      </p>
    </div>
  );
};
