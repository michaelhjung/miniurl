import React from "react";
import { SignUpForm } from "../components/Forms/SignUpForm";
import { BaseNav } from "../components/Nav/BaseNav";

export const SignupPage = () => {
  return (
    <>
      <BaseNav />
      <SignUpForm />;
    </>
  );
};
