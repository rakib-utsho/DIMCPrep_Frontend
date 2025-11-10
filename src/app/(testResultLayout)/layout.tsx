import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/shared/footer/Footer';
import React from 'react'

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar/>
      {children}
      <Footer/>
    </div>
  )
}
