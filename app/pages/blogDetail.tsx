import Space from "@/components/Space";
import { transparentBlack } from "@/constants";
import { Card, Divider } from "@mui/material";
import { store, selectBlog } from "../state/store";
import Image from "next/image";
import BlogElement from "../type/BlogElement";
import { BACKEND_BASE_URL } from "../db/Routes";

export default function BlogDetail(){

    const blog = store.getState().home.selectedBlog;

    function getElementTS(s: string) {
        if (s == "heading") {
            return 25;
        }
        if (s == 'subheading') {
            return 20
        }
        return 14;
    }
    function buildElement(element: BlogElement) {
        var res: any = '';
        if (element.element_type.includes('heading')) {
            res = <div className={`text-white text-[${getElementTS(element.element_type)}px] ${element.element_type.includes('heading') ? 'font-bold' : ''}`}>{element.value}</div>
        } else if (element.element_type == 'divider') {
            res = (
                <div className={`text-[14px] text-white w-full px-5 bg-gray-300 h-[1px] `}>

                </div>
            );
        } else {
            res = (
                <div className={`text-[14px] text-white` } style={{ whiteSpace: 'pre-wrap' }}>
                    {element.value}
                </div>
            );
        }


        return res;
    }

    return ( <Card onClick={()=>{
 
        
        }} className=" p-10" sx={{ borderRadius: 1, backgroundColor: transparentBlack }} elevation={4}>
        <Image src={BACKEND_BASE_URL+ blog.image??"/kaba_image.jpg"} width={920} height={600} alt={"logo"} className="w-[900px] h-[600px]" />

        <div className="px-4 mt-4   ">
            <div className="flex flex-col">
                <h1 className='text-bold text-[20px] mb-2 text-slate-100 pt-2 font-bold'>
                    {blog.title}
                </h1>
                <Divider sx={{ backgroundColor: 'white' }} />
                {...blog.elements.map((e)=>buildElement(e))}

                <Space h={10} />

            </div>
        </div>

    </Card>)
}