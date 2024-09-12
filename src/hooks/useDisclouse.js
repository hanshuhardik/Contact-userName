import React, { useState } from "react";

const useDisclouse = () => {
  const [isOpen, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleUser = (username) => {
    setUser(username);
  };
  return { onClose, onOpen, isOpen, user, handleUser };
};

export default useDisclouse;
