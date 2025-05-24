import type { Metadata } from "next";
import "./globals.css";
import ServerMenu from "@/components/server_layout";
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import { QueryProvider } from "@/components/providers/queryProvider";
import ClientOnly from "@/components/providers/clientOnly";


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
        suppressHydrationWarning
      >
        <ClientOnly>
          <Toaster position='top-center' reverseOrder={false} />
          <ToastContainer position="bottom-right" />
          <QueryProvider>
            <ServerMenu />
            <main className='relative z-80 top-20 md:ml-80'>
              {children}
            </main>
          </QueryProvider>
        </ClientOnly>
      </body>
    </html >
  );
}
