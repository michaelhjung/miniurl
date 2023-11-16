import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../context/ModalContext";
import { login, logout } from "../store/users";
import { ProfileMenuButton } from "./ProfileMenuButton";
import { LoginForm } from "./Forms/LoginForm";
import { SignUpForm } from "./Forms/SignUpForm";
import Icon from "@mdi/react";
import { mdiMenu, mdiAccountCircle } from "@mdi/js";

// TODO: delete after creating new NavPrimary component

export const ProfileButton = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { openModal, closeModal } = useModal();
  const profileButtonRef = useRef(null);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };
  const closeProfileMenu = () => setShowMenu(false);

  const handleLoginClick = (e) => {
    e.stopPropagation();
    openModal(<LoginForm closeModal={closeModal} />);
  };

  const handleSignupClick = (e) => {
    e.stopPropagation();
    openModal(<SignUpForm closeModal={closeModal} />);
  };

  const handleLogoutClick = (e) => {
    e.stopPropagation();
    dispatch(logout());
    window.location = "/";
  };

  const handleDemoUserClick = (e) => {
    e.stopPropagation();
    const demoCredentials = {
      emailOrUsername: "demouser",
      password: "hiremichaeljung",
    };
    dispatch(login(demoCredentials));
  };

  useEffect(() => {
    if (!showMenu) return;

    const handleOutsideClick = (event) => {
      if (!profileButtonRef?.current?.contains(event.target))
        closeProfileMenu();
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [showMenu]);

  return (
    <div ref={profileButtonRef} className="relative">
      <button id="profile-button" onClick={toggleMenu}>
        <Icon path={mdiMenu} size={1.5} color="#222222" />
        <Icon
          path={mdiAccountCircle}
          size={1.5}
          color={currentUser ? "#66B2B2" : "#717171"}
        />
      </button>

      {!currentUser && showMenu && (
        <ul id="profile-menu">
          <ProfileMenuButton
            text={"login"}
            clickHandler={(e) => handleLoginClick(e)}
          />
          <ProfileMenuButton
            text={"sign up"}
            clickHandler={handleSignupClick}
          />
          <ProfileMenuButton
            text={"demo user"}
            clickHandler={handleDemoUserClick}
          />
        </ul>
      )}

      {currentUser && showMenu && (
        <ul id="profile-menu">
          <li>
            logged in as: <span>{currentUser?.username}</span>
          </li>
          <ProfileMenuButton
            text={"log out"}
            clickHandler={handleLogoutClick}
          />
        </ul>
      )}
    </div>
  );
};
