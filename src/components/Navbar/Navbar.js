import React from "react";
import Score from "../Score";
import "./Navbar.css";
// Component for the Navbar

const Nav = props => (
  <nav className="navbar">
    <ul>
      <li className="brand">
        <a href="/">Clicky Game</a>
      </li>
      <Score score={props.score} topScore={props.topScore} />
      <li>
        Score: {props.score} | Top Score: {props.topScore}
      </li>
    </ul>
  </nav>
);

export default Nav;
