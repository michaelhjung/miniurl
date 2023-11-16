import React from "react";
import { LoginForm } from "../components/Forms/LoginForm";
import { BaseNav } from "../components/Nav/BaseNav";

export const LoginPage = () => {
  return (
    <>
      <BaseNav />
      <LoginForm />
    </>
  );
};
