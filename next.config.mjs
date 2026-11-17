import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath,
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_ERXES_ENDPOINT: "https://erdenetsogtg.next.erxes.io/gateway/graphql",
    NEXT_PUBLIC_ERXES_APP_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRQb3J0YWxJZCI6IlBFR1JLb05DSjRXX0JjMHJYQ0tmRyIsImlhdCI6MTc4NjA3NDM1NH0.gqVMYwkbDdeHLDRH9gvMB-x4cTl5SiH5NT_AhmT8u_Q",
    NEXT_PUBLIC_ERXES_CMS_ID: "6a7556984bf17b98f5b781a7",
    ERXES_APP_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRQb3J0YWxJZCI6IlBFR1JLb05DSjRXX0JjMHJYQ0tmRyIsImlhdCI6MTc4NjA3NDM1NH0.gqVMYwkbDdeHLDRH9gvMB-x4cTl5SiH5NT_AhmT8u_Q",
  },
};

export default withNextIntl(nextConfig);
