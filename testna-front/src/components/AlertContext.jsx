import React, { createContext, useState, useContext } from "react";
import "./Alert.css";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

  const showAlert = (message, severity = "success") => {
    setAlert({ open: true, message, severity });

    setTimeout(() => {
      setAlert({ open: false, message: "", severity: "success" });
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      <div className={`alert-container ${alert.severity} ${alert.open ? "show" : ""}`}>
        {alert.message}
      </div>
    </AlertContext.Provider>
  );
};
