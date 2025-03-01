import { DM_Sans, Roboto, Open_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";
import Script from "next/script";
import "@splidejs/react-splide/css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700", "900"],
  display: "block",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Harrow Pickleball Club Dashboard",
    template: "%s - Harrow Pickleball Club",
  },
  description: "Admin Dashboard for Harrow Pickleball Club",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body
        className={`${openSans.className} ${roboto.variable} box-border antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
