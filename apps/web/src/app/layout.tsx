import { ClientProvider } from "@/utils/trpc";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Samstack",
  description: "Samstack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClientProvider>
  );
}
