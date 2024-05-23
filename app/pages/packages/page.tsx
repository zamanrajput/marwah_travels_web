'use client'

import { getUserFrame } from "@/app/layout";
import PackagesSection from "@/components/PackagesSection";

export default function PackagesPage(){
    return (
      getUserFrame(  <PackagesSection/>)
    );
}