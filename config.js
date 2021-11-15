export default {
  BaseApiUrl:
    process.env.NEXT_PUBLIC_BASE_API_URL ||
    "https://lmu-orderit.herokuapp.com/api/",
  AuthApiUrl:
    process.env.NEXT_PUBLIC_AUTH_API_URL ||
    "https://lmu-orderit.herokuapp.com/api/auth/",
  AccessTokenKey:
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || "orderit_access_token",
  RefreshTokenKey:
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || "orderit_refresh_token",
  PaystackPublicKey:
    process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ||
    "pk_test_3a3b0b7dff98f6fe26d1f2f06616457342cc0b7e",
};
