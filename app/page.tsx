'use client'
import Camp from "@/components/Camp";
import CustomPackageSection from "@/components/CustomPackageSection";
import Features from "@/components/Features";
import Guide from "@/components/Guide";
import Hero from "@/components/Hero";


import IquerySection from "@/components/IquerySection";
import OurPartners from "@/components/OurPartners";
import PackagesSection from "@/components/PackagesSection";

export default function Home() {


 

  
  return (
    <div >
 
        <Hero />
      


      <IquerySection />

      <CustomPackageSection/>

      <PackagesSection />


      <Features />
      <OurPartners/>
      
      
    </div>
  )
}
