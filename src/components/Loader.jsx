import React from "react";
import styles from "./Loader.module.css";
import { CircularProgress } from "@mui/material";
 
function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <CircularProgress color="primary" size={60} />
    </div>
  );
}
 
export default Loader;
 