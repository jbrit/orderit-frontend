import React from "react";
import Image from "next/image";

const DashboardTemplate = ({ pageName, loading, success, children }) => {
  return (
    <main id="wrapper">
      <section id="side-bar">
        <div id="branding">
          <Image alt="" src="/images/logo.png" height={48} width={42} />
        </div>
        <div>
          <div className="active-link cursor-pointer">
            <Image alt="" height={0} width={0} src="/images/dashboard.png" />
            <a href="#">
              <p>Dashboard</p>
            </a>
          </div>
          <div className="icon-link cursor-pointer">
            <Image alt="" height={0} width={0} src="/images/food.png" />
            <a href="#">
              <p>Food</p>
            </a>
          </div>
          <div className="icon-link cursor-pointer">
            <Image alt="" height={0} width={0} src="/images/wallet.png" />
            <a href="#">
              <p>Wallet</p>
            </a>
          </div>
          <div className="icon-link cursor-pointer">
            <Image alt="" height={0} width={0} src="/images/shop.png" />
            <a href="#">
              <p>Shop</p>
            </a>
          </div>
          <div className="icon-link cursor-pointer">
            <Image alt="" height={0} width={0} src="/images/cart.png" />
            <a href="#">
              <p>Cart</p>
            </a>
          </div>
          <div className="icon-link cursor-pointer">
            <Image alt="" height={0} width={0} src="/images/settings.png" />
            <a href="#">
              <p>Settings</p>
            </a>
          </div>
          <div className="icon-link cursor-pointer">
            <Image alt="" height={0} width={0} src="/images/logout.png" />
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
          <form className="search-form">
            <input type="text" placeholder="Search for food, drinks, etc .." />
          </form>
          <div id="user">
            {/* <div>
              <Image
                alt=""
                height={40}
                width={40}
                src="/images/notification.png"
              />
            </div> */}
            <div id="user-profile">
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
