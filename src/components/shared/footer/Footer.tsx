import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/assets/logo/footer-logo.png";
import Banner from "@/assets/banner/footer-bg.png";
import { CiMail } from "react-icons/ci";
import { MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={Banner}
          alt="Footer background"
          title="Footer Background"
          fill
          className="object-cover object-center"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-[var(--secondary)] opacity-90 mix-blend-multiply" />
      </div>

      {/* Main Footer Content */}
      <div className="py-10 sm:py-20 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-[80px] 2xl:px-[80px] relative">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 sm:gap-20 text-white bg-[#166F6D] p-8 sm:p-10 rounded-2xl shadow-lg">
          {/* Brand Section */}
          <div className="flex justify-center md:justify-start w-full md:w-auto">
            <Link href={"/"} title="root">
              <Image
                src={Logo}
                alt="logo"
                title="Logo"
                priority
                className="h-14 sm:h-16 md:h-15 lg:h-20 xl:h-20 2xl:h-24 w-auto max-w-full"
              />
            </Link>
          </div>

          {/* Policy Links */}
          <div className="flex flex-col items-start text-start w-full md:w-auto">
            <h6 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
              Policy
            </h6>
            <div className="flex flex-col gap-3">
              <Link
                href="/disclaimer"
                className="text-white/80 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                title="Disclaimer Page"
              >
                Disclaimer
              </Link>
              <Link
                href="/privacy"
                className="text-white/80 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                title="Privacy Page"
              >
                Privacy Policy
              </Link>
              <Link
                href="/faq"
                className="text-white/80 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                title="Privacy Page"
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-start text-start w-full md:w-auto">
            <h6 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
              Contact
            </h6>

            <Link
              href="/contact-us"
              className="flex items-center text-white/80 hover:text-white transition-colors duration-200 text-sm sm:text-base pb-2"
              title="Contact Page"
            >
              <MdPhone className="w-4 h-4 md:w-5 md:h-5 mr-3" />
              Contact Us
            </Link>

            {/* Email Section */}
            <Link
              href="mailto:info@dimcprep.com"
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-200 mt-1"
              title="Mail Address"
            >
              <div className="p-1 rounded-full border border-white">
                <CiMail className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs sm:text-sm md:text-base">Email</span>
                <span className="text-sm sm:text-base md:text-lg">
                  info@dimcprep.com
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-6 sm:mt-10 pt-4 text-center">
          <p className="text-[var(--secondary)] text-xs sm:text-sm md:text-base">
            Copyright &copy; {new Date().getFullYear()} DIMCPrep.com. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
