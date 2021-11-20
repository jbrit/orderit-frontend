import Head from "next/head";
import { useQuery } from "react-query";
import { getMe } from "../actions/auth";
import { myWallet } from "../actions/wallet";
import DashboardTemplate from "../components/DashboardTemplate";
import WalletMain from "../components/WalletMain";

export default function Login() {
  const getMeQuery = useQuery("me", getMe);
  const walletQuery = useQuery("my-wallet", myWallet);
  return (
    <div>
      <Head>
        <title>Dashboard | OrderIt</title>
        <meta name="description" content="OrderIt Food Ordering Service" />
        <link rel="icon" href="/images/logo.png" />
        {/* eslint-disable @next/next/no-sync-scripts */}
        <script src="https://js.paystack.co/v1/inline.js"></script>
      </Head>
      <DashboardTemplate
        pageName={"Wallet"}
        loading={getMeQuery.isLoading || walletQuery.isLoading}
        success={getMeQuery.isSuccess && walletQuery.isSuccess}
      >
        <WalletMain getMeQuery={getMeQuery} walletQuery={walletQuery} />
      </DashboardTemplate>
    </div>
  );
}
