
import { AirplaneTicket, Call, Camera, Category, DinnerDining, DinnerDiningRounded, Email, FreeBreakfast, Hotel, HotelOutlined, PermIdentityTwoTone, RoundaboutRightTwoTone, SupportAgent, WhatsApp } from "@mui/icons-material";
import { Card, CircularProgress, Divider, Grid } from "@mui/material";
import Image from "next/image";
import Space from "./Space";
import { transparentBlack } from "@/constants";
import { useEffect, useState } from "react";
import { BACKEND_BASE_URL, GET_PACKAGES } from "@/app/db/Routes";
import { ApiCallProps as ApiCallProps, makeGetCall, makePostCall } from "@/app/db/api";
import PacksResponse from "@/app/type/PacksResponse";
import { UmrahPackage } from "@/app/type/UmrahPackage";

import { selectUmrahPackage, store } from "@/app/state/store";
import Link from "next/link";




function buildComponents(p: UmrahPackage) {

    const arr = [];
    if (p.hotel_madina_enabled) {
        arr.push(
            <div className="flex flex-center my-1 items-center">
                <HotelOutlined sx={{ color: transparentBlack }} />
                <span className="text-[13px] mx-3 ">{p.hotel_madina_name}</span>
            </div>
        )
    }
    if (p.hotel_makkah_enabled) {
        arr.push(
            <div className="flex flex-center my-1 items-center">
                <Hotel sx={{ color: transparentBlack }} />
                <span className="text-[13px] mx-3">{p.hotel_makkah_name}</span>
            </div>
        )
    }
    if (p.ziyarat) {
        arr.push(
            <div className="flex flex-center my-1 items-center">
                <Camera sx={{ color: transparentBlack }} />
                <span className="text-[13px] mx-3">Ziyarat Included</span>
            </div>
        )
    }
    if (p.visa_enabled) {
        arr.push(
            <div className="flex flex-center my-1 items-center">
                <PermIdentityTwoTone sx={{ color: transparentBlack }} />
                <span className="text-[13px] mx-3">Visa Included</span>
            </div>
        )
    }

    if (p.breakfast_enabled) {
        arr.push(
            <div className="flex flex-center my-1 items-center">
                <FreeBreakfast sx={{ color: transparentBlack }} />
                <span className="text-[13px] mx-3">Breakfast Included</span>
            </div>
        )
    }

    if (p.dinner_enabled) {
        arr.push(
            <div className="flex flex-center my-1 items-center">
                <DinnerDiningRounded sx={{ color: transparentBlack }} />
                <span className="text-[13px] mx-3">Dinner Included</span>
            </div>
        )
    }

    if (p.ticket_enabled) {
        arr.push(
            <div className="flex flex-center my-1 items-center">
                <AirplaneTicket sx={{ color: transparentBlack }} />
                <span className="text-[13px] mx-3">{"Ticket Included"}</span>
            </div>
        )
    }
    if (p.is_roundtrip && p.ticket_enabled) {
        arr.push(
            <div className="flex flex-center my-1 items-center">
                <RoundaboutRightTwoTone sx={{ color: transparentBlack }} />
                <span className="text-[13px] mx-3">Roundtrip Ticket</span>
            </div>
        )
    }
    if (p.guide) {
        arr.push(
            <div className="flex flex-center my-1 items-center">
                <SupportAgent sx={{ color: transparentBlack }} />
                <span className="text-[13px] mx-3">Free Umrah Guide</span>
            </div>
        )
    }





    return arr;

}

const a = [1, 2, 3]
export default function PackagesSection() {


    function parseData(data: any) {
        const packsResponse: PacksResponse = data.map((category: any) => ({
            id: category.id,
            name: category.name,
            status: category.status,
            created_at: category.created_at,
            updated_at: category.updated_at,
            list: category.list.map((pack: any) => UmrahPackage.fromJson(pack)),
        }));

        setPacks(packsResponse);

        console.log(packsResponse);

    }
    const [packs, setPacks] = useState<PacksResponse>();
    const [loading, setLoading] = useState(true);




    const props: ApiCallProps = {
        postUrl: GET_PACKAGES,
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


    return (
        <div id='packages' style={{ backgroundColor: 'rgba(0,0,0,0.2)' }} className={`w-full  flex flex-col items-center  ${loading ? "h-[800px]" : ""}`}>
            {loading ? <div>

                <CircularProgress size={90} sx={{ color: "white", borderRadius: 20, borderWidth: 3, padding: 1 }} className="mt-48" />

            </div> : <div className="w-full  flex flex-col items-center">
                {packs?.map((cat, id) => <div

                    onClick={() => { }}
                    className="w-full  flex flex-col items-center" key={id}>
                    <h1 className='bold-54 text-white pt-10 text-center font-bold text-3xl '>
                        {cat.name}
                    </h1>

                    <Grid className="my-10" justifyContent={'center'} container gap={4}>
                        {cat?.list?.map((pack: UmrahPackage, i: any) =>
                            <Grid key={i} item sm={2.2}>
                                
                                <Link href="/pages/package_detail">
                                    <Card
                                     onClick={() => {
                                        store.dispatch(selectUmrahPackage(pack));
                                      }}

                                    className="hover:border-white hover:border-2 hover:shadow-white hover:shadow-xl" sx={{ backgroundColor: 'white', borderRadius: 2 }} elevation={4}>
                                        <img src={BACKEND_BASE_URL + pack.package_image ?? "/kaba_image.jpg"} width={720} height={300} alt={"logo"} className="w-full h-36" />

                                        <div className="p-4 hover:cursor-pointer ">
                                            <div className="flex flex-col">
                                                <h1 className='text-bold text-[16px] text-black pt-2 font-bold'>
                                                    {pack.name}
                                                </h1>
                                                <span className="mt-1">
                                                    <strong className="text-green-600 text-xl">{pack.currency + pack.price_single}/-</strong> Per Person
                                                </span>

                                                <Divider />
                                                <Space h={10} />

                                                {...buildComponents(pack)}
                                                <Space h={20} />

                                                <div className="flexBetween mx-2">
                                                    <div onClick={() => window.open("tel:+" + pack.whatsapp, "_blank")} className="hover:bg-green-700 bg-green-600 cursor-pointer  hover:shadow-3xl p-3 rounded-full shadow-sm">
                                                        <Call style={{ color: 'white' }} />
                                                    </div>
                                                    <div onClick={() => window.open("mailto:" + pack.email, "_blank")} className=" bg-orange-500  hover:bg-orange-600 p-3 cursor-pointer rounded-full shadow-sm">
                                                        <Email style={{ color: 'white' }} />
                                                    </div>
                                                    <div onClick={() => window.open("https://api.whatsapp.com/send?phone=" + pack.whatsapp, "_blank")} className="bg-gray-700 cursor-pointer hover:bg-black  p-3 rounded-full shadow-sm">
                                                        <WhatsApp style={{ color: 'white' }} />
                                                    </div>
                                                </div>

                                                <Space h={10} />


                                            </div>
                                        </div>

                                    </Card>
                                </Link>
                            </Grid>
                        )}


                    </Grid>
                </div>)}
            </div>

            }

        </div>
    )
}