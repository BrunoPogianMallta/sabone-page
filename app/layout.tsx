import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
})

export const metadata: Metadata = {
  title: "Sabonetes Artesanais | Catálogo Natural",
  description: "Descubra nossa coleção de sabonetes artesanais e terapêuticos feitos com ingredientes naturais",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${sourceSans.variable} antialiased`}>
      <body className="font-sans">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
