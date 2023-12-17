import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'

export const metadata: Metadata = {
  title: 'Chat Mastery',
  description: 'Para fins de demonstração',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
