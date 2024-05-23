'use client'
import CustomPackageSection from "@/components/CustomPackageSection";
import Features from "@/components/Features";
import Hero from "@/components/Hero";


import IquerySection from "@/components/IquerySection";
import OurPartners from "@/components/OurPartners";
import OurTestimonials from "@/components/OurTestimonials";
import PackagesSection from "@/components/PackagesSection";
import {  Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserFrame } from "./layout";

export default function Home() {



  const [inquiryVisible, setInquiryVisibility] = useState(false);
  function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function startTimer() {
    setInquiryVisibility(false);
    await delay(20 * 1000);
    
    setInquiryVisibility(true);
  }

  useEffect(()=>{startTimer()},[]);
  return getUserFrame(
    <div >

      <Hero />



      <Dialog PaperProps={{ sx: { background: 'rgba(0,0,0,0)' } }} open={inquiryVisible}>
        <IquerySection isDialog={true} onDismiss={startTimer} />


      </Dialog>
      <IquerySection isDialog={false} onDismiss={startTimer} />

      <CustomPackageSection />

      <PackagesSection />
      <Features  />
      <OurTestimonials />
      <OurPartners />


    </div>
  )
}
