import Head from "next/head";
import { useQuery } from "react-query";
import { getMe } from "../actions/auth";
import DashboardTemplate from "../components/DashboardTemplate";
import DashboardMain from "../components/DashboardMain";

export default function Dashboard() {
  const getMeQuery = useQuery("me", getMe);
  return (
    <div>
      <Head>
        <title>Dashboard | OrderIt</title>
        <meta name="description" content="OrderIt Food Ordering Service" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <DashboardTemplate
        pageName={"Dashboard"}
        loading={getMeQuery.isLoading}
        success={getMeQuery.isSuccess}
      >
        <DashboardMain getMeQuery={getMeQuery} />
      </DashboardTemplate>
    </div>
  );
}
