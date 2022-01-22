import React from "react";
import { useQuery } from "react-query";
import { getMyOrders } from "../actions/food";
import { getMonth } from "../utils/utils";
import OrderReportTable from "./OrderReportTable";

const DashboardMain = ({ getMeQuery }) => {
  const { amount_spent } = getMeQuery.data.wallet;
  const getMyOrdersQuery = useQuery("my-orders", getMyOrders);
  console.log(getMeQuery.data.wallet);
  const transactions = getMyOrdersQuery.data ?? [];
  return (
    <>
      <div className="dashboard-container py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-8">
          <div style={{ background: "#DDF6F8" }} className="p-9 rounded-lg">
            Total Spent ({getMonth()})
            <div className="pt-1 font-bold text-3xl">₦{amount_spent}</div>
          </div>
          <div style={{ background: "#FFDD8C" }} className="p-9 rounded-lg">
            Meals Ordered ({getMonth()})
            <div className="pt-1 font-bold text-3xl">{transactions.length}</div>
          </div>
          <div
            style={{ background: "#E5E2FF" }}
            className="p-9 rounded-lg hidden"
          >
            Amount Received
            <div className="pt-1 font-bold text-3xl">₦{amount_spent}</div>
          </div>
        </div>
        <div className="font-semibold text-2xl mb-4">Order Report</div>
        <OrderReportTable />
      </div>
    </>
  );
};

export default DashboardMain;
