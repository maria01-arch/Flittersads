import { Archivo } from 'next/font/google'
import './globals.css'

const font = Archivo({ subsets: ['latin'], display: 'swap', variable: '--font-sans' })

export const metadata = {
  title: 'Flitters Ads: advertise on Flitters',
  description: 'Create an ad in minutes, pay by the day, and reach people in the Flitters feed and Reels.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.variable}>{children}</body>
    </html>
  )
}
