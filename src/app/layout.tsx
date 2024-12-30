import { CookiesProvider } from 'next-client-cookies/server';
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/header";
import ServerMenu from "@/components/menu/server_menu";
import { Toaster } from 'react-hot-toast';


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Tawsil Start Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="smooth-scroll">
      <body
        className={`antialiased bg-six`}
      >
        <Toaster position='top-center' reverseOrder={false}></Toaster>
              <ServerMenu />
              <Header />
            <main className='relative z-80 top-20 md:ml-80'>
                {children}
            </main>
      </body>
    </html>
  );
}
