"use server";
import { cookies } from "next/headers";

export const getCookieList = async () => {
  const cookieStore = await cookies();
  const cookieList = cookieStore.getAll().map((cookie) => ({
    name: cookie.name,
    value: cookie.value,
  }));
  return cookieList;
};

export const setCookie = async (name: string, token: string) => {
  const cookieStore = await cookies();
  cookieStore.set(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 3600, // 1 hour
  });
};

export const getToken = async (name: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(name);
  return token?.value;
};
