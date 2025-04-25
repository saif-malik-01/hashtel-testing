import { createSaleorAuthClient } from "@saleor/auth-sdk";
import { getNextServerCookiesStorageAsync } from "@saleor/auth-sdk/next/server";

const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL || "";

export const getServerAuthClient = async () => {
  const nextServerCookiesStorage = await getNextServerCookiesStorageAsync();
  return createSaleorAuthClient({
    saleorApiUrl,
    refreshTokenStorage: nextServerCookiesStorage,
    accessTokenStorage: nextServerCookiesStorage,
  });
};
