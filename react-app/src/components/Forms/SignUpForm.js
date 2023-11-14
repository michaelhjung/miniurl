import React, { useEffect } from "react";
import FormComponent from "./FormComponent";
import { useDispatch, useSelector } from "react-redux";
import { createUser, login } from "../../store/users";

function SignUpForm({ closeModal }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  // const error = useSelector(state =>  state.users.error)

  useEffect(() => {
    if (currentUser) {
      closeModal();
    }
  }, [currentUser, closeModal]);

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
      }
    } catch (error) {
      console.error(`Error when creating user and profile: ${error}`);
    }
  };

  return (
    <div>
      {/* {error && <div className="error">{error}</div>} */}
      <FormComponent
        formTitle="Sign Up"
        formData={formData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default SignUpForm;
