import React, { useRef, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { UmrahPackage } from "../type/UmrahPackage";
import { IconCameraPlus, IconList } from "@tabler/icons-react";
import Image from "next/image";

interface AddPackageDialogProps {
    packageToAdd: UmrahPackage | undefined;
    setPackageToAdd: React.Dispatch<
        React.SetStateAction<UmrahPackage | undefined>
    >;
    addPackage: (packageData: UmrahPackage) => void;
}

function AddPackageDialog({
    packageToAdd,
    setPackageToAdd,
    addPackage,
}: AddPackageDialogProps) {
    const [packageData, setPackageData] = useState<UmrahPackage>(UmrahPackage.getInitialData());

    const handleChange = (
        e: any
    ) => {
        const { name, value, type, checked } = e.target;

        setPackageData((prevState) => ({
            ...prevState,
            [name]: type == "checkbox" ? checked : value,
        }));
    };

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fieldName: string
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPackageData((prevState) => ({
                    ...prevState,
                    [fieldName]: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    function formatText(name: string, intitailValue: string) {
        var s = intitailValue;

        var value = s
            .replaceAll("○ ", "")
            .split("\n")
            .map((e, i) => `○ ${e}\n`);
        var sf = "";
        value.forEach((e) => {
            sf += e;
        });

        setPackageData((prevState) => ({
            ...prevState,
            [name]: sf,
        }));
    }
    function formatMainPoints() {
        var s = packageData.main_points;

        var value = s
            .replaceAll("○ ", "")
            .split("\n")
            .map((e, i) => `○ ${e}\n`);
        var sf = "";
        value.forEach((e) => {
            sf += e;
        });

        setPackageData((prevState) => ({
            ...prevState,
            ["main_points"]: sf,
        }));
    }

    const mainImagePicker = useRef<HTMLInputElement | null>(null);
    const madinaImagePicker = useRef<HTMLInputElement | null>(null);
    const makkahImagePicker = useRef<HTMLInputElement | null>(null);
    const transportImagePicker = useRef<HTMLInputElement | null>(null);
    const visaImagePicker = useRef<HTMLInputElement | null>(null);

    const pickMainImage = () => {
        if (mainImagePicker !== null) {
            mainImagePicker?.current?.click();
        }
    };
    const pickMadinaHotelImage = () => {
        if (madinaImagePicker !== null) {
            madinaImagePicker?.current?.click();
        }
    };
    const pickMakkahImage = () => {
        if (makkahImagePicker !== null) {
            makkahImagePicker?.current?.click();
        }
    };
    const pickVisaImage = () => {
        if (visaImagePicker !== null) {
            visaImagePicker?.current?.click();
        }
    };
    const pickTransportImage = () => {
        if (transportImagePicker != null) {
            transportImagePicker?.current?.click();
        }
    };

    return (
        <Dialog
            fullWidth
            fullScreen
            open={packageToAdd !== undefined}
            PaperProps={{ sx: { borderRadius: "0px", padding: 0 } }}
        >
            <DialogTitle sx={{ padding: 0 }}>
                <h1 className="flex flex-row items-center font-bold text-[25px] bg-yellow-50 p-3 text-black">
                    Add Package
                </h1>
            </DialogTitle>
            <DialogContent sx={{ padding: 5 }}>
                <div
                    className={`flex ${packageData.package_image ? "flex-col" : ""
                        } items-center w-full h-auto min-h-[300px] my-2 mt-10 rounded-xl shadow-sm bg-gray-100  shadow-2px shadow-gray-500 `}
                >
                    {packageData.package_image ? (
                        <Image
                            className="flex-1 w-auto h-auto  "
                            width={window.innerWidth}
                            height={window.innerHeight / 1.2}
                            alt="main"
                            src={packageData.package_image}
                        />
                    ) : (
                        <IconCameraPlus
                            onClick={pickMainImage}
                            className="flex-1 w-56 h-56  "
                        />
                    )}

                    {packageData.package_image ? (
                        <Button
                            onClick={() => {
                                setPackageData((prevState) => ({
                                    ...prevState,
                                    ["package_image"]: undefined,
                                }));
                            }}
                            variant="contained"
                            color="error"
                            sx={{ borderRadius: 10, marginY: 4 }}
                        >
                            Remove Image
                        </Button>
                    ) : (
                        ""
                    )}

                    <input
                        className="w-full h-[200px] hidden"
                        ref={mainImagePicker}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "package_image")}
                    />
                </div>
                <TextField
                    sx={{ marginTop: 4, marginBottom: 1 }}
                    id="name"
                    name="name"
                    label="Name"
                    multiline
                    minRows={2}
                    fullWidth
                    variant="outlined"
                    value={packageData.name}
                    onChange={handleChange}
                    color="warning"
                    InputProps={{
                        style: {
                            borderRadius: "16px",
                        },
                    }}
                />

                <TextField
                    sx={{ marginY: 1 }}
                    id="main_points"
                    helperText="This will be visible as tis, just below to the Package Name in Package Detail Screen"
                    FormHelperTextProps={{ sx: { fontSize: 17, color: "red" } }}
                    name="main_points"
                    label="Main Points"
                    minRows={5}
                    multiline
                    fullWidth
                    variant="outlined"
                    value={packageData.main_points}
                    onChange={handleChange}
                    color="warning"
                    InputProps={{
                        style: {
                            borderRadius: "16px",
                        },

                        endAdornment: (
                            <IconList
                                onClick={() =>
                                    formatText("main_points", packageData.main_points)
                                }
                                size={40}
                                color="white"
                                className=" rounded-xl text-3xl bg-orange-500 px-2 py-2  hover:cursor-pointer"
                            />
                        ),
                    }}
                />

                <div className="flex gap-4 mt-2">
                    <TextField
                        sx={{ marginY: 1 }}
                        id="currency"
                        name="currency"
                        label="Currency"
                        fullWidth
                        variant="outlined"
                        value={packageData.currency}
                        onChange={handleChange}
                        color="warning"
                        InputProps={{
                            style: {
                                borderRadius: "16px",
                            },
                        }}
                    />
                    <TextField
                        sx={{ marginY: 1 }}
                        id="price_single"
                        name="price_single"
                        label="Single Price"
                        fullWidth
                        variant="outlined"
                        value={packageData.price_single}
                        onChange={handleChange}
                        color="warning"
                        InputProps={{
                            style: {
                                borderRadius: "16px",
                            },
                            endAdornment: (
                                <span>{(packageData?.currency ?? "").toUpperCase()}</span>
                            ),
                        }}
                    />
                    <TextField
                        sx={{ marginY: 1 }}
                        id="price_quad"
                        name="price_quad"
                        label="Quad Price"
                        fullWidth
                        variant="outlined"
                        value={packageData.price_quad}
                        inputMode="text"
                        onChange={handleChange}
                        color="warning"
                        InputProps={{
                            style: {
                                borderRadius: "16px",
                            },
                            endAdornment: (
                                <span>{(packageData?.currency ?? "").toUpperCase()}</span>
                            ),
                        }}
                    />

                    <TextField
                        sx={{ marginY: 1 }}
                        id="price_double"
                        name="price_double"
                        label="Double Price"
                        fullWidth
                        variant="outlined"
                        value={packageData.price_double}
                        onChange={handleChange}
                        color="warning"
                        InputProps={{
                            style: {
                                borderRadius: "16px",
                            },
                            endAdornment: (
                                <span>{(packageData?.currency ?? "").toUpperCase()}</span>
                            ),
                        }}
                    />
                    <TextField
                        sx={{ marginY: 1 }}
                        id="price_tripple"
                        name="price_tripple"
                        label="Tripple Price"
                        fullWidth
                        variant="outlined"
                        value={packageData.price_tripple}
                        onChange={handleChange}
                        color="warning"
                        InputProps={{
                            style: {
                                borderRadius: "16px",
                            },
                            endAdornment: (
                                <span>{(packageData?.currency ?? "").toUpperCase()}</span>
                            ),
                        }}
                    />
                </div>
                <TextField
                    sx={{ marginY: 1 }}
                    id="what_to_expect"
                    name="what_to_expect"
                    label="What to Expect"
                    fullWidth
                    variant="outlined"
                    value={packageData.what_to_expect}
                    onChange={handleChange}
                    helperText="This will be visible as tis in Package Detail Screen"
                    FormHelperTextProps={{ sx: { fontSize: 17, color: "red" } }}
                    color="warning"
                    multiline
                    minRows={4}
                    InputProps={{
                        style: {
                            borderRadius: "16px",
                        },
                        endAdornment: (
                            <IconList
                                onClick={() =>
                                    formatText("what_to_expect", packageData.what_to_expect)
                                }
                                size={40}
                                color="white"
                                className=" rounded-xl text-3xl bg-orange-500 px-2 py-2  hover:cursor-pointer"
                            />
                        ),
                    }}
                />




                <div className="  my-5">

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={packageData.ticket_enabled}
                                onChange={handleChange}
                                name="ticket_enabled"
                            />
                        }
                        label="Ticket"
                    />

                    {packageData?.ticket_enabled ? <FormControlLabel
                        control={
                            <Checkbox
                                checked={packageData.is_roundtrip}
                                onChange={handleChange}
                                name="is_roundtrip"
                            />
                        }
                        label="Two Way Ticket"
                    /> : ''}

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={packageData.breakfast_enabled}
                                onChange={handleChange}
                                name="breakfast_enabled"
                            />
                        }
                        label="Breakfast"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={packageData.dinner_enabled}
                                onChange={handleChange}
                                name="dinner_enabled"
                            />
                        }
                        label="Dinner"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={packageData.ziyarat}
                                onChange={handleChange}
                                name="ziyarat"
                            />
                        }
                        label="Ziyarat"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={packageData.guide}
                                onChange={handleChange}
                                name="guide"
                            />
                        }
                        label="Guide"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={packageData.visa_enabled
                                }
                                onChange={handleChange}
                                name="visa_enabled"
                            />
                        }
                        label="Visa"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={packageData.hotel_madina_enabled}
                                onChange={handleChange}
                                name="hotel_madina_enabled"
                            />
                        }
                        label="Hotel In Madina"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={packageData.hotel_makkah_enabled}
                                onChange={handleChange}
                                name="hotel_makkah_enabled"
                            />
                        }
                        label="Hotel In Makkah"
                    />

                    <FormControlLabel

                        control={
                            <Checkbox
                                checked={packageData.transport_enabled}
                                onChange={handleChange}
                                name="transport_enabled"
                            />
                        }
                        label="Transport In Suadi"
                    />

                </div>
                {packageData.hotel_makkah_enabled ? <div>
                    <TextField
                        sx={{ marginY: 1 }}
                        id="hotel_makkah_name"
                        name="hotel_makkah_name"
                        label="Makkah Hotel Name"
                        fullWidth
                        variant="outlined"
                        value={packageData.hotel_makkah_name}
                        onChange={handleChange}
                        color="warning"
                        InputProps={{
                            style: {
                                borderRadius: "16px",
                            },
                        }}
                    />
                    <TextField
                        sx={{ marginY: 1 }}
                        id='hotel_makkah_detail'
                        name="hotel_makkah_detail"
                        label="Makkah Hotel Detail"
                        fullWidth
                        variant="outlined"
                        value={packageData.hotel_makkah_detail}
                        onChange={handleChange}
                        color="warning"
                        multiline
                        minRows={10}
                        InputProps={{
                            style: {
                                borderRadius: "16px",
                            },
                            endAdornment: (
                                <div className="flex flex-row gap-10 items-center">
                                    <IconList
                                        onClick={() =>
                                            formatText(
                                                "hotel_makkah_detail",
                                                packageData.hotel_makkah_detail
                                            )
                                        }
                                        size={40}
                                        color="white"
                                        className=" rounded-xl text-3xl bg-orange-500 px-2 py-2  hover:cursor-pointer"
                                    />
                                    <div
                                        className={`flex ${packageData.hotel_makkah_image ? "flex-col" : ""
                                            } items-center w-[300px] h-auto me-4 rounded-xl shadow-sm bg-gray-100  shadow-2px shadow-gray-500 `}
                                    >
                                        {packageData.hotel_makkah_image ? (
                                            <div className="flex flex-row gap-2 mt-2">
                                                <Image
                                                    className="flex-1 w-[100px] h-auto  "
                                                    width={window.innerWidth}
                                                    height={window.innerHeight / 1.2}
                                                    alt="main"
                                                    src={packageData.hotel_makkah_image}
                                                />


                                            </div>
                                        ) : (
                                            <IconCameraPlus className="flex-1 w-56 h-44 cursor-pointer " onClick={pickMakkahImage} />
                                        )}



                                        {packageData.hotel_makkah_image ? (
                                            <Button
                                                onClick={() => {
                                                    setPackageData((prevState) => ({
                                                        ...prevState,
                                                        ["hotel_makkah_image"]: undefined,
                                                    }));
                                                }}
                                                variant="contained"
                                                color="error"
                                                sx={{ borderRadius: 10, marginY: 4 }}
                                            >
                                                Remove Image
                                            </Button>
                                        ) : (
                                            ""
                                        )}

                                        <input
                                            className="w-full h-[150px] hidden"
                                            ref={makkahImagePicker}
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, "hotel_makkah_image")}
                                        />
                                    </div>
                                </div>
                            ),
                        }}
                    />
                </div> : ""}
                {packageData.hotel_madina_enabled ? <div>  <TextField
                    sx={{ marginY: 1 }}
                    id="hotel_madina_name"
                    name="hotel_madina_name"
                    label="Madina Hotel Name"
                    fullWidth
                    variant="outlined"
                    value={packageData.hotel_madina_name}
                    onChange={handleChange}
                    color="warning"
                    InputProps={{
                        style: {
                            borderRadius: "16px",
                        },
                    }}
                />

                    <TextField
                        sx={{ marginY: 1 }}
                        id="hotel_madina_detail"
                        name="hotel_madina_detail"
                        label="Madina Hotel Detail"
                        fullWidth
                        multiline
                        minRows={10}
                        variant="outlined"
                        value={packageData.hotel_madina_detail}
                        onChange={handleChange}
                        color="warning"
                        InputProps={{
                            style: {
                                borderRadius: "16px",
                            },
                            endAdornment: (
                                <div className="flex flex-row gap-10 items-center">
                                    <IconList
                                        onClick={() =>
                                            formatText(
                                                "hotel_madina_detail",
                                                packageData.hotel_madina_detail
                                            )
                                        }
                                        size={40}
                                        color="white"
                                        className=" rounded-xl text-3xl bg-orange-500 px-2 py-2  hover:cursor-pointer"
                                    />
                                    <div
                                        className={`flex ${packageData.hotel_madina_image ? "flex-col" : ""
                                            } items-center w-[300px] h-auto me-4 rounded-xl shadow-sm bg-gray-100  shadow-2px shadow-gray-500 `}
                                    >
                                        {packageData.hotel_madina_image ? (
                                            <div className="flex flex-row gap-2 mt-2">
                                                <Image
                                                    className="flex-1 w-[100px] h-auto  "
                                                    width={window.innerWidth}
                                                    height={window.innerHeight / 1.2}
                                                    alt="main"
                                                    src={packageData.hotel_madina_image}
                                                />


                                            </div>
                                        ) : (
                                            <IconCameraPlus className="flex-1 w-56 h-44 cursor-pointer " onClick={pickMadinaHotelImage} />
                                        )}



                                        {packageData.hotel_madina_image ? (
                                            <Button
                                                onClick={() => {
                                                    setPackageData((prevState) => ({
                                                        ...prevState,
                                                        ["hotel_madina_image"]: undefined,
                                                    }));
                                                }}
                                                variant="contained"
                                                color="error"
                                                sx={{ borderRadius: 10, marginY: 4 }}
                                            >
                                                Remove Image
                                            </Button>
                                        ) : (
                                            ""
                                        )}

                                        <input
                                            className="w-full h-[150px] hidden"
                                            ref={madinaImagePicker}
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, "hotel_madina_image")}
                                        />
                                    </div>
                                </div>
                            ),
                        }}
                    /></div> : ""}

                {packageData.visa_enabled ? <div>  <TextField
                    sx={{ marginY: 1 }}
                    id="visa_title"
                    name="visa_title"
                    label="Visa Title"
                    fullWidth
                    variant="outlined"
                    value={packageData.visa_title}
                    onChange={handleChange}
                    color="warning"
                    InputProps={{
                        style: {
                            borderRadius: "16px",
                        },
                    }}
                />
                    <TextField
                        sx={{ marginY: 1 }}
                        id="visa_detail"
                        name="visa_detail"
                        label="Visa Detail"
                        fullWidth
                        multiline
                        minRows={10}
                        variant="outlined"
                        value={packageData.visa_detail}
                        onChange={handleChange}
                        color="warning"
                        InputProps={{
                            style: {
                                borderRadius: "16px",
                            },
                            endAdornment: (
                                <div className="flex flex-row gap-10 items-center">
                                    <IconList
                                        onClick={() =>
                                            formatText(
                                                "visa_detail",
                                                packageData.visa_detail
                                            )
                                        }
                                        size={40}
                                        color="white"
                                        className=" rounded-xl text-3xl bg-orange-500 px-2 py-2  hover:cursor-pointer"
                                    />
                                    <div
                                        className={`flex ${packageData.visa_image ? "flex-col" : ""
                                            } items-center w-[300px] h-auto me-4 rounded-xl shadow-sm bg-gray-100  shadow-2px shadow-gray-500 `}
                                    >
                                        {packageData.visa_image ? (
                                            <div className="flex flex-row gap-2 mt-2">
                                                <Image
                                                    className="flex-1 w-[100px] h-auto  "
                                                    width={window.innerWidth}
                                                    height={window.innerHeight / 1.2}
                                                    alt="main"
                                                    src={packageData.visa_image}
                                                />


                                            </div>
                                        ) : (
                                            <IconCameraPlus className="flex-1 w-56 h-44 cursor-pointer " onClick={pickVisaImage} />
                                        )}



                                        {packageData.visa_image ? (
                                            <Button
                                                onClick={() => {
                                                    setPackageData((prevState) => ({
                                                        ...prevState,
                                                        ["visa_image"]: undefined,
                                                    }));
                                                }}
                                                variant="contained"
                                                color="error"
                                                sx={{ borderRadius: 10, marginY: 4 }}
                                            >
                                                Remove Image
                                            </Button>
                                        ) : (
                                            ""
                                        )}

                                        <input
                                            className="w-full h-[150px] hidden"
                                            ref={visaImagePicker}
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, "visa_image")}
                                        />
                                    </div>
                                </div>
                            ),
                        }}
                    />
                </div> : ''}

                {packageData.transport_enabled ? <div>    <TextField
                    sx={{ marginY: 1 }}
                    id="trans_title"
                    name="trans_title"
                    label="Transportation Title"
                    fullWidth
                    variant="outlined"
                    value={packageData.trans_title}
                    onChange={handleChange}
                    color="warning"
                    InputProps={{
                        style: {
                            borderRadius: "16px",
                        },
                    }}
                />
                    <TextField
                        sx={{ marginY: 1 }}
                        id="trans_detail"
                        name="trans_detail"
                        label="Trasportation Detail"
                        fullWidth
                        multiline
                        minRows={10}
                        variant="outlined"
                        value={packageData.trans_detail}
                        onChange={handleChange}
                        color="warning"
                        InputProps={{
                            style: {
                                borderRadius: "16px",
                            },
                            endAdornment: (
                                <div className="flex flex-row gap-10 items-center">
                                    <IconList
                                        onClick={() =>
                                            formatText(
                                                "trans_detail",
                                                packageData.trans_detail
                                            )
                                        }
                                        size={40}
                                        color="white"
                                        className=" rounded-xl text-3xl bg-orange-500 px-2 py-2  hover:cursor-pointer"
                                    />
                                    <div
                                        className={`flex ${packageData.trans_image ? "flex-col" : ""
                                            } items-center w-[300px] h-auto me-4 rounded-xl shadow-sm bg-gray-100  shadow-2px shadow-gray-500 `}
                                    >
                                        {packageData.trans_image ? (
                                            <div className="flex flex-row gap-2 mt-2">
                                                <Image
                                                    className="flex-1 w-[100px] h-auto  "
                                                    width={window.innerWidth}
                                                    height={window.innerHeight / 1.2}
                                                    alt="main"
                                                    src={packageData.trans_image}
                                                />


                                            </div>
                                        ) : (
                                            <IconCameraPlus className="flex-1 w-56 h-44 cursor-pointer " onClick={pickTransportImage} />
                                        )}



                                        {packageData.trans_image ? (
                                            <Button
                                                onClick={() => {
                                                    setPackageData((prevState) => ({
                                                        ...prevState,
                                                        ["trans_image"]: undefined,
                                                    }));
                                                }}
                                                variant="contained"
                                                color="error"
                                                sx={{ borderRadius: 10, marginY: 4 }}
                                            >
                                                Remove Image
                                            </Button>
                                        ) : (
                                            ""
                                        )}

                                        <input
                                            className="w-full h-[150px] hidden"
                                            ref={transportImagePicker}
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, "trans_image")}
                                        />
                                    </div>
                                </div>
                            ),
                        }}
                    />
                </div> : ''}

                <TextField
                    sx={{ marginY: 1 }}
                    id="nights_makkah"
                    name="nights_makkah"
                    label="Nights in Makkah"
                    fullWidth
                    variant="outlined"
                    type="number"
                    value={packageData.nights_makkah}
                    onChange={handleChange}
                    color="warning"
                    InputProps={{
                        style: {
                            borderRadius: "16px",
                        },
                    }}
                />
                <TextField
                    sx={{ marginY: 1 }}
                    id="nights_madina"
                    name="nights_madina"
                    label="Nights in Madina"
                    fullWidth
                    variant="outlined"
                    type="number"
                    value={packageData.nights_madina}
                    onChange={handleChange}
                    color="warning"
                    InputProps={{
                        style: {
                            borderRadius: "16px",
                        },
                    }}
                />
                <TextField
                    sx={{ marginY: 1 }}
                    id="nights"
                    name="nights"
                    label="Total Nights"
                    fullWidth
                    variant="outlined"
                    type="number"
                    value={packageData.nights}
                    onChange={handleChange}
                    color="warning"
                    InputProps={{
                        style: {
                            borderRadius: "16px",
                        },
                    }}
                />

                <div className="flex flex-row gap-2">
                    <TextField
                        sx={{ marginY: 1 }}
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        variant="outlined"
                        value={packageData.email}
                        onChange={handleChange}
                        color="warning"
                        InputProps={{
                            style: {
                                borderRadius: "16px",
                            },
                        }}
                    />
                    <TextField
                        sx={{ marginY: 1 }}
                        id="whatsapp"
                        name="whatsapp"
                        label="Whatsapp"
                        fullWidth
                        variant="outlined"
                        value={packageData.whatsapp}
                        onChange={handleChange}
                        color="warning"
                        InputProps={{
                            style: {
                                borderRadius: "16px",
                            },
                        }}
                    />
                    <TextField
                        sx={{ marginY: 1 }}
                        id="phone"
                        name="phone"
                        label="Phone"
                        fullWidth
                        variant="outlined"
                        value={packageData.phone}
                        onChange={handleChange}
                        color="warning"
                        InputProps={{
                            style: {
                                borderRadius: "16px",
                            },
                        }}
                    />
                </div>
            </DialogContent>

            <DialogActions sx={{ paddingBottom: 3 }}>
                <Button
                    onClick={() => addPackage(packageData)}
                    sx={{ borderRadius: 10, paddingX: 6, backgroundColor: "orange" }}
                    variant="contained"
                >
                    Add
                </Button>
                <Button
                    onClick={() => setPackageToAdd(undefined)}
                    sx={{ borderRadius: 10, paddingX: 6 }}
                    variant="contained"
                    color="error"
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddPackageDialog;
