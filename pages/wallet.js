import Head from "next/head";
import { useQuery } from "react-query";
import { getMe } from "../actions/auth";
import { myTransactions } from "../actions/wallet";
import DashboardTemplate from "../components/DashboardTemplate";
import WalletMain from "../components/WalletMain";
import { redirectLoggedOut } from "../utils/utils";

export default function Wallet() {
  const getMeQuery = useQuery("me", getMe);
  const transactionsQuery = useQuery("my-transactions", myTransactions);
  redirectLoggedOut();
  return (
    <div>
      <Head>
        <title>Wallet | OrderIt</title>
        <meta name="description" content="OrderIt Food Ordering Service" />
        <link rel="icon" href="/images/logo.png" />
        {/* eslint-disable @next/next/no-sync-scripts */}
        <script src="https://js.paystack.co/v1/inline.js"></script>
      </Head>
      <DashboardTemplate
        pageName={"Wallet"}
        loading={getMeQuery.isLoading}
        success={getMeQuery.isSuccess}
      >
        <WalletMain
          getMeQuery={getMeQuery}
          transactionsQuery={transactionsQuery}
        />
      </DashboardTemplate>
    </div>
  );
}
