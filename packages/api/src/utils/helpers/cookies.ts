import type { NextApiResponse } from "next";

export const setCookie = (res: NextApiResponse, serializedData: string) => {
  res.setHeader("Set-Cookie", serializedData);
};

export const removeCookie = (res: NextApiResponse, key: string) => {
  res.setHeader(
    "Set-Cookie",
    `${key}=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  );
};

export const getCookieValue = (
  data: string | undefined,
  key: string
): string | null => {
  if (!data) return null;

  const cookies = data.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i] ? cookies[i]!.trim() : "=";
    const [cookieKey, cookieValue] = cookie.split("=");
    if (cookieKey === key) {
      return decodeURIComponent(cookieValue || "");
    }
  }
  return null;
};
