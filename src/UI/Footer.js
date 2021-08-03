import React from "react";

import styles from "./Footer.module.css";
import { AiFillGitlab } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillMail } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";

const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.flex}>
      <div className={styles.fitems}>
        <ul className={styles.fitemli}>
          <li>
            <a href="#">Query</a>
          </li>

          <li>
            <a href="#">Bug Report</a>
          </li>
          <li>
            <a href="#">IIIT Vadodara</a>
          </li>
        </ul>
      </div>
      <div className={styles.fitems}>
        <ul className={styles.fitemli}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">SignOut</a>
          </li>
        </ul>
      </div>
      <div className={styles.fitems}>
        <ul className={styles.fitemli}>
          <li>
            <a href="#">What is an Office Order?</a>
          </li>
          <li>
            <a href="#">Recent Orders</a>
          </li>
          <li>
            <a href="#">FAQs</a>
          </li>
        </ul>
      </div>
    </div>
    <div className={styles.fitemsm}>
      Reach Us:
      <ul className={styles.fitemli}>
        <li>
          <a href="#">
            <AiFillGitlab />
          </a>
        </li>

        <li>
          <a href="#">
            <AiFillInstagram />
          </a>
        </li>
        <li>
          <a href="#">
            <AiFillMail />
          </a>
        </li>
        <li>
          <a href="#">
            <AiFillLinkedin />
          </a>
        </li>
      </ul>
    </div>
    <div className={styles.last}> ErrOr 4:O4</div>
    <div className={styles.last2}>...OFFICE ORDER MANAGEMENT...</div>
  </div>
);

export default Footer;
