import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import AnimatedBackground from "@/components/animated-background"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Power your uptime with SAT NOC Plans",
  description:
    "Enterprise-grade NOC software + 24×7 managed operations service. Choose from Lite, Pro, Ultra or Enterprise plans. Monitor, detect, resolve and prevent infrastructure issues.",
  generator: "SATMZ",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <AnimatedBackground />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
