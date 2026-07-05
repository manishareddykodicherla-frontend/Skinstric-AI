import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header className="siteHeader">
      <div className="nav__left">
        <h1>SKINSTRIC</h1>
        <span className="intro">[ INTRO ]</span>
      </div>

      <button className="enter__code" type="button">
        ENTER CODE
      </button>
    </header>
  );
}
