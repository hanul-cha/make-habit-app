import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/join">
              <a>join</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
