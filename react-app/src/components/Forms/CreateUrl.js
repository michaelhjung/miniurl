import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormComponent } from "./FormComponent";
import { useNavigate } from "react-router-dom";
import { isNoCurrentUserError } from "../../utils/errors";
import { createUrl } from "../../store/urls";

export const CreateUrl = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.users.error);
  const noCurrentUserError = isNoCurrentUserError(error);

  useEffect(() => {
    if (!currentUser) return;

    return navigate("/dashboard");
  }, [currentUser, navigate]);

  const formData = [
    {
      label: "URL",
      name: "originalUrl",
      type: "text",
      placeholder: "URL",
    },
  ];

  const handleSubmit = async (values) => {
    let urlData = {
      userId: currentUser.id,
      originalUrl: values.originalUrl,
    };
    dispatch(createUrl(urlData));
  };

  return (
    <div className="form-wrapper login-form-wrapper">
      {error && !noCurrentUserError && <div className="error">{error}</div>}
      <FormComponent
        // formTitle="Shorten a URL"
        formData={formData}
        onSubmit={handleSubmit}
        formClasses="create-url-form"
        submitButtonClasses="create-url-form-submit-button ms-3"
        submitButtonText={
          <i className="fa-solid fa-down-left-and-up-right-to-center" />
        }
        // submitButtonText={<i className="fa-solid fa-plus" />}
      />
    </div>
  );
};
