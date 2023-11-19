import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavPrimary } from "../components/Nav/NavPrimary";
import { Footer } from "../components/Footer";
import { fetchAllUsersUrls } from "../store/urls";

export const Dashboard = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const usersURLs = useSelector((state) => state.urls.urls);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // TODO: create components to build out dashboard

  useEffect(() => {
    if (!currentUser) return navigate("/");

    dispatch(fetchAllUsersUrls());
  }, [currentUser, navigate, dispatch]);

  return (
    currentUser && (
      <div>
        <NavPrimary />

        <h1>This is the dashboard for a logged in user!</h1>

        <Footer />
      </div>
    )
  );
};
