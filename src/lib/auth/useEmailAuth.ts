"use client";

import { useMutation } from "@apollo/client/react";
import {
  CLIENT_PORTAL_USER_REQUEST_OTP,
  CLIENT_PORTAL_USER_LOGIN_WITH_OTP,
  type ClientPortalUserRequestOTPData,
  type ClientPortalUserRequestOTPVariables,
  type ClientPortalUserLoginWithOTPData,
  type ClientPortalUserLoginWithOTPVariables,
} from "@/graphql/auth/mutations/loginWithOTP";
import { useAuth } from "./AuthContext";

type OtpPayload = { token?: string; refreshToken?: string };

function extractToken(payload: unknown): string | null {
  if (!payload) return null;
  if (typeof payload === "string") {
    try {
      const parsed = JSON.parse(payload) as OtpPayload;
      return parsed.token ?? null;
    } catch {
      return null;
    }
  }
  if (typeof payload === "object") {
    return (payload as OtpPayload).token ?? null;
  }
  return null;
}

export function useEmailAuth() {
  const { login } = useAuth();

  const [requestOTP, { loading: sending }] = useMutation<
    ClientPortalUserRequestOTPData,
    ClientPortalUserRequestOTPVariables
  >(CLIENT_PORTAL_USER_REQUEST_OTP);
  const [loginWithOTP, { loading: verifying }] = useMutation<
    ClientPortalUserLoginWithOTPData,
    ClientPortalUserLoginWithOTPVariables
  >(CLIENT_PORTAL_USER_LOGIN_WITH_OTP);

  const sendCode = async (email: string) => {
    await requestOTP({ variables: { identifier: email } });
  };

  const verifyCode = async (email: string, code: string) => {
    const { data } = await loginWithOTP({
      variables: { identifier: email, otp: code },
    });
    const token = extractToken(data?.clientPortalUserLoginWithOTP);
    if (!token) throw new Error("No token returned");
    login(token);
  };

  return { sendCode, verifyCode, sending, verifying };
}
