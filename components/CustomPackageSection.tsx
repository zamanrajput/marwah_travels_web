import { transparentBlack, lightWhite } from "@/constants";
import InquiryForm from "./Inquiryform";
import { NumberTransition } from "./NumberTransition";
import ParentCard from "./ParentCard";
import { Fade, Rotate, Slide } from "react-awesome-reveal";
import CustomPackageForm from "./CustomPackageForm";

export default function CustomPackageSection() {
    return (
        <div id='customPackage'  className="flexBetween">
            <Fade className="px-20 py-10 ">
                <div className="px-6 py-6 rounded-3xl" style={{ backgroundColor: transparentBlack }}>
                    <CustomPackageForm />
                </div>
            </Fade>
      
        </div>
    )
}