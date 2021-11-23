import Head from "next/head";
import { useQuery } from "react-query";
import { getMe } from "../actions/auth";
import DashboardTemplate from "../components/DashboardTemplate";
import ShoppingCard from "../components/ShoppingCard";
import { redirectLoggedOut } from "../utils/utils";

export default function Shop() {
  const getMeQuery = useQuery("me", getMe);
  redirectLoggedOut();
  return (
    <div>
      <Head>
        <title>Shop | OrderIt</title>
        <meta name="description" content="OrderIt Food Ordering Service" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <DashboardTemplate
        pageName={"Shop"}
        loading={getMeQuery.isLoading}
        success={getMeQuery.isSuccess}
      >
        <>
          <div className="dashboard-container py-10">
            <div className="font-semibold text-xl">All Items</div>
            <div className="mb-4 flex justify-end">
              <span className="font-semibold cursor-pointer">View All</span>
            </div>
            <div className="max-w-full overflow-x-auto">
              <div className="grid gap-4  grid-flow-col  grid-rows-1 auto-cols-auto mb-9">
                <ShoppingCard />
                <ShoppingCard />
                <ShoppingCard />
                <ShoppingCard />
                <ShoppingCard />
              </div>
            </div>
          </div>
        </>
      </DashboardTemplate>
    </div>
  );
}
