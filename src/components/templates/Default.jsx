import React from "react";
import { Link } from "react-router-dom";

import DrawerMenu from "../molecules/DrawerMenu";

import logo from "../../images/logo.svg";
import styles from "./Default.module.css";

export default function Default(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={styles.wrapper}>
      <DrawerMenu open={open} setOpen={setOpen} />

      <div className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} className="responsive" alt="" />
          </Link>
        </div>
        <div className={styles.menu}>
          <i onClick={() => setOpen(true)} className="fa fa-bars"></i>
        </div>
      </div>

      {props.children}

      <div className={styles.footer}>
        Módulo React :: Full Stack Development
      </div>
    </div>
  );
}
