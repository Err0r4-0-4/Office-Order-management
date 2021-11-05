import React, { useState } from "react";
import styles from "./About.module.css";
import {
  AiFillGithub,
  AiFillMail,
  AiFillHtml5,
  AiFillLinkedin,
  AiOutlineDown,
} from "react-icons/ai";
import { FaReact, FaNodeJs } from "react-icons/fa";

import { MdSecurity } from "react-icons/md";
import {
  SiHiveBlockchain,
  SiAdobeillustrator,
  SiAdobelightroom,
  SiAdobeaftereffects,
  SiAdobephotoshop,
  SiYoutubegaming,
  SiJava,
  SiJavascript,
  SiCplusplus,
  SiBootstrap,
  SiCss3,
  SiBlockchaindotcom,
} from "react-icons/si";

import img from "../Images/Jatin.jpg";
const About = () => {
  const [help1, sethelp1] = useState(false);
  const open1 = () => {
    sethelp1(!help1);
  };
  const [help2, sethelp2] = useState(false);
  const open2 = () => {
    sethelp2(!help2);
  };

  const [help3, sethelp3] = useState(false);
  const open3 = () => {
    sethelp3(!help3);
  };
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
              <h2 className={styles.h2}>What is Office Order Manager?</h2>
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
            <div className={styles.top1}>
              <div className={styles.imgc}>
                <img src={img} alt="Admin" className={styles.img} />
              </div>
              <div className={styles.name}>
                <h2 className={styles.h5}>Jatin Gupta</h2>
                <h4 className={styles.h4}>3rd Year, IIIT V</h4>
                <p className={styles.h3}>
                  Block Chain Dev, Full Stack Dev & CP Enthusiast
                </p>
              </div>
            </div>
            <div className={styles.bot}>
              <ul className={styles.power}>
                {/* <li>
                  <SiAdobeillustratorstyle={{ color: "#ec6565" }} title="Adobe Illustartor"/>
                </li> */}
                {/* <li>
                  <SiAdobelightroom style={{ color: "#ec6565" }} title="Adobe Light Room"/>
                </li>
                <li>
                  <SiAdobephotoshop style={{ color: "#ec6565" }} title="Adobe Photoshop"/>
                </li> */}
                {/* <li>
                  <SiBootstrap />
                </li> */}
                <li>
                  <SiCplusplus style={{ color: "#ec6565" }} title="C++" />
                </li>
                <li>
                  <MdSecurity style={{ color: "#48d1ba" }} title="BlockChain" />
                </li>
                {/* <li>
                  <SiJava />
                </li> */}
                <li>
                  <SiJavascript
                    style={{ color: "#2290bb" }}
                    title="JavaScript"
                  />
                </li>
                {/* <li>
                  <SiYoutubegaming style={{ color: "#ec6565" }} title="Gaming"/>
                </li> */}
                <li>
                  <FaReact style={{ color: "#2678bb" }} title="React Js" />
                </li>
                <li>
                  <FaNodeJs style={{ color: "#46ce7f" }} title="Node Js" />
                </li>
                <li>
                  <AiFillHtml5 style={{ color: "#b9c73b" }} title="HTML 5" />
                </li>
              </ul>

              <ul className={styles.connect}>
                <li>
                  <a href="#" target="_blank" title="View Github">
                    <AiFillGithub />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" title="View Mail">
                    <AiFillMail />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" title="ViewLinkdin">
                    <AiFillLinkedin />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.fif}>
            <div className={styles.top2}>
              <div className={styles.imgc}>
                <img src={img} alt="Admin" className={styles.img} />
              </div>
              <div className={styles.name}>
                <h2 className={styles.h5}>Aditya Singh</h2>
                <h4 className={styles.h4}>3rd Year, IIIT V</h4>
                <p className={styles.h3}>Frontend Web Dev & Java Programmer</p>
              </div>
            </div>
            <div className={styles.bot}>
              <ul className={styles.power}>
                {/* <li>
                  <SiAdobeillustratorstyle={{ color: "#ec6565" }} title="Adobe Illustartor"/>
                </li> */}
                {/* <li>
                  <SiAdobelightroom style={{ color: "#ec6565" }} title="Adobe Light Room"/>
                </li>
                <li>
                  <SiAdobephotoshop style={{ color: "#ec6565" }} title="Adobe Photoshop"/>
                </li> */}
                {/* <li>
                  <SiBootstrap />
                </li> */}
                <li>
                  <SiCplusplus style={{ color: "#ec6565" }} title="C++" />
                </li>
                {/* <li>
                  <SiHiveBlockchain style={{ color: "#ec6565" }} title="BlockChain"/>
                </li> */}
                <li>
                  <SiJava style={{ color: "black" }} title="Java" />
                </li>
                <li>
                  <SiJavascript
                    style={{ color: "#2290bb" }}
                    title="JavaScript"
                  />
                </li>
                <li>
                  <SiYoutubegaming
                    style={{ color: "#ca36b2" }}
                    title="Gaming"
                  />
                </li>
                <li>
                  <FaReact style={{ color: "#2678bb" }} title="React Js" />
                </li>
                <li>
                  <SiCss3 style={{ color: "#46ce7f" }} title="Node Js" />
                </li>
                <li>
                  <AiFillHtml5 style={{ color: "#b9c73b" }} title="HTML 5" />
                </li>
              </ul>

              <ul className={styles.connect}>
                <li>
                  <a href="#" target="_blank" title="View Github">
                    <AiFillGithub />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" title="View Mail">
                    <AiFillMail />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" title="ViewLinkdin">
                    <AiFillLinkedin />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.fif}>
            <div className={styles.top3}>
              <div className={styles.imgc}>
                <img src={img} alt="Admin" className={styles.img} />
              </div>
              <div className={styles.name}>
                <h2 className={styles.h5}>Sidhart Saini</h2>
                <h4 className={styles.h4}>3rd Year, IIIT V</h4>
                <p className={styles.h3}>
                  Block Chain Dev, Full Stack Dev & CP Enthusiast
                </p>
              </div>
            </div>
            <div className={styles.bot}>
              <ul className={styles.power}>
                {/* <li>
                  <SiAdobeillustratorstyle={{ color: "#ec6565" }} title="Adobe Illustartor"/>
                </li> */}
                {/* <li>
                  <SiAdobelightroom style={{ color: "#ec6565" }} title="Adobe Light Room"/>
                </li>
                <li>
                  <SiAdobephotoshop style={{ color: "#ec6565" }} title="Adobe Photoshop"/>
                </li> */}
                {/* <li>
                  <SiBootstrap />
                </li> */}
                <li>
                  <SiCplusplus style={{ color: "#ec6565" }} title="C++" />
                </li>
                {/* <li>
                  <SiHiveBlockchain style={{ color: "#ec6565" }} title="BlockChain"/>
                </li> */}
                {/* <li>
                  <SiJava style={{ color: "black" }} title="JavaScript" />
                </li> */}
                <li>
                  <SiJavascript
                    style={{ color: "#2290bb" }}
                    title="JavaScript"
                  />
                </li>
                {/* <li>
                  <SiYoutubegaming style={{ color: "#ec6565" }} title="Gaming"/>
                </li> */}
                <li>
                  <FaReact style={{ color: "#2678bb" }} title="React Js" />
                </li>
                <li>
                  <FaNodeJs style={{ color: "#46ce7f" }} title="Node Js" />
                </li>
                <li>
                  <AiFillHtml5 style={{ color: "#b9c73b" }} title="HTML 5" />
                </li>
              </ul>

              <ul className={styles.connect}>
                <li>
                  <a href="#" target="_blank" title="View Github">
                    <AiFillGithub />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" title="View Mail">
                    <AiFillMail />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" title="ViewLinkdin">
                    <AiFillLinkedin />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.fif}>
            <div className={styles.top4}>
              <div className={styles.imgc}>
                <img src={img} alt="Admin" className={styles.img} />
              </div>
              <div className={styles.name}>
                <h2 className={styles.h5}>Deepanshu Singh</h2>
                <h4 className={styles.h4}>3rd Year, IIIT V</h4>
                <p className={styles.h3}>
                  Graphic Designer, Freelancer & CP Enthusiast
                </p>
              </div>
            </div>
            <div className={styles.bot}>
              <ul className={styles.power}>
                <li>
                  <SiAdobeaftereffects
                    style={{ color: "#ec6565" }}
                    title="Adobe Light Room"
                  />
                </li>
                <li>
                  <SiAdobephotoshop
                    style={{ color: "#b4c428" }}
                    title="Adobe Photoshop"
                  />
                </li>
                {/* <li>
                  <SiBootstrap />
                </li> */}
                {/* <li>
                  <SiCplusplus style={{ color: "#ec6565" }} title="C++" />
                </li> */}
                <li>
                  <MdSecurity style={{ color: "#48d1ba" }} title="BlockChain" />
                </li>
                {/* <li>
                  <SiJava />
                </li> */}
                <li>
                  <SiJavascript
                    style={{ color: "#2290bb" }}
                    title="JavaScript"
                  />
                </li>
                {/* <li>
                  <SiYoutubegaming style={{ color: "#ec6565" }} title="Gaming"/>
                </li> */}
                <li>
                  <FaReact style={{ color: "#2678bb" }} title="React Js" />
                </li>
                {/* <li>
                  <FaNodeJs style={{ color: "#46ce7f" }} title="Node Js" />
                </li> */}
                <li>
                  <AiFillHtml5 style={{ color: "#b9c73b" }} title="HTML 5" />
                </li>
                <li>
                  <SiAdobeillustrator
                    style={{ color: "#46ce7f" }}
                    title="Adobe Illustartor"
                  />
                </li>
              </ul>

              <ul className={styles.connect}>
                <li>
                  <a href="#" target="_blank" title="View Github">
                    <AiFillGithub />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" title="View Mail">
                    <AiFillMail />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" title="ViewLinkdin">
                    <AiFillLinkedin />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.div3}>
          <h2 className={styles.h2}>Frequently Asked Questions</h2>

          <div className={styles.faq}>
            <div className={styles.help} onClick={open1}>
              <div className={styles.faqques}>Who can access the Orders?</div>
              <div className={help1 ? styles.up : styles.add}>
                <AiOutlineDown />
              </div>
              <div className={help1 ? styles.open : styles.close}>
                Only the faculty, Student, Staff and Registrar i.e. all the
                members part of IIIT Vadodara can view the Orders.
              </div>
            </div>

            <div className={styles.help} onClick={open2}>
              <div className={styles.faqques}>
                Why do we need Office Order Management?{" "}
              </div>
              <div className={help2 ? styles.up : styles.add}>
                <AiOutlineDown />
              </div>
              <div className={help2 ? styles.open : styles.close}>
                This website helps registrar store the orders at same platform
                and others can access the orders at same platform saving time.
              </div>
            </div>

            <div className={styles.help} onClick={open3}>
              <div className={styles.faqques}>
                Is the website Office Order Website secure ?{" "}
              </div>
              <div className={help3 ? styles.up : styles.add}>
                <AiOutlineDown />
              </div>
              <div className={help3 ? styles.open : styles.close}>
                Yes, the website Office Order website is safe and secure and
                uses G-Auth for authentication and firebase for database.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
