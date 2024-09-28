import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "prism-themes/themes/prism-vsc-dark-plus.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "andreiv.com",
  description: "my small corner of the internet",
  icons: [{ rel: "icon", url: "/logo.svg", type: "image/svg+xml" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col h-screen justify-between">
            <Header />
            <main className="flex flex-col items-center flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
