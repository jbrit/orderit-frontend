import Head from "next/head";
import { useQuery } from "react-query";
import { getMe } from "../actions/auth";
import DashboardTemplate from "../components/DashboardTemplate";
import { redirectLoggedOut } from "../utils/utils";

export default function Cart() {
  const getMeQuery = useQuery("me", getMe);
  redirectLoggedOut();
  return (
    <div>
      <Head>
        <title>Cart | OrderIt</title>
        <meta name="description" content="OrderIt Food Ordering Service" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <DashboardTemplate
        pageName={"Cart"}
        loading={getMeQuery.isLoading}
        success={getMeQuery.isSuccess}
      >
      </DashboardTemplate>
    </div>
  );
}
