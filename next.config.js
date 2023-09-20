/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: [
      "puppeteer-extra",
      "puppeteer-extra-plugin-stealth",
      "puppeteer-extra-plugin-adblocker",
      "puppeteer-extra-plugin-user-preferences"
    ],
  },
};

module.exports = nextConfig;
