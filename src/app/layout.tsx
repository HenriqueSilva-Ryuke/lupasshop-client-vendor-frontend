import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LupaShop - Integrated E-commerce Platform",
  description: "The integrated e-commerce platform where multiple independent stores come together in one digital space.",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
