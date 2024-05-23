import Marquee from "react-fast-marquee";

export default function OurPartners() {
    return (<div className="mt-10  bg-white shadow-sm shadow-white py-10">
        <h1 className="text-black mx-4 font-bold text-[40px] mb-10 w-full text-center">
            Our Partners
        </h1>



        <Marquee>
            <img width={150} height={90} className='mx-2' src='/airlines/img1.png' />
            <img width={150} height={90} className='mx-2' src='/airlines/img2.png' />
            <img width={150} height={90} className='mx-2' src='/airlines/img3.png' />
            <img width={150} height={90} className='mx-2' src='/airlines/img4.png' />
            <img width={150} height={90} className='mx-2' src='/airlines/img5.webp' />
            <img width={150} height={90} className='mx-2' src='/airlines/img6.webp' />
            <img width={150} height={90} className='mx-2' src='/airlines/img8.webp' />
        </Marquee>
    </div>)
}