import Head from "next/head";
import DashboardTemplate from "../components/DashboardTemplate";

export default function Login() {
  return (
    <div>
      <Head>
        <title>Dashboard | OrderIt</title>
        <meta name="description" content="OrderIt Food Ordering Service" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <DashboardTemplate pageName={"Wallet"} />
    </div>
  );
}
