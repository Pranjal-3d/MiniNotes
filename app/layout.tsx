import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini Notes App",
  description: "A premium full-stack notes app built with Next.js and MongoDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
