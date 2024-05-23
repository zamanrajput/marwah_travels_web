import { NAV_LINKS, SOCIALS } from "@/constants"
import Image from "next/image"
import Link from "next/link"
const Navbar = () => {
  function isCurrent(link:string){
    const url = location.href;
    return url.includes(link);
  }
  return (
    <nav className=" flex sm:items-center sm:flex-row flex-col sm:gap-20 gap-5 bg-black/30 max-container padding-container relative z-30 py-5">
      <Link href="/">
        <img src="/logo2.png" alt="logo" width={200} height={19} />
        {/* <span className="text-white text-3xl font-bold">Marwah Travels</span> */}
      </Link>

      <ul className=" h-full sm:gap-12 gap-1 flex sm:flex-row flex-col sm:items-center ">
        {NAV_LINKS.map((link) => (
          <Link onClick={()=>location.href = link.href} href={link.href} key={link.key} className=" text-slate-200  cursor-pointer sm:pb-1.5 transition-all hover:font-bold">
            {link.label}
          </Link>
        ))}
      </ul>


      {/* <div className="lg:flexCenter hidden">
        <ul className="regular-14 flex gap-4 text-white me-16">
          {SOCIALS.links.map((link) => (
            <Link href="/" key={link}>
              <img color="white" src={link} alt="logo" width={24} height={24} />
            </Link>
          ))}
        </ul>

      </div> */}

      {/* <img
        src="menu.svg"
        alt="menu"
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden"
      /> */}
    </nav>
  )
}

export default Navbar