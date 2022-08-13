import React from "react";
import "./global.scss";
import SiteHeader from "./SiteHeader";
function Base(props) {
  return (
    <>
      <main className="site__content">{props.children}</main>
    </>
  );
}

export default Base;
