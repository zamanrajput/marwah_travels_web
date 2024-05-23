'use client'

import { getUserFrame } from "@/app/layout";
import Features from "@/components/Features";
import OurPartners from "@/components/OurPartners";
import OurTestimonials from "@/components/OurTestimonials";

export default function AboutUsPage() {
    return getUserFrame(<div>
        <Features />
        <OurTestimonials />
        <OurPartners />
    </div>)
}