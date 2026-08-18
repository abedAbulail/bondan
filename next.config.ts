import type { NextConfig } from "next";

function withHttps(host: string) {
  const clean = host.trim().replace(/\/$/, "");
  if (!clean) return "";
  return /^https?:\/\//i.test(clean) ? clean : `https://${clean}`;
}

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return withHttps(explicit);

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return withHttps(production);

  const deployment = process.env.VERCEL_URL?.trim();
  if (deployment) return withHttps(deployment);

  return "";
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SITE_URL: resolveSiteUrl(),
  },
};

export default nextConfig;
