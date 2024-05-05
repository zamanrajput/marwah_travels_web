import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="flexCenter mb-24" >
      <div className="padding-container max-container flex w-full flex-col gap-14 pt-4" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} >
        <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
          <Link href="/">
            <Image src="/logo2.png" alt="logo" width={200} height={19} />
            {/* <span className="mt-10 text-white text-3xl font-bold">Marwah Travels</span> */}
          </Link>

          <div className='flex text-white flex-wrap gap-10 sm:justify-between md:flex-1'>
            {FOOTER_LINKS.map((columns,id) => (
              <FooterColumn key={id} title={columns.title}>
                <ul className="regular-14 flex flex-col gap-4 text-white">
                  {columns.links.map((link) => (
                    <Link href="/" key={link}>
                      {link}
                    </Link>
                  ))}
                </ul>
              </FooterColumn>
            ))}

            <div className="flex flex-col gap-5">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                {FOOTER_CONTACT_INFO.links.map((link) => (
                  <Link
                    href="/"
                    key={link.label}
                    className="flex gap-4 md:flex-col lg:flex-row"
                  >
                    <p className="whitespace-nowrap">
                      {link.label}:
                    </p>
                    <p className="medium-14 whitespace-nowrap text-slate-200">
                      {link.value}
                    </p>
                  </Link>
                ))}
              </FooterColumn>
            </div>

          </div>
        </div>

        <div className="border" />
        <p className="regular-14 w-full text-center text-slate-200">2024 Marwah Travels | All rights reserved</p>
      </div>
    </footer>
  )
}

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
}

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  )
}

export default Footer