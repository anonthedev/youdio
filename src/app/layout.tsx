import "./globals.css";
import Script from "next/script";
import { Gloock, Golos_Text, Raleway } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "youdio",
  description: "Seamlessly convert YouTube videos to audio, craft personalized playlists all without requiring to download anything, the ultimate platform for audio enthusiasts.",
  // openGraph: {
  //   images: 'https://photos.sphereshowcase.com/tBJczsgyzUAP3woETDr31.jpg',
  // },
};

const gloock = Gloock({
  variable: "--font-gloock",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${gloock.variable} ${golos.variable} ${raleway.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script id={"google-analytics-script"} strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
          `}
      </Script>
    </html>
  );
}
