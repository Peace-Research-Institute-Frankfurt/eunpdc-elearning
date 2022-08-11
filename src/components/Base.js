import React from "react";
import "./global.scss";
import { Link } from "gatsby";
import logo from "../assets/logo.png";

function Base(props) {
  return (
    <>
      <header className="site__header">
        <h1>
          <Link to="/">
            <img class="site__logo" src={logo} alt="EUNPDC Logo" />
          </Link>
        </h1>
      </header>
      <main className="site__content">{props.children}</main>
    </>
  );
}

export default Base;
