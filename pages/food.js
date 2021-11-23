import Head from "next/head";
import { useQuery } from "react-query";
import { getMe } from "../actions/auth";
import DashboardTemplate from "../components/DashboardTemplate";
import FoodCard from "../components/FoodCard";
import { redirectLoggedOut } from "../utils/utils";

export default function Food() {
  const getMeQuery = useQuery("me", getMe);
  redirectLoggedOut();
  return (
    <div>
      <Head>
        <title>Food | OrderIt</title>
        <meta name="description" content="OrderIt Food Ordering Service" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <DashboardTemplate
        pageName={"Food"}
        loading={false}
        success={true}
      >
        <>
          <div className="dashboard-container py-10">
            <div className="font-semibold text-xl">Popular Combos</div>
            <div className="mb-4 flex justify-end">
              <span className="font-semibold cursor-pointer">View All</span>
            </div>
            <div className="max-w-full overflow-x-auto">
              <div className="grid gap-4  grid-flow-col  grid-rows-1 auto-cols-auto mb-9">
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
              </div>
            </div>
            <div className="font-semibold text-xl">Available Meals</div>
            <div className="mb-4 flex justify-end">
              <span className="font-semibold cursor-pointer">View All</span>
            </div>
            <div className="max-w-full overflow-x-auto">
              <div className="grid gap-4  grid-flow-col  grid-rows-1 auto-cols-auto mb-9">
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
              </div>
            </div>
            <div className="font-semibold text-xl">All Meals</div>
            <div className="mb-4 flex justify-end">
              <span className="font-semibold cursor-pointer">View All</span>
            </div>
            <div className="max-w-full overflow-x-auto">
              <div className="grid gap-4  grid-flow-col  grid-rows-1 auto-cols-auto mb-9">
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
              </div>
            </div>
          </div>
        </>
      </DashboardTemplate>
    </div>
  );
}
