import React, { useState } from "react";
import { UserState } from "../../context/UserContext";
import "./Profile.css";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar } from "@mui/material";
import EditModal from "../EditModal/EditModal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { user, setLoading } = UserState();
  const [nameInput, setNameInput] = useState(user.name);
  const [emailInput, setEmailInput] = useState(user.email);
  const [avatarInput, setAvatarInput] = useState(user.name);

  const [nameOpen, setNameOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const handleNameClose = () => {
    setNameOpen(false);
  };
  const handleEmailClose = () => {
    setEmailOpen(false);
  };
  const handleAvatarClose = () => {
    setEmailOpen(false);
  };

  const handleNameEdit = () => {
    setNameOpen(true);
  };
  const handleEmailEdit = () => {
    setEmailOpen(true);
  };
  const handleAvatarEdit = () => {
    setAvatarOpen(true);
  };

  const updateName = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .patch(`/api/v1/update/my/name`, { name: nameInput })
      .then((res) => {
        displaySuccessToast("Name updated");
      })
      .catch((err) => {
        displayErrorToast("An error occured");
      });
    setNameOpen(false);
    setLoading(false);
  };
  const updateEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .patch(`/api/v1/update/my/email`, { email: emailInput })
      .then((res) => {
        displaySuccessToast("Email updated");
      })
      .catch((err) => {
        displayErrorToast("An error occured");
      });
    setEmailOpen(false);
    setLoading(false);
  };
  const updateAvatar = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .patch(`/api/v1/update/my/avatar`, { avatar: avatarInput })
      .then((res) => {
        displaySuccessToast("Avatar updated");
      })
      .catch((err) => {
        displayErrorToast("An error occured");
      });
    setAvatarOpen(false);
    setLoading(false);
  };

  const displaySuccessToast = (message) => {
    toast.success(message);
  };

  const displayErrorToast = (message) => {
    toast.error(message);
  };
  return (
    <div className="profile">
      <EditModal
        open={nameOpen}
        setOpen={setNameOpen}
        handleClose={handleNameClose}
        updateHandler={updateName}
        input={nameInput}
        setInput={setNameInput}
        updateName="Name"
      />
      <EditModal
        open={emailOpen}
        setOpen={setEmailOpen}
        handleClose={handleEmailClose}
        updateHandler={updateEmail}
        input={emailInput}
        setInput={setEmailInput}
        updateName="Email"
        inputType="email"
      />
      <EditModal
        open={avatarOpen}
        setOpen={setAvatarOpen}
        handleClose={handleAvatarClose}
        updateHandler={updateAvatar}
        input={avatarInput}
        setInput={setAvatarInput}
        updateName="Avatar"
        inputType="file"
      />
      <div className="profile__left">
        <Avatar style={{ height: 300, width: 300 }} src={user.avatar?.url} />
        <EditIcon
          className="image__edit__icon"
          style={{ fontSize: 30 }}
          onClick={handleAvatarEdit}
        />
      </div>
      <div className="profile__right">
        <div className="profile__item">
          <h2>Name : </h2>
          <h3>{user.name}</h3>
          <EditIcon
            className="profile__edit__icon"
            style={{ fontSize: 30 }}
            onClick={handleNameEdit}
          />
        </div>
        <div className="profile__item">
          <h2>Email : </h2>
          <h3>{user.email}</h3>
          <EditIcon
            className="profile__edit__icon"
            style={{ fontSize: 30 }}
            onClick={handleEmailEdit}
          />
        </div>

        <button>reset password</button>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Profile;
