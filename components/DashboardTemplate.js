import React from "react";
import Image from "next/image";
import Link from "next/link";
import Food from "./menu-icons/Food";
import Wallet from "./menu-icons/Wallet";
import Cart from "./menu-icons/Cart";
import Shop from "./menu-icons/Shop";
import Settings from "./menu-icons/Settings";
import Dashboard from "./menu-icons/Dashboard";
import Logout from "./menu-icons/Logout";
import NavLink from "./NavLink";

const DashboardTemplate = ({ pageName, loading, success, children }) => {
  return (
    <main className="flex relative min-h-screen" id="wrapper">
      <section id="side-bar">
        <div className="flex items-center justify-center" id="branding">
          <Image alt="" src="/images/logo.png" height={48} width={42} />
        </div>
        <div>
          <NavLink route="dashboard" LinkIcon={Dashboard} />
          <NavLink route="food" LinkIcon={Food} />
          <NavLink route="wallet" LinkIcon={Wallet} />
          <NavLink route="shop" LinkIcon={Shop} />
          <NavLink route="cart" LinkIcon={Cart} />
          <NavLink route="settings" LinkIcon={Settings} />
          <div className="icon-link cursor-pointer">
            <Logout />
            <a href="#">
              <p>Logout</p>
            </a>
          </div>
        </div>
      </section>
      <section id="content-page">
        <header>
          <div id="header-branding">
            <h1
              className="text-3xl font-semibold"
              style={{ lineHeight: "39px" }}
            >
              {pageName}
            </h1>
            <p>{new Date().toDateString()}</p>
          </div>
          <form className="search-form hidden md:block">
            <input type="text" placeholder="Search for food, drinks, etc .." />
          </form>
          <div className="flex" id="user">
            {/* <div>
              <Image
                alt=""
                height={40}
                width={40}
                src="/images/notification.png"
              />
            </div> */}
            <div className="flex" id="user-profile">
              <div className="user-image">
                <Image
                  alt=""
                  height={50}
                  width={50}
                  src="/images/user-image.png"
                />
              </div>
              <div id="user-info">
                <h4>Hello User</h4>
                <div>
                  Student{" "}
                  <Image
                    alt=""
                    height={0}
                    width={0}
                    src="/images/caret-down.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>
        {loading && (
          <div className="relative pt-40 flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-24 w-24 rounded-full bg-gray-400 opacity-75"></span>
            <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-gray-400 opacity-75"></span>
            <span>Loading</span>
          </div>
        )}
        {success && children}
      </section>
    </main>
  );
};

export default DashboardTemplate;
