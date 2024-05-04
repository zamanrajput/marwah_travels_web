import { transparentBlack, lightWhite } from "@/constants";
import InquiryForm from "./Inquiryform";
import { NumberTransition } from "./NumberTransition";
import ParentCard from "./ParentCard";
import { Fade, Rotate, Slide } from "react-awesome-reveal";

export default function IquerySection() {
    


    return (
        <div id='inquiry'  className="flexBetween">
            <Slide className="px-20 py-10 ">
                <div className="px-6 py-6 rounded-3xl" style={{ backgroundColor: transparentBlack }}>
                    <InquiryForm />
                </div>
            </Slide>
            <div className="flex flex-col relative z-10 inset-0  bg-cover bg-center bg-red rounded-3xl
   xl:w-[600px] me-20 h-[450px] sm:w-full" style={{ backgroundImage: `url('/kaba1.jpg')` }}>



                <div className="z-20 xl:w-[400px] sm:w-full flexBetween justify-bottom flex-col flex   gap-2 rounded-3xl px-6 py-6 mx-4 my-4  " style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                    <Slide>
                        <div >
                            <p className=" text-xl pb-2
                         font-bold text-white" >
                                Our Packages
                            </p>
                        </div>
                    </Slide>
                    <Slide delay={0} direction="right" className="flex flex-col gap-2 hover:border-[1px] p-3 rounded-3xl bg-green-50 hover:bg-slate-50/20 hover:cursor-pointer 	 w-full">
                        <div >
                            <p className="text-sm/[20px]  xl:font-semibold text-white" >
                                All Umrah Packages
                            </p>
                        </div>
                    </Slide>
                    <Slide delay={5} direction="right" className="flex flex-col hover:border-[1px] p-3 rounded-3xl bg-green-50 hover:bg-slate-50/20 hover:cursor-pointer 	 w-full">
                        <div >
                            <p className="text-sm/[20px]  xl:font-semibold text-white" >
                                Group Umrah Packages
                            </p>
                        </div>
                    </Slide>
                    {/* <Slide delay={10} direction="right" className="flex flex-col  hover:border-[1px] p-3 rounded-xl bg-orange-600 hover:bg-slate-50/20 hover:cursor-pointer 	 w-full">
                    <div >
                        <p className="text-xl/[30px]  xl:font-semibold text-white" >
                            All Umrah Packages
                        </p>
                    </div>
                </Slide> */}
                </div>
            </div>
        </div>
    )
}