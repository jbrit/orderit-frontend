import React from "react";
import Link from "next/link";
import { capitalize } from "../utils/utils";
import { useRouter } from "next/router";

const NavLink = ({ name, route, LinkIcon }) => {
  const router = useRouter();
  const selected = route == router.pathname.split("/")[1];
  return (
    <Link href={`/${route}`}>
      <a>
        <div
          className={
            selected ? "active-link cursor-pointer" : "icon-link cursor-pointer"
          }
        >
          <LinkIcon selected={selected} />
          <a href="#">
            <p>{name ?? capitalize(route)}</p>
          </a>
        </div>
      </a>
    </Link>
  );
};

export default NavLink;
