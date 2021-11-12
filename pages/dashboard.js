import Head from "next/head";
import { useQuery } from "react-query";
import { myWallet } from "../actions/wallet";
import DashboardTemplate from "../components/DashboardTemplate";

export default function Login() {
  const walletQuery = useQuery("my-wallet", myWallet);
  return (
    <div>
      <Head>
        <title>Dashboard | OrderIt</title>
        <meta name="description" content="OrderIt Food Ordering Service" />
        <link rel="icon" href="/images/logo.png" />
        <script src="https://js.paystack.co/v1/inline.js"></script>
      </Head>
      <DashboardTemplate
        pageName={"Wallet"}
        walletQuery={walletQuery}
        loading={walletQuery.isLoading}
        success={walletQuery.isSuccess}
      />
    </div>
  );
}
