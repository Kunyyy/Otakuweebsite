import Footer from './components/footer/footer';
import Navbar from './components/navbar/navbar';
import './globals.css'
import { Nunito } from 'next/font/google'

const font = Nunito({ 
  subsets: ['latin'],
});

export const metadata = {
  title: 'Otakuweebs',
  description: 'Otakuwebsite by kunyyy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
        <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"></link>
      </head>
      <body className={font.className} style={{ userSelect: 'none' }}>
          <div className='flex flex-col h-full'>
            <div className='flex-grow'>
              <Navbar />
              {children}
            </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
