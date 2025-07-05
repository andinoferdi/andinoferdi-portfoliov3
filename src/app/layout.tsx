import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AOSProvider from "@/components/AOSProvider";
import { Toaster } from "sonner";
import AnimatedBackground from "@/components/Background";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eki Zulfar Rachman – Creative Developer",
  description:
    "Creative front-end developer specializing in modern web experiences with cutting-edge technologies and stunning visual effects.",
  keywords:
    "Eki Zulfar, Creative Developer, Frontend Developer, Web Developer, Portfolio, React, Next.js",
  authors: [{ name: "Eki Zulfar Rachman" }],
  creator: "Eki Zulfar Rachman",
  openGraph: {
    type: "website",
    url: "https://eki.my.id/",
    title: "Eki Zulfar Rachman – Creative Developer",
    description:
      "Creative front-end developer specializing in modern web experiences.",
    images: [
      {
        url: "https://eki.my.id/Meta.png",
        width: 1200,
        height: 630,
        alt: "Eki Zulfar Rachman Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eki Zulfar Rachman – Creative Developer",
    description:
      "Creative front-end developer specializing in modern web experiences.",
    images: ["https://eki.my.id/Meta.png"],
  },
  icons: {
    icon: "/Photo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={true}
        >
          <AnimatedBackground />
          <main className="relative z-10">
            <AOSProvider>{children}</AOSProvider>
          </main>
          <Toaster
            theme="dark"
            position="top-right"
            toastOptions={{
              style: {
                background: "#030014",
                color: "#ffffff",
                border: "1px solid #3085d6",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
