import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Oswald, Montserrat } from 'next/font/google'
import "@/styles/global.scss";
import "@/styles/scrollbar.scss";
import '@/styles/datepicker.scss'

const monserrat = Montserrat({
  subsets: ['cyrillic'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-monserrat',
})

const oswald = Oswald({
  subsets: ['cyrillic'],
  display: 'swap',
  weight: ['600', '700'],
  variable: '--font-oswald',
})

export const metadata: Metadata = {
  title: "Экологический мероприятия в Москве",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${monserrat.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
