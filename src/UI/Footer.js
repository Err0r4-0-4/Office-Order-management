import React from "react";

import styles from "./Footer.module.css";
import { AiFillGitlab } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillMail } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";

const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.flex}>
      <div className={styles.sign}>
        You are signed in as:
        <p className={styles.signed}>201952202@iiitvadodara.ac.in</p>
        <p className={styles.signed}>Aditya Singh</p>
      </div>
      <div className={styles.signed}>Report a Bug</div>
    </div>
    <div className={styles.last2}>...OFFICE ORDER MANAGEMENT...</div>
  </div>
);

export default Footer;
