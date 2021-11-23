import Head from "next/head";
import Image from "next/image";
import { useQuery } from "react-query";
import { getMe } from "../actions/auth";
import DashboardTemplate from "../components/DashboardTemplate";
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
        loading={getMeQuery.isLoading}
        success={getMeQuery.isSuccess}
      >
        <>
          <div className="dashboard-container py-10">
            <div className="font-semibold text-xl">Available Meals</div>
            <div className="mb-4 flex justify-end">
              <span className="font-semibold cursor-pointer">View All</span>
            </div>
            <div className="max-w-full overflow-x-auto">
              <div className="grid gap-4  grid-flow-col  grid-rows-1 auto-cols-auto mb-9">
                <div
                  className="bg-white rounded-xl border mt-9 relative text-center text-sm select-none"
                  style={{ height: "226px", width: "192px" }}
                >
                  <span
                    className="block"
                    style={{ transform: "translate(0px, -26px)" }}
                  >
                    <Image
                      alt=""
                      src="/images/food.png"
                      height={132}
                      width={132}
                    />
                  </span>
                  <div className="mx-auto -mt-4" style={{ width: "144px" }}>
                    <div className="font-medium mb-2">Jollof Rice + Chicken + Drink</div>
                    <div>N850</div>
                    <div> 20 packs available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </DashboardTemplate>
    </div>
  );
}
