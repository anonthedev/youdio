/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // serverComponentsExternalPackages: [
    //   "puppeteer-extra",
    //   "puppeteer-extra-plugin-stealth",
    //   "puppeteer-extra-plugin-adblocker",
    //   "puppeteer-extra-plugin-user-preferences",
    //   "puppeteer-extra-plugin-user-data-dir",        
    // ],
  },
};

module.exports = nextConfig;
