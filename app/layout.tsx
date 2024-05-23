'use client'


import './globals.css'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingComponents from '@/components/FloatingComponents';
import Space from '@/components/Space';

import { ReactNode } from 'react';


export function getUserFrame(child: any) {
  return (<body style={{ backgroundImage: "url('/images/kaba2.jpg')", backgroundSize: 'cover', backgroundAttachment: 'fixed' }} className="bg-center">
    <Navbar />

    <main className="relative overflow-hidden">

      {child}


    </main>
    <Space h={50} />
    <Footer />


    <FloatingComponents />
  </body>);
}
export function getAdminFrame(child: any) {
  return (<body style={{ backgroundSize: 'cover', backgroundAttachment: 'fixed' }} className="bg-center">
    

    <main >

      {child}


    </main>

  </body>);
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
    
     
    
          {children}
       
       
      
    </html>
  );
}