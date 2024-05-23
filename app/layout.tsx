'use client'
import type { Metadata } from 'next';

import './globals.css'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingComponents from '@/components/FloatingComponents';
import Space from '@/components/Space';

// import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Home from './page';
import Blogs from './pages/blogs';
import BlogDetail from './pages/blogDetail';
import PackageDetail from './pages/packageDetail';
import Login from './admin/login';
import Dashboard from './admin/dashboard';
import TestimonialsPage from './pages/testimonials';
import PackagesPage from './pages/packages';
import AboutUsPage from './pages/aboutUs';


function getUserFrame(child: any) {
  return (<body style={{ backgroundImage: "url('images/kaba2.jpg')", backgroundSize: 'cover', backgroundAttachment: 'fixed' }} className="bg-center">
    <Navbar />

    <main className="relative overflow-hidden">

      {child}


    </main>
    <Space h={50} />
    <Footer />


    <FloatingComponents />
  </body>);
}


export default function RootLayout() {

  return (
    <html lang="en">
{/*       
      <BrowserRouter>
        <Routes>

          <Route path="/" element={getUserFrame(<Home />)} />
          <Route path="/blogs" element={getUserFrame(<Blogs />)} />
          <Route path="/blogDetail" element={getUserFrame(<BlogDetail />)} />
          <Route path="/packageDetail" element={getUserFrame(<PackageDetail />)} />
          <Route path="/testimonials" element={getUserFrame(<TestimonialsPage />)} />
          <Route path="/packages" element={getUserFrame(<PackagesPage/>)} />
          <Route path="/about" element={getUserFrame(<AboutUsPage/>)} />



          <Route path="/dashboard" element = {<Login/>}/>
          <Route path="/dashboard/home" element = {<Dashboard/>}/>

          <Route path="*" element={
            getUserFrame(<div className='flex text-white text-[20px] h-[600px] flexCenter text-center content-center '>404 Page Not Found</div>)
          } />
        </Routes>
      </BrowserRouter> */}

    </html>
  )
}
