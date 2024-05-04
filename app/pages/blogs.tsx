import Space from "@/components/Space";


import { Card, CircularProgress, Divider, Grid } from "@mui/material";
import Image from "next/image";
import { Blog } from "../type/Blog";
import { useEffect, useState } from "react";
import { ApiCallProps, makeGetCall } from "../db/api";
import { BACKEND_BASE_URL, GET_BLOGS } from "../db/Routes";
import {selectBlog, store} from '../state/store'
import { Link } from "react-router-dom";
import { transparentBlack } from "@/constants";
import BlogElement from "../type/BlogElement";
export default function Blogs() {


    const [blogs, setBlogs] = useState<Array<Blog>>();
    const [loading, setLoading] = useState(true);


    

    const parseData = (data: any[]) => {
        const parsed = data.map((d: any) => Blog.fromJson(d));
      
        setBlogs(parsed);
    }

    const props: ApiCallProps = {
        postUrl: GET_BLOGS,
        data: undefined,
        onStart: function (): void {
            setLoading(true);
        },
        onProgressEnd: function (): void {
            setLoading(false);
        },
        onSuccess: function (res: any) {
            parseData(res);
        },
        onUnexpected: function (res: any) {
            console.log("Unexpected Result:", res);
        }
    }

    useEffect(() => {
        makeGetCall(props)
    }, []);
    
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
    return (
        <div className="w-full m-6 p-6  flex flex-col items-center  " >

            {loading ? <div>

                <CircularProgress size={90} sx={{ color: "white", borderRadius: 20, borderWidth: 3, padding: 1 }} className="mt-48" />

            </div> : <Grid container gap={1} >


                {blogs?.map((blog,id) =>
                    <Grid key={id} item marginTop={1} sm={2.7} >
                        <Link to={"/blogDetail"}>
                        <Card onClick={()=>{
                            store.dispatch(selectBlog(blog));
                            
                            
                            }} className="hover:cursor-pointer hover:border-white hover:border-2 hover:shadow-white hover:shadow-xl" sx={{ borderRadius: 1, backgroundColor: transparentBlack }} elevation={4}>
                            <Image src={(BACKEND_BASE_URL+ blog.image)??"/kaba_image.jpg"} width={720} height={500} alt={"logo"} className="w-full h-68" />

                            <div className="px-4   ">
                                <div className="flex flex-col">
                                    <h1 className='text-bold text-[20px] mb-2 text-slate-100 pt-2 font-bold'>
                                        {blog.title}
                                    </h1>
                                    <Divider sx={{ backgroundColor: 'white' }} />
                                    {...blog.elements.map((e)=>buildElement(e))}
                                    <Space h={10} />
                                    

                                </div>
                            </div>

                        </Card>
                          </Link>
                       
                    </Grid>
                )}

            </Grid>}


        </div>
    );
}