import { transparentBlack, lightWhite } from "@/constants";
import InquiryForm from "./Inquiryform";
import { NumberTransition } from "./NumberTransition";
import ParentCard from "./ParentCard";
import { Fade, Rotate, Slide } from "react-awesome-reveal";

export default function IquerySection() {



    return (
        <div id='inquiry' className="flexBetween">
            <Slide className="sm:px-20 px-10 sm:py-10 py-5">
                <div className="px-6 py-6 rounded-3xl" style={{ backgroundColor: transparentBlack }}>
                    <InquiryForm />
                </div>
            </Slide>
         
        </div>
    )
}