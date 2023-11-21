import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavPrimary } from "../components/Nav/NavPrimary";
import { Footer } from "../components/Footer";
import { fetchAllUsersUrls } from "../store/urls";
import { CreateUrl } from "../components/Forms/CreateUrl";
import { UserUrlsTable } from "../components/UserUrlsTable";

export const Dashboard = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const userUrls = useSelector((state) => state.urls.urls);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) return navigate("/");

    dispatch(fetchAllUsersUrls(currentUser.id));
  }, [currentUser, navigate, dispatch]);

  return (
    currentUser && (
      <div>
        <NavPrimary currentUser={currentUser} />

        <h1>Welcome back, {currentUser.firstName}</h1>

        <div className="dashboard-actions">
          Reserved Space for Dashboard Actions
        </div>

        <CreateUrl />

        <UserUrlsTable data={userUrls} />

        <Footer />
      </div>
    )
  );
};
