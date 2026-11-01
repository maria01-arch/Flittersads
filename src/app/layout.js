import './globals.css'

export const metadata = {
  title: 'Flitters Ads',
  description: 'Advertise on Flitters',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
