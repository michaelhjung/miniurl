import React, { useEffect } from "react";
import FormComponent from "./FormComponent";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/users";

function LoginForm({ closeModal }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  // const error = useSelector(state => state.users.error)

  useEffect(() => {
    if (currentUser) {
      closeModal();
    }
  }, [currentUser, closeModal]);

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
  };

  return (
    <div>
      {/* {error && <div className="error">{error}</div>} */}
      <FormComponent
        formTitle="Log In"
        formData={formData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default LoginForm;
