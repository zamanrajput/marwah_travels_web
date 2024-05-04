import { transparentBlack } from "@/constants";
import {
    HotelOutlined,
    Hotel,
    Camera,
    PermIdentityTwoTone,
    FreeBreakfast,
    DinnerDiningRounded,
    AirplaneTicket,
    RoundaboutRightTwoTone,
    SupportAgent,
    Call,
    Email,
    Link,
    WhatsApp,
} from "@mui/icons-material";
import { UmrahPackage } from "../type/UmrahPackage";
import { useState, useEffect } from "react";
import { BACKEND_BASE_URL, GET_PACKAGES } from "../db/Routes";
import { ApiCallProps, makeGetCall } from "../db/api";
import PacksResponse from "../type/PacksResponse";
import Space from "@/components/Space";
import { Grid, Card, Divider } from "@mui/material";
import Image from "next/image";
import BlogElement from "../type/BlogElement";

export default function PackageDetail() {
    function buildComponents(p: UmrahPackage) {
        const arr = [];
        if (p.hotel_madina_enabled) {
            arr.push(
                <div className="  flex-center my-1 items-center">
                    <HotelOutlined sx={{ color: "white" }} />
                    <span className="text-[13px] text-white mx-3 ">
                        {p.hotel_madina_name}
                    </span>
                </div>
            );
        }
        if (p.hotel_makkah_enabled) {
            arr.push(
                <div className=" flex my-1 items-center">
                    <Hotel sx={{ color: "white" }} />
                    <span className="text-[13px] text-white mx-3">
                        {p.hotel_makkah_name}
                    </span>
                </div>
            );
        }
        if (p.ziyarat) {
            arr.push(
                <div className="flex flex-center my-1 items-center">
                    <Camera sx={{ color: "white" }} />
                    <span className="text-[13px] text-white mx-3">Ziyarat Included</span>
                </div>
            );
        }
        if (p.visa_enabled) {
            arr.push(
                <div className="flex flex-center my-1 items-center">
                    <PermIdentityTwoTone sx={{ color: "white" }} />
                    <span className="text-[13px] text-white mx-3">Visa Included</span>
                </div>
            );
        }

        if (p.breakfast_enabled) {
            arr.push(
                <div className="flex flex-center my-1 items-center">
                    <FreeBreakfast sx={{ color: "white" }} />
                    <span className="text-[13px] text-white mx-3">
                        Breakfast Included
                    </span>
                </div>
            );
        }

        if (p.dinner_enabled) {
            arr.push(
                <div className="flex flex-center my-1 items-center">
                    <DinnerDiningRounded sx={{ color: "white" }} />
                    <span className="text-[13px] text-white mx-3">Dinner Included</span>
                </div>
            );
        }

        if (p.ticket_enabled) {
            arr.push(
                <div className="flex flex-center my-1 items-center">
                    <AirplaneTicket sx={{ color: "white" }} />
                    <span className="text-[13px] text-white mx-3">
                        {"Ticket Included"}
                    </span>
                </div>
            );
        }
        if (p.is_roundtrip && p.ticket_enabled) {
            arr.push(
                <div className="flex flex-center my-1 items-center">
                    <RoundaboutRightTwoTone sx={{ color: "white" }} />
                    <span className="text-[13px] text-white mx-3">Roundtrip Ticket</span>
                </div>
            );
        }
        if (p.guide) {
            arr.push(
                <div className="flex flex-center my-1 items-center">
                    <SupportAgent sx={{ color: "white" }} />
                    <span className="text-[13px] text-white mx-3">Free Umrah Guide</span>
                </div>
            );
        }

        return arr;
    }

    const [packageToView, setPackageToView] = useState<UmrahPackage>(
        UmrahPackage.getDummy()
    );

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
        setPackageToView(packsResponse[0].list[0]);

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
        },
    };

    useEffect(() => {
        makeGetCall(props);
    }, []);





    return (
        <div className="w-full flex text-black">
            {packs?.length != 0 && packageToView instanceof UmrahPackage && (
                <div className="w-full  ">
                    <Card
                        className="w-full hover:border-white hover:border-2 hover:shadow-white hover:shadow-xl"
                        sx={{ backgroundColor: "whitesmoke", borderRadius: 2 }}
                        elevation={4}
                    >
                        <Image
                            src={BACKEND_BASE_URL + (packageToView.package_image ?? "")}
                            width={720}
                            height={300}
                            alt={"logo"}
                            className="w-full"
                        />
                        <div className=" grid grid-cols-6  bg-black p-2">
                            {" "}
                            {...buildComponents(packageToView)}
                        </div>

                        <div className="pt-4 px-10 hover:cursor-pointer ">

                            <div className="flex flex-col">


                              
                                <h1 className="text-bold text-[36px] text-black pt-1 font-bold">
                                    {packageToView.name}
                                </h1>
                                <span className="mt-2 ms-2">
                                    <p className="text-black text-md whitespace-pre-wrap leading-8">
                                        {packageToView.main_points}</p>

                                </span>
                                <h1 className="text-bold text-[30px] text-black pt-4 font-bold">
                                    {"What to Expect?"}
                                </h1>
                                <span className="mt-2 ms-2">
                                    <p className="text-black text-md whitespace-pre-wrap leading-8">
                                        {packageToView.what_to_expect}</p>
                                </span>

                                {packageToView && packageToView.hotel_makkah_enabled &&   <div className="flex flexBetween mt-10">
                                   
                                    <div style={{height:'auto'}}  className="mx-5 p-4  flex   flex-col rounded-xl bg-white w-full ">
                                        <span className="font-bold font-serif text-yellow-50 text-[14px]">{"Hotel In Makkah"}</span>
                                        <span className="font-bold text-[30px]">{packageToView.hotel_makkah_name}</span>
                                        <span className="leading-7 ps-[5px] text-[14px]">{packageToView.hotel_makkah_detail}</span>

                                    </div>

                                    {packageToView.hotel_makkah_image &&  <Image className="rounded-xl " src={(BACKEND_BASE_URL + (packageToView.hotel_makkah_image)??"")??""} alt="Data Image" width={400} height={300}  />}

                                </div>}
                                {packageToView && packageToView.hotel_madina_enabled &&   <div className="flex flexBetween mt-10">
                                    {packageToView.hotel_madina_image &&  <Image className="rounded-xl" src={(BACKEND_BASE_URL + (packageToView.hotel_madina_image)??"")??""} alt="Data Image" width={400} height={300}  />}
                                   
                                    <div style={{height:'auto'}}  className="mx-5 p-4  flex   flex-col rounded-xl bg-white w-full ">
                                        <span className="font-bold font-serif text-yellow-50 text-[14px]">{"Hotel In Madinah"}</span>
                                        <span className="font-bold text-[30px]">{packageToView.hotel_madina_name}</span>
                                        <span className="leading-7 ps-[5px] text-[14px]">{packageToView.hotel_madina_detail}</span>
                                    </div>
                                </div>}
                                {packageToView && packageToView.transport_enabled &&   <div className="flex flexBetween mt-10">
                                   
                                    <div style={{height:'auto'}}  className="mx-5 p-4  flex   flex-col rounded-xl bg-white w-full ">
                                        <span className="font-bold font-serif text-yellow-50 text-[14px]">{"Transportation In Saudi"}</span>
                                        <span className="font-bold text-[30px]">{packageToView.trans_title}</span>
                                        <span className="leading-7 ps-[5px] text-[14px]">{packageToView.trans_detail}</span>
                                    </div>
                                    {packageToView.trans_image &&  <Image className="rounded-xl" src={(BACKEND_BASE_URL + (packageToView.trans_image)??"")??""} alt="Data Image" width={400} height={300}  />}

                                </div>}


                                {packageToView && packageToView.visa_enabled &&   <div className="flex flexBetween mt-10">
                                    {packageToView.visa_image &&  <Image className="rounded-xl" src={(BACKEND_BASE_URL + (packageToView.visa_image)??"")??""} alt="Data Image" width={400} height={300}  />}
                                   
                                    <div style={{height:'auto'}}  className="mx-5 p-4  flex   flex-col rounded-xl bg-white w-full ">
                                        <span className="font-bold font-serif text-yellow-50 text-[14px]">{"Visa Services"}</span>
                                        <span className="font-bold text-[30px]">{packageToView.visa_title}</span>
                                        <span className="leading-7 ps-[5px] text-[14px]">{packageToView.visa_detail}</span>
                                    </div>
                                </div>}

                                <Divider />
                                <Space h={10} />

                                <Space h={20} />

                                <Space h={10} />
                            </div>
                            <div className="flexBetween mx-2">
                                <div className="hover:bg-green-700 bg-green-600 cursor-pointer  hover:shadow-3xl p-3 rounded-full shadow-sm">
                                    <Call style={{ color: "white" }} />
                                </div>
                                <div className=" bg-orange-500  hover:bg-orange-600 p-3 cursor-pointer rounded-full shadow-sm">
                                    <Email style={{ color: "white" }} />
                                </div>
                                <div className="bg-gray-700 cursor-pointer hover:bg-black  p-3 rounded-full shadow-sm">
                                    <WhatsApp style={{ color: "white" }} />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
