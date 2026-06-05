import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#070d1a",
};

export default function PrototypeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
