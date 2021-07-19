export default {
    BaseApiUrl: process.env.NEXT_PUBLIC_BASE_API_URL || 'http://3.22.116.164:8000/api/',
    AuthApiUrl: process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://3.22.116.164:8000/api/auth/',
    AccessTokenKey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || 'orderit_access_token',
    RefreshTokenKey: process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || 'orderit_refresh_token',
};
  