import React from "react";
import TableComponent from "./TableComponent";
import { payWithPaystack } from "../actions/wallet";
import Swal from "sweetalert2";

const WalletMain = ({ transactionsQuery, getMeQuery }) => {
  const { balance, amount_received, amount_sent, amount_spent } =
  getMeQuery.data?.wallet ?? {};
  const { email } = getMeQuery.data ?? {};
  console.log(transactionsQuery.data)
  return (
    <>
      <div className="dashboard-container py-10">
        <div className="md:flex items-center mb-5">
          <div className="flex flex-col mr-auto mb-5">
            <span className="text-2xl">Wallet Balance</span>
            <span className="font-bold text-5xl">₦ {balance}</span>
          </div>
          <button
            style={{ background: "#251F2D" }}
            className="py-5 pl-12 pr-4 text-white uppercase mr-4"
            onClick={async () => {
              const { value: amount, isConfirmed } = await Swal.fire({
                title: "How much would you like to fund your wallet with?",
                input: "number",
                inputLabel: "Enter an amount",
                inputValue: 0,
                showCancelButton: true,
                inputValidator: (value) => {
                  if (!value) {
                    return "You need to write something!";
                  }
                  if (value < 100) {
                    return "You need up to N100 to fund your wallet";
                  }
                  if (parseInt(value / 100) !== value/100) {
                    return "You can only fund a wallet in multiples of N100";
                  }
                },
              });
              isConfirmed && payWithPaystack(email, amount);
            }}
          >
            Fund Wallet
          </button>
          <button
            style={{ background: "#251F2D" }}
            className="py-5 pl-12 pr-4 text-white uppercase"
            onClick={() => {
              Swal.fire(
                "Coming Soon",
                "You would soon be able to send funds to other users",
                "info"
              );
            }}
          >
            Transfer Funds
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-8">
          <div style={{ background: "#DDF6F8" }} className="p-9 rounded-lg">
            Amount Spent
            <div className="pt-1 font-bold text-3xl">₦{amount_spent}</div>
          </div>
          <div style={{ background: "#FFDD8C" }} className="p-9 rounded-lg">
            Amount Sent
            <div className="pt-1 font-bold text-3xl">₦{amount_sent}</div>
          </div>
          <div style={{ background: "#E5E2FF" }} className="p-9 rounded-lg">
            Amount Received
            <div className="pt-1 font-bold text-3xl">₦{amount_received}</div>
          </div>
        </div>
        <div className="font-semibold text-2xl mb-4">Transaction History</div>
        <TableComponent />
      </div>
    </>
  );
};

export default WalletMain;
