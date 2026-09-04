import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Thai_Looped } from "next/font/google";
import MuiThemeProvider from "@/components/ThemeProvider";
import { ThemeContextProvider } from "@/lib/theme-context";
import { TextSizeProvider } from "@/lib/text-size-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoThai = Noto_Sans_Thai_Looped({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "การแข่งขันทักษะฝีมือช่าง 2569 | การไฟฟ้าส่วนภูมิภาค",
  description:
    "การแข่งขันทักษะฝีมือช่าง ประจำปี 2569 โดย ฝ่ายช่างฝึกและอบรมสาย การไฟฟ้าส่วนภูมิภาค (กฟภ.)",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);document.documentElement.classList.add(t==='light'?'light':'dark');document.documentElement.classList.remove(t==='light'?'dark':'light')}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      suppressHydrationWarning
      className={`${notoThai.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeContextProvider>
          <MuiThemeProvider>
            <TextSizeProvider>{children}</TextSizeProvider>
          </MuiThemeProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
