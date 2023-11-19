import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./store/users";
import { ModalProvider } from "./context/ModalContext";
import { Landing } from "./pages/Landing";
import { LoginPage } from "./pages/Login";
import { SignupPage } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Router>
      <ModalProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </ModalProvider>
    </Router>
  );
};
