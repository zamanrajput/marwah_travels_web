"use client";
import { CircularProgress, Grid, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ArrowBackIos,
  BreakfastDining,
  DinnerDining,
  LocationCity,
  Map,
  Star,
} from "@mui/icons-material";
import CustomTextFieldComponent from "./cTF";
import { transparentBlack } from "@/constants";
import { ApiCallProps, makeGetCall } from "@/app/db/api";
import { BACKEND_BASE_URL, GET_HOTELS } from "@/app/db/Routes";
import { Hotel } from "@/app/type/Hotel";
import { TabPanel } from "@/app/admin/dashboard";
import Marquee from "react-fast-marquee";
import { edgeServerAppPaths } from "next/dist/build/webpack/plugins/pages-manifest-plugin";
import { escape } from "querystring";

const CustomPackageForm = () => {
  const [step, setStep] = useState(1);
  interface FormData {
    name: string;
    tourDays: string;
    flightFrom: string;
    country: string;
    city: string;
    numberOfTravelers: string;
    numberOfNightsMakkah: string;
    numberOfNightsMadinah: string;
    phone: string;
    email: string;
    departureDate: Date | null;
    returnDate: Date | null;
    additionalComments: string;
  }
  const [formData, setFormData] = useState<FormData>({
    name: "",
    tourDays: "",
    flightFrom: "",
    country: "",
    city: "",
    numberOfTravelers: "10",
    numberOfNightsMakkah: "10",
    numberOfNightsMadinah: "10",
    phone: "",
    email: "",
    additionalComments: "",
    departureDate: null,
    returnDate: null,
  });

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log(formData);
  };
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  function checkNextButton() {
    var check = false;
    check =
      formData.city == "" ||
      formData.country == "" ||
      formData.flightFrom == "" ||
      formData.email == "" ||
      formData.name == "" ||
      formData.numberOfNightsMadinah == "" ||
      formData.numberOfNightsMakkah == "" ||
      formData.phone == "" ||
      formData.tourDays == "" ||
      formData.numberOfTravelers == "";
    console.log(formData);
    return !check;
  }

  const [hotels, setHotels] = useState<Array<Hotel>>();

  function loadHotels() {
    const props: ApiCallProps = {
      postUrl: GET_HOTELS,
      data: undefined,
      onStart: function (): void {
        //(true);
      },
      onProgressEnd: function (): void {
        //setLoading(false);
      },
      onSuccess: function (res: any) {
        console.log(res);
        setHotels(res.map((hotel: any) => Hotel.fromJSON(hotel)));
      },
      onUnexpected: function (res: any) {
        console.log("Unexpected Result:", res);
      },
    };

    makeGetCall(props);
  }

  useEffect(loadHotels, []);

  const [madinaSelectedHotel, setMadinaSelectedHotel] = useState<Hotel>();
  const [makkahSelectedHotel, setMakkahSelectedHotel] = useState<Hotel>();
  function formatNumber(num: number): string {
    const suffixes = ["", "K", "M", "B", "T"];
    const magnitude = Math.floor(Math.log10(Math.abs(num)) / 3);
    const rounded = num / Math.pow(10, magnitude * 3);
    const suffix = suffixes[magnitude];

    return rounded.toFixed(1) + suffix;
  }
  function getHotelTotal(e: Hotel) {
    var value = 0.0;
    value =
      parseInt(formData.numberOfNightsMadinah) *
      parseInt(formData.numberOfTravelers) *
      e.charges;
    return formatNumber(value) + "" + e.currency;
  }

  function getStats() {
    var value = 0.0;
    var expression = "";
    if (madinaSelectedHotel != undefined) {
      value +=
        parseFloat(formData.numberOfNightsMadinah) *
        parseFloat(formData.numberOfTravelers) *
        madinaSelectedHotel!.charges;
      expression +=
        " " +
        formData.numberOfNightsMadinah +
        " x " +
        madinaSelectedHotel!.charges;
    }
    if (makkahSelectedHotel != undefined) {
      value +=
        parseFloat(formData.numberOfNightsMakkah) *
        makkahSelectedHotel!.charges;
      expression +=
        " " +
        formData.numberOfNightsMakkah +
        " x " +
        makkahSelectedHotel!.charges;
    } else {
    }

    return { total: value, expression: expression };
  }

  return (
    <div className="flex w-full flex-col">
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Layout */}
      {/* ------------------------------------------------------------------------------------------------ */}

      <div className="flex gap-4 mb-4 ">
        {step != 1 && (
          <div
            onClick={() => setStep(step - 1)}
            className="w-10 h-10 mb-3 center flex items-center justify-center px-2 py-1 hover:shadow-md hover:cursor-pointer hover:shadow-white hover:text-black rounded-lg border-white border-[2px]"
          >
            <ArrowBackIos htmlColor="white" />
          </div>
        )}
        <span className=" text-white  w-full">
          {step == 1 ? (
            <span className="bold-54 font-bold text-3xl">"Enter Details" </span>
          ) : (
            ""
          )}
          {step == 2 ? (
            <div className=" flexBetween ">
              <span className="bold-54 font-bold text-3xl">Select Hotels</span>
              {(makkahSelectedHotel || madinaSelectedHotel) && (
                <div className="flex flex-col">
                  <div className="text-[16px] font-normal flex gap-2">
                    <span className=" w-44 flex">Nights In Makkah</span>
                    <span>{formData.numberOfNightsMakkah}</span>
                  </div>
                  <div className="text-[16px] font-normal flex gap-2">
                    <span className=" w-44 flex">Nights In Madinah</span>
                    <span>{formData.numberOfNightsMakkah}</span>
                  </div>
                  <div className="text-[16px] font-normal flex gap-2">
                    <span className=" w-44 flex">Travelers</span>
                    <span>{formData.numberOfTravelers}</span>
                  </div>
                  <div className="text-[16px]  font-normal flex gap-2">
                    <span className=" w-44">Total</span>
                    <span className="font-bold text-[20px]">
                      {getStats().total} USD
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
          {step == 3 ? (
            <div className=" flexBetween ">
              <span className="bold-54 font-bold text-3xl">Submit Now</span>
              {(makkahSelectedHotel || madinaSelectedHotel) && (
                <div className="flex flex-col">
                  <div className="text-[16px] font-normal flex gap-2">
                    <span className=" w-44 flex">Nights In Makkah</span>
                    <span>{formData.numberOfNightsMakkah}</span>
                  </div>
                  <div className="text-[16px] font-normal flex gap-2">
                    <span className=" w-44 flex">Nights In Madinah</span>
                    <span>{formData.numberOfNightsMakkah}</span>
                  </div>
                  <div className="text-[16px] font-normal flex gap-2">
                    <span className=" w-44 flex">Travelers</span>
                    <span>{formData.numberOfTravelers}</span>
                  </div>
                  <div className="text-[16px]  font-normal flex gap-2">
                    <span className=" w-44">Total</span>
                    <span className="font-bold text-[20px]">
                      {getStats().total} USD
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </span>
      </div>

      {step == 1 && (
        <Grid container spacing={2}>
          {/* 1 */}

          <Grid item sm={8}>
            <CustomTextFieldComponent
              label="Your Name"
              textColor="white"
              backgroundColor={transparentBlack}
              hintColor="white"
              onChange={(e) => handleChange("name", e)}
              val={formData.name}
            />
          </Grid>
          <Grid item sm={4}>
            <CustomTextFieldComponent
              label="Tour Days"
              textColor="white"
              backgroundColor={transparentBlack}
              hintColor="white"
              onChange={(e) => handleChange("tourDays", e)}
              val={formData.tourDays}
            />
          </Grid>
          <Grid item sm={4}>
            <CustomTextFieldComponent
              label="Flight From (Airport Name)"
              textColor="white"
              backgroundColor={transparentBlack}
              hintColor="white"
              onChange={(e) => handleChange("flightFrom", e)}
              val={formData.flightFrom}
            />
          </Grid>
          <Grid item sm={4}>
            <CustomTextFieldComponent
              label="Your Country"
              textColor="white"
              backgroundColor={transparentBlack}
              hintColor="white"
              onChange={(e) => handleChange("country", e)}
              val={formData.country}
            />
          </Grid>
          <Grid item sm={4}>
            <CustomTextFieldComponent
              label="Your City"
              textColor="white"
              backgroundColor={transparentBlack}
              hintColor="white"
              onChange={(e) => handleChange("city", e)}
              val={formData.city}
            />
          </Grid>
          <Grid item sm={4}>
            <CustomTextFieldComponent
              label="Number Of Travelers"
              textColor="white"
              backgroundColor={transparentBlack}
              hintColor="white"
              onChange={(e) => handleChange("numberOfTravelers", e)}
              val={formData.numberOfTravelers}
            />
          </Grid>
          <Grid item sm={4}>
            <CustomTextFieldComponent
              label="Number Of Nights (In Makkah)"
              textColor="white"
              backgroundColor={transparentBlack}
              hintColor="white"
              onChange={(e) => handleChange("numberOfNightsMakkah", e)}
              val={formData.numberOfNightsMakkah}
            />
          </Grid>
          <Grid item sm={4}>
            <CustomTextFieldComponent
              label="Number Of Nights (In Madinah)"
              textColor="white"
              backgroundColor={transparentBlack}
              hintColor="white"
              onChange={(e) => handleChange("numberOfNightsMadinah", e)}
              val={formData.numberOfNightsMadinah}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextFieldComponent
              label="Your Phone"
              textColor="white"
              backgroundColor={transparentBlack}
              hintColor="white"
              onChange={(e) => handleChange("phone", e)}
              val={formData.phone}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextFieldComponent
              label="Your Email"
              textColor="white"
              backgroundColor={transparentBlack}
              onChange={(e) => handleChange("email", e)}
              val={formData.email}
              hintColor="white"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomTextFieldComponent
              label="Additional Comments"
              textColor="white"
              backgroundColor={transparentBlack}
              onChange={(e) => handleChange("additionalComments", e)}
              val={formData.additionalComments}
              hintColor="white"
            />
          </Grid>

          <Grid item xs={12} sm={3}></Grid>
          <Grid item xs={12} sm={12}>
            <div
              onClick={() => {
                if (checkNextButton()) {
                  setStep(step + 1);
                }
              }}
              className="hover:cursor-pointer hover:shadow-white hover:shadow-sm bg-white rounded-lg px-3 py-2 w-44 text-center "
            >
              NEXT
            </div>
          </Grid>
        </Grid>
      )}
      {step == 2 && (
        <div>
          {false && (
            <div className="w-full h-40 justify-center flex flex-col items-center  ">
              <CircularProgress
                size={70}
                sx={{
                  color: "orange",
                  borderRadius: 20,
                  borderWidth: 3,
                  padding: 1,
                }}
              />
            </div>
          )}
          {true && (
            <div className="w-full mb-10 ">
              <Tabs onChange={handleTabChange}>
                <Tab
                  sx={{ textTransform: "none", padding: 0, marginX: 1 }}
                  component="h1"
                  icon={
                    <div
                      className={`  items-center flex-center flex rounded-md ${
                        tabValue == 0
                          ? "bg-white text-black"
                          : " text-slate-200"
                      } px-6 py-2  text-[20px]`}
                    >
                      <span className="mx-2 ">In Makkah</span>
                    </div>
                  }
                  className="flex flex-row"
                />
                <Tab
                  sx={{ textTransform: "none", padding: 0, marginX: 1 }}
                  component="h1"
                  icon={
                    <div
                      className={` flex-row items-center flex-center flex rounded-md ${
                        tabValue == 1
                          ? "bg-white text-black"
                          : " text-slate-200"
                      } px-6 py-2  text-[20px]`}
                    >
                      <span className="mx-2 ">In Madina</span>
                    </div>
                  }
                  className="flex flex-row "
                />
              </Tabs>
              <div>
                <TabPanel value={tabValue} index={0}>
                  <div className="flex flex-col mt-2">
                    {hotels != null
                      ? hotels!
                          .filter(
                            (e) =>
                              e.location.includes("makkah") ||
                              e.location.includes("Makkah") ||
                              e.location.includes("macca") ||
                              e.location.includes("meccah")
                          )
                          .map((e) => (
                            <div className="w-full flex-row flex gap-4 my-2 font-bold mx-4 bg-white rounded-xl p-2 ">
                              <div className="flex flex-row gap-3">
                                <img
                                  className="w-62 h-44 min-h-62 min-w-62 rounded-xl"
                                  src={BACKEND_BASE_URL + e.image}
                                />
                                <div className="gap-2 flex-col">
                                  <span className="text-[25px]">{e.name}</span>
                                  <div className="gap-2 flex ">
                                    <span className="font-normal text-[20px]">
                                      {parseFloat(e.rating.toString()).toFixed(
                                        1
                                      ) + "/5.0 Ratings"}
                                    </span>
                                  </div>
                                  <span className="text-[25px] text-red-500 font-bold">
                                    {e.currency + e.charges}
                                  </span>{" "}
                                  <span className="font-normal ">
                                    Per Night
                                  </span>
                                  <div className="flex flex-row gap-2 mt-2">
                                    <div className="flex flex-row gap-2 font-normal text-white text-[14px] justify-center bg-sky-600 rounded-full py-1 px-4">
                                      <span>Dinner</span>
                                    </div>
                                    <div className="flex flex-row gap-2 font-normal text-white text-[14px] bg-green-600 rounded-full py-1 px-4">
                                      <span>Breakfast</span>
                                    </div>
                                    <div className="flex flex-row gap-2 font-normal text-white text-[14px] bg-indigo-400 rounded-full py-1 px-4">
                                      <span>Wifi</span>
                                    </div>
                                    <div
                                      onClick={() =>
                                        window.open("tel:+" + e.phone)
                                      }
                                      className="flex flex-row gap-2 font-normal hover:cursor-pointer text-white text-[14px] bg-black rounded-full py-1 px-4"
                                    >
                                      <span>Helpline</span>
                                    </div>
                                    <a
                                      target="_top"
                                      href={"mailto:" + e.email}
                                      className="flex flex-row gap-2 font-normal hover:cursor-pointer text-white text-[14px] bg-orange-500 rounded-full py-1 px-4"
                                    >
                                      Email
                                    </a>
                                  </div>
                                  <div className="flex flex-row gap-2 mt-2">
                                    <Marquee>{e.description}</Marquee>
                                  </div>
                                </div>
                              </div>

                              <div
                                onClick={() => {
                                  if (
                                    makkahSelectedHotel != null &&
                                    e.id == makkahSelectedHotel.id
                                  ) {
                                    setMakkahSelectedHotel(undefined);
                                    return;
                                  }
                                  setMakkahSelectedHotel(e);
                                }}
                                className=" flex h-[40px] hover:cursor-pointer hover:shadow-white hover:shadow-sm bg-black text-white rounded-lg px-3 py-2  text-center "
                              >
                                {makkahSelectedHotel == null
                                  ? "SELECT"
                                  : makkahSelectedHotel.id == e.id
                                  ? getHotelTotal(e)
                                  : "SELECT"}
                              </div>
                            </div>
                          ))
                      : ""}
                  </div>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <div className="flex flex-col mt-2">
                    {hotels != null
                      ? hotels!
                          .filter(
                            (e) =>
                              e.location.includes("madina") ||
                              e.location.includes("Madinah") ||
                              e.location.includes("madina") ||
                              e.location.includes("Madinaa")
                          )
                          .map((e) => (
                            <div className="w-full flex-row flex gap-4 my-2 font-bold mx-4 bg-white rounded-xl p-2 ">
                              <div className="flex flex-row gap-3">
                                <img
                                  className="w-62 h-44 min-h-62 min-w-62 rounded-xl"
                                  src={BACKEND_BASE_URL + e.image}
                                />
                                <div className="gap-2 flex-col">
                                  <span className="text-[25px]">{e.name}</span>
                                  <div className="gap-2 flex ">
                                    <span className="font-normal text-[20px]">
                                      {parseFloat(e.rating.toString()).toFixed(
                                        1
                                      ) + "/5.0 Ratings"}
                                    </span>
                                  </div>
                                  <span className="text-[25px] text-red-500 font-bold">
                                    {e.currency + e.charges}
                                  </span>{" "}
                                  <span className="font-normal ">
                                    Per Night
                                  </span>
                                  <div className="flex flex-row gap-2 mt-2">
                                    <div className="flex flex-row gap-2 font-normal text-white text-[14px] justify-center bg-sky-600 rounded-full py-1 px-4">
                                      <span>Dinner</span>
                                    </div>
                                    <div className="flex flex-row gap-2 font-normal text-white text-[14px] bg-green-600 rounded-full py-1 px-4">
                                      <span>Breakfast</span>
                                    </div>
                                    <div className="flex flex-row gap-2 font-normal text-white text-[14px] bg-indigo-400 rounded-full py-1 px-4">
                                      <span>Wifi</span>
                                    </div>
                                    <div
                                      onClick={() =>
                                        window.open("tel:+" + e.phone)
                                      }
                                      className="flex flex-row gap-2 font-normal hover:cursor-pointer text-white text-[14px] bg-black rounded-full py-1 px-4"
                                    >
                                      <span>Helpline</span>
                                    </div>
                                    <a
                                      target="_top"
                                      href={"mailto:" + e.email}
                                      className="flex flex-row gap-2 font-normal hover:cursor-pointer text-white text-[14px] bg-orange-500 rounded-full py-1 px-4"
                                    >
                                      Email
                                    </a>
                                  </div>
                                  <div className="flex flex-row gap-2 mt-2">
                                    <Marquee>{e.description}</Marquee>
                                  </div>
                                </div>
                              </div>

                              <div
                                onClick={() => {
                                  if (
                                    madinaSelectedHotel != null &&
                                    e.id == madinaSelectedHotel.id
                                  ) {
                                    setMadinaSelectedHotel(undefined);
                                    return;
                                  }
                                  setMadinaSelectedHotel(e);
                                }}
                                className=" flex h-[40px] hover:cursor-pointer hover:shadow-white hover:shadow-sm bg-black text-white rounded-lg px-3 py-2  text-center "
                              >
                                {madinaSelectedHotel == null
                                  ? "SELECT"
                                  : madinaSelectedHotel.id == e.id
                                  ? getHotelTotal(e)
                                  : "SELECT"}
                              </div>
                            </div>
                          ))
                      : ""}
                  </div>
                </TabPanel>
              </div>
            </div>
          )}
          <div
            onClick={() => {
              setStep(3);
            }}
            className="hover:cursor-pointer hover:shadow-white hover:shadow-sm bg-white rounded-lg px-3 py-2 w-44 text-center "
          >
            NEXT
          </div>
        </div>
      )}
      {step == 3 && (
        <div>
          {true && (
            <div className="flex flex-row">
              {" "}
              <div className="w-full h-40 justify-center flex flex-col items-center  gap-2 ">
                <img
                  className="w-22 h-32 rounded-xl"
                  src={
                    "https://amzirlodp-prd-s3.s3.amazonaws.com/documents/images/big_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg"
                  }
                />
                <h1 className="text-white">Sample Form</h1>
              </div>

              <div className="mt-10 rounded-xl justify-center items-center center h-[40px] w-72 bg-white text-black px-5 py-2">
                SELECT DOCUMENT
                </div>
            </div>
          )}

          <div
            onClick={() => {}}
            className="hover:cursor-pointer hover:shadow-white hover:shadow-sm bg-white rounded-lg px-3 py-2 w-44 text-center "
          >
            Submit
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomPackageForm;
