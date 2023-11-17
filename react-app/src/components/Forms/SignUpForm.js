import React from "react";
import { FormComponent } from "./FormComponent";
import { useDispatch } from "react-redux";
import { createUser, login } from "../../store/users";
import { useNavigate } from "react-router-dom";

export const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const error = useSelector(state =>  state.users.error)

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
    // {
    //   label: 'Profile Image',
    //   name: 'avatarURL',
    //   type: 'file',
    // },
  ];

  const handleSubmit = async (values) => {
    const userCredentials = {
      username: values.username,
      email: values.email,
      password: values.password,
      first_name: values.firstName,
      last_name: values.lastName,
      biography: values.biography,
    };

    try {
      // 1. Create user
      const userAction = await dispatch(createUser(userCredentials));
      if (userAction.type === "user/createUser/fulfilled") {
        // 2. Log the user in
        const loginCredentials = {
          email: values.email,
          password: values.password,
        };

        await dispatch(login(loginCredentials));
        navigate("/");
      }
    } catch (error) {
      console.error(`Error when creating user and profile: ${error}`);
    }
  };

  return (
    <div className="form-wrapper signup-form-wrapper">
      {/* {error && <div className="error">{error}</div>} */}
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
