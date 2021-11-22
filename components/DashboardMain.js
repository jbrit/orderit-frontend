import React from "react";

const DashboardMain = ({  getMeQuery }) => {
  const { email } = getMeQuery.data ?? {};
  return (
    <>
      <div className="dashboard-container py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-8">
          <div style={{ background: "#DDF6F8" }} className="p-9 rounded-lg">
            Amount Spent
            <div className="pt-1 font-bold text-3xl">₦0</div>
          </div>
          <div style={{ background: "#FFDD8C" }} className="p-9 rounded-lg">
            Amount Sent
            <div className="pt-1 font-bold text-3xl">₦0</div>
          </div>
          <div style={{ background: "#E5E2FF" }} className="p-9 rounded-lg">
            Amount Received
            <div className="pt-1 font-bold text-3xl">₦0</div>
          </div>
        </div>
        <div className="font-semibold text-2xl mb-4">Order Report</div>
      </div>
    </>
  );
};

export default DashboardMain;
