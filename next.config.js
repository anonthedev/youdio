/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: [
      "puppeteer-extra",
      "puppeteer-extra-plugin-stealth",
      "puppeteer-extra-plugin-adblocker",
    ],
  },
};

module.exports = nextConfig;
