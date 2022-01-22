import Swal from "sweetalert2";
import config from "../config";
import { api } from "../utils/api";

export async function myWallet() {
  const response = await api.request(`/wallet/my-wallet/`, {
    method: "GET",
    requiresAuthentication: true,
  });
  return response.data;
}

export async function myTransactions() {
  const response = await api.request(`/wallet/transactions/`, {
    method: "GET",
    requiresAuthentication: true,
  });
  return response.data;
}

export async function verifyPayment(reference) {
  const response = await api.request(`/wallet/paystack-callback/`, {
    method: "POST",
    requiresAuthentication: true,
    body: { reference },
  });
  return response.data;
}

export function payWithPaystack(email, amount) {
  let handler = PaystackPop.setup({
    key: config.PaystackPublicKey,
    email,
    amount: amount * 100,
    callback: function (response) {
      let message = "Payment complete! Reference: " + response.reference;
      verifyPayment(response.reference)
        .then(() => {
          Swal.fire(
            "Payment Successful",
            "Account has been credited!",
            "success"
          );
          // refetch wallet query
        })
        .catch(() => {
          Swal.fire("Payment Error", "Could not verify payment", "error");
        });
    },
  });
  handler.openIframe();
}
