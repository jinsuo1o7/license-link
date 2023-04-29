import "./globals.css";
import { Inter } from "next/font/google";
import AuthContext from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "License Link",
  description: "license link main page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <Navbar />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
