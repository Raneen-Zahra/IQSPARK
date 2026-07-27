import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IQ Spark — Brain Puzzles & Intelligence Tests",
  description:
    "Test your verbal, non-verbal, current affairs, and general knowledge skills with IQ Spark.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
