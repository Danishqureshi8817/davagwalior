import { BaseURL } from "@services/config";
import { tokenStorage } from "@state/storage";
import Axios, { AxiosRequestConfig } from "axios";
import { jwtDecode } from 'jwt-decode';
import { resetAndNavigate } from "./NavigationUtils";
import { RoutesName } from "./Constants";
import { useAuthStore } from "@state/authStore";

// import { getAuthValue } from "../hooks/common/useAuthValue";

interface DecodedToken {
  exp: number;
}

// APIs that don't require token check
const SKIP_TOKEN_CHECK_APIS = [
  '/auth/login',
  '/auth/verify-otp',
  '/auth/resend-otp',
  '/auth/refresh-token'
];

// Check if token is expired
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decoded?.exp < currentTime;
  } catch (error) {
    console.log('Error decoding token:', error);
    return true;
  }
};

// Refresh token function
const refreshToken = async (): Promise<boolean> => {
  try {
    const refreshTokenValue = tokenStorage.getString('refreshToken') as string;
    
    if (!refreshTokenValue) {
      console.log('No refresh token found');
      return false;
    }

    // Check if refresh token is expired
    if (isTokenExpired(refreshTokenValue)) {
      console.log('Refresh token expired, redirecting to login');
      // Clear tokens and redirect to login
      tokenStorage.clearAll();
      const { logout } = useAuthStore.getState();
      logout();
      resetAndNavigate(RoutesName.Login);
      return false;
    }

    // Call refresh token API directly (without using fetcher to avoid infinite loop)
    const response = await Axios.post(
      `${BaseURL}/auth/refresh-token`,
      { refreshToken: refreshTokenValue },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response?.data?.success && response?.data?.result) {
      // Store new tokens
      tokenStorage.set("accessToken", response.data.result.token);
      tokenStorage.set("refreshToken", response.data.result.refreshToken);

      // Update user data if available
      if (response.data.result.user) {
        const { setUser, user: currentUser } = useAuthStore.getState();
        setUser({
          ...currentUser, // Preserve existing user data (like address, userLocation, etc.)
          expirationTime: response.data.result.expirationTime,
          userUniqueId: response.data.result.user.userUniqueId,
          userMobile: response.data.result.user.mobile
        });
      }

      console.log('Token refreshed successfully');
      return true;
    } else {
      console.log('Token refresh failed');
      // Clear tokens and redirect to login
      tokenStorage.clearAll();
      const { logout } = useAuthStore.getState();
      logout();
      resetAndNavigate(RoutesName.Login);
      return false;
    }
  } catch (error: any) {
    console.log('Error refreshing token:', error);
    // Clear tokens and redirect to login
    tokenStorage.clearAll();
    const { logout } = useAuthStore.getState();
    logout();
    resetAndNavigate(RoutesName.Login);
    return false;
  }
};

// Check and refresh token if needed
const ensureValidToken = async (url: string): Promise<boolean> => {
  // Skip token check for login and refresh token APIs
  if (SKIP_TOKEN_CHECK_APIS.some(api => url.includes(api))) {
    return true;
  }

  const accessToken = tokenStorage.getString('accessToken') as string;

  // If no access token, redirect to login
  if (!accessToken) {
    console.log('No access token found, redirecting to login');
    const { logout } = useAuthStore.getState();
    logout();
    resetAndNavigate(RoutesName.Login);
    return false;
  }

  // Check if access token is expired
  if (isTokenExpired(accessToken)) {
    console.log('Access token expired, refreshing...');
    // Try to refresh the token
    const refreshed = await refreshToken();
    return refreshed;
  }

  return true;
};

export const fetcher = async (config: AxiosRequestConfig) => {
  const { url, method, data, headers } = config;

  // Check and refresh token if needed before making the API call
  const isValidToken = await ensureValidToken(url || '');
  
  if (!isValidToken) {
    // If token is invalid and we couldn't refresh, throw an error
    throw new Error('Authentication failed. Please login again.');
  }

  const access_token = tokenStorage.getString('accessToken') as string;

//   console.log('fetcher',access_token)

  return await Axios.request({
    baseURL: BaseURL as string,
    url,
    method: method ?? 'GET',
    data,
    ...config,
    headers: {
      Authorization: access_token ? `Bearer ${access_token}` : undefined,
      ...config?.headers,
      ...headers,
    },
  });
};