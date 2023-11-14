'use client'
import Link from "next/link";
import { useContext } from "react";
import { RouteContext } from "../../providers/routes-provider";
import { Routes } from "../../types";

const Navbar = () => {
  const { setFromRoute } = useContext(RouteContext);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link
          href={{
            pathname: "/",
          }}
          className="navbar-brand"
          onClick={() => setFromRoute(Routes.TOP)}
        >
          My Top Movies
        </Link>
        <Link
          href={{
            pathname: "/search",
          }}
          className="navbar-brand"
          onClick={() => setFromRoute(Routes.SEARCH)}
        >
          Search Movies
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
