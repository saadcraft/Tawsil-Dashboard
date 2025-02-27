import type { Metadata } from "next";
import "./globals.css";
import ServerMenu from "@/components/server_layout";
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';


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
        <main className='relative z-80 top-20 md:ml-80'>
          {children}
        </main>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
