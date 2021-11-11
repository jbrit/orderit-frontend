import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import DashboardTemplate from "../components/DashboardTemplate";

export default function Login() {
  return (
    <div>
      <Head>
        <title>Dashboard | OrderIt</title>
        <meta name="description" content="OrderIt Food Ordering Service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardTemplate pageName={"Wallet"} />
    </div>
  );
}
