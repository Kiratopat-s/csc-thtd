import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "การแข่งขันทักษะฝีมือช่าง 2569 | การไฟฟ้าส่วนภูมิภาค",
  description:
    "การแข่งขันทักษะฝีมือช่าง ประจำปี 2569 โดย ฝ่ายช่างฝึกและอบรมสาย การไฟฟ้าส่วนภูมิภาค (กฟภ.)",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
