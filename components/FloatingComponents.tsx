'use client'

import Email from "@mui/icons-material/Email";
import Button from "./Button";
import CallIcon from '@mui/icons-material/Call';
import Space from "./Space";
export default function FloatingComponents() {

    return (
        <div className="flex " >
            <div
                className="fixed bottom-5 right-5 shadow-lg z-40"

            >
                <Button
                onClick={()=>{window.location.href = "tel:+923077045417";}}


                    type="button"

                    child={<CallIcon />}
                    variant="btn_blue"
                />
                <Space h={10} />
                
                <Button
                    type="button"
                    onClick={()=>{window.location.href = "/#inquiry";}}


                    child={<Email />}
                    variant="btn_dark_green"
                />
            </div>
            <div
                className="fixed bottom-5 left-5 shadow-lg z-40"

            >
                <Button
                onClick={()=>{window.location.href = "/#customPackage";}}

                    type="button"
                    title="Create Custom Package"
                    variant="btn_green"
                />

            </div>

            <div
                className="fixed top-8 right-5 shadow-sm z-40"

            >

                <Button
                onClick={()=>{window.location.href = "https://wa.link/80d6qr";}}

                    type="button"
                    icon="/wa.svg"
                    variant="btn_green"
                />
            </div>
        </div>
    )

}