import React from "react";
import styles from "./About.module.css";
import { AiFillGithub, AiFillMail } from "react-icons/ai";
const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.div}>
        <h1 className={styles.h1}>About us</h1>
        <ul className={styles.ul}>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Code</a>
          </li>
          <li>
            <a href="#">Issues</a>
          </li>
          <li>
            <a href="#">Coders</a>
          </li>
          <li>
            <a href="#">FAQs</a>
          </li>
        </ul>
        <div className={styles.div1}>
          <div className={styles.six}>
            <div className={styles.sec}>
              <h2 className={styles.h2}>What is Office Order Management?</h2>
              <p className={styles.h3}>
                Office Order Management is a Indian Institute of Information
                Technology Vadodara website which brings all the office orders
                issued by the institute same platform which helps user to save
                time.
                <br /> This website helps the student , staff and faculty to
                find all the office orders issued iff they have permission to
                view that office order.
                <br /> The Registrar can upload new Office Orders and those will
                be directly saved for others with permission to view.{" "}
              </p>
            </div>
          </div>
          <div className={styles.three}>
            <div className={styles.sec}>
              <h2 className={styles.h2}>Code</h2>
              <div className={styles.flex}>
                <h3 className={styles.h3}>Github</h3>
                <div className={styles.icon}>
                  <a href="#">
                    <AiFillGithub />
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.sec}>
              <h2 className={styles.h2}>Issues/Suggestion</h2>
              <div className={styles.flex}>
                <h3 className={styles.h3}>Gmail</h3>
                <div className={styles.icon}>
                  <a href="#">
                    <AiFillMail />
                  </a>
                </div>
              </div>
            </div>
            {/* <ul className={styles.ul}>
              <li>
                <a href="#"></a>
              </li>
            </ul> */}
          </div>
        </div>
        <h2 className={styles.h2}>The Coders</h2>

        <div className={styles.div2}>
          <div className={styles.fif}>
            <div className={styles.top}>
              <div className={styles.img}></div>
              <div className={styles.name}></div>
            </div>
            <div className={styles.bot}></div>
          </div>
          <div className={styles.fif}></div>
          <div className={styles.fif}></div>
          <div className={styles.fif}></div>
        </div>

        <div className={styles.div3}>
          <div className={styles.six}></div>
          <div className={styles.four}></div>
        </div>
      </div>
    </div>
  );
};

export default About;
