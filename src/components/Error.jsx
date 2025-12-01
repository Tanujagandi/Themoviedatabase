import React from "react";
import styles from "./Error.module.css";
import { Alert } from "@mui/material";
 
function Error({ message }) {
  if (!message) return null;
 
  return (
    <div className={styles.errorContainer}>
      <Alert severity="error">{message}</Alert>
    </div>
  );
}
 
export default Error;