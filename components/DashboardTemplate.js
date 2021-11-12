import React from "react";
import TableComponent from "./TableComponent";
import Image from "next/image";
import { payWithPaystack } from "../actions/wallet";
import Swal from "sweetalert2";

const DashboardTemplate = ({ pageName, loading, success, walletQuery }) => {
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
        {success && (
          <>
            <div className="dashboard-container py-10">
              <div className="md:flex items-center mb-5">
                <div className="flex flex-col mr-auto mb-5">
                  <span className="text-2xl">Wallet Balance</span>
                  <span className="font-bold text-5xl">
                    ₦ {walletQuery.data.balance}
                  </span>
                </div>
                <button
                  style={{ background: "#251F2D" }}
                  className="py-5 pl-12 pr-4 text-white uppercase mr-4"
                  onClick={() =>
                    payWithPaystack("pro.ajibolaojo@gmail.com", 100)
                  }
                >
                  Fund Wallet
                </button>
                <button
                  style={{ background: "#251F2D" }}
                  className="py-5 pl-12 pr-4 text-white uppercase"
                  onClick={() => {
                    Swal.fire(
                      "Coming Soon",
                      "You would soon be able to send funds to other users",
                      "info"
                    );
                  }}
                >
                  Transfer Funds
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-8">
                <div
                  style={{ background: "#DDF6F8" }}
                  className="p-9 rounded-lg"
                >
                  Amount Spent
                  <div className="pt-1 font-bold text-3xl">₦0</div>
                </div>
                <div
                  style={{ background: "#FFDD8C" }}
                  className="p-9 rounded-lg"
                >
                  Amount Sent
                  <div className="pt-1 font-bold text-3xl">₦0</div>
                </div>
                <div
                  style={{ background: "#E5E2FF" }}
                  className="p-9 rounded-lg"
                >
                  Amount Received
                  <div className="pt-1 font-bold text-3xl">₦0</div>
                </div>
              </div>
              <div className="font-semibold text-2xl mb-4">
                Transaction History
              </div>
              <TableComponent />
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default DashboardTemplate;
