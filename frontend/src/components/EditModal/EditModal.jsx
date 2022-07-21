import React from "react";
import { Modal, Fade, Box, Backdrop } from "@material-ui/core";
import "./EditModal.css";

const EditModal = ({
  open,
  handleClose,
  updateHandler,
  input,
  setInput,
  inputType = "text",
  updateName,
}) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onloadend = function () {
      setInput(Reader.result); // readyState will be 2
    };
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className="modal"
    >
      <Fade in={open}>
        <Box className="modalBox">
          <form className="modal__form">
            <p>Update Your {updateName}</p>
            {inputType === "file" ? (
              <input
                className="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            ) : (
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                type={inputType}
              />
            )}

            <button type="submit" onClick={updateHandler}>
              Update {updateName}
            </button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditModal;
