import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-white relative">
      {/* Main footer content */}
      <div className="max-w-[1024px] mx-auto px-4 py-[100px]">
        <div className="flex items-start justify-between">
          {/* Brand section - Left side */}
          <div className="flex flex-col gap-[56px] w-[337px]">
            {/* Logo */}
            <div className="relative h-6 w-[180px]">
              <Image src="/logos/Logo.png" alt="Geoscanner" fill className="object-contain" sizes="180px" />
            </div>

            {/* Description */}
            <p className="font-apercu text-[14px] leading-[1.8] text-[#818181] tracking-[-0.42px] uppercase w-full">
              Track your brand visibility across AI models. Get real-time insights on how ChatGPT, Claude, and other AI platforms rank your business.
            </p>
          </div>

          {/* Links sections - Right side */}
          <div className="flex gap-[56px]">
            {/* Product */}
            <div className="flex flex-col gap-[20px]">
              <p className="font-geist font-normal text-[14px] leading-[24px] text-black tracking-[-0.42px] w-[109px]">
                Product
              </p>
              <div className="flex flex-col gap-[16px] w-[185px]">
                <Link href="/" className="font-apercu text-[14px] leading-[1.8] text-[#818181] tracking-[-0.42px] uppercase whitespace-nowrap hover:text-[#111111] transition-colors">
                  AI Readiness Checker
                </Link>
                <div className="flex gap-[12px] items-start">
                  <Link href="/brand-monitor" className="font-apercu text-[14px] leading-[1.8] text-[#818181] tracking-[-0.42px] uppercase whitespace-nowrap hover:text-[#111111] transition-colors">
                    Brand Monitor
                  </Link>
                  <div className="flex gap-[8px] items-center">
                    <div className="w-[16px] h-[16px] rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="w-[6px] h-[6px] rounded-full bg-blue-600"></div>
                    </div>
                    <span className="font-geist font-normal text-[14px] leading-[24px] text-black tracking-[-0.42px]">New</span>
                  </div>
                </div>
                <Link href="/chat" className="font-apercu text-[14px] leading-[1.8] text-[#818181] tracking-[-0.42px] uppercase whitespace-nowrap hover:text-[#111111] transition-colors">
                  AI Chat
                </Link>
                <Link href="/plans" className="font-apercu text-[14px] leading-[1.8] text-[#818181] tracking-[-0.42px] uppercase whitespace-nowrap hover:text-[#111111] transition-colors">
                  Pricing
                </Link>
              </div>
            </div>

            {/* Resources */}
            <div className="flex flex-col gap-[20px]">
              <p className="font-geist font-normal text-[14px] leading-[24px] text-black tracking-[-0.42px] w-[109px]">
                Resources
              </p>
              <div className="flex flex-col gap-[16px] w-[185px]">
                <a href="#" className="font-apercu text-[14px] leading-[1.8] text-[#818181] tracking-[-0.42px] uppercase whitespace-nowrap hover:text-[#111111] transition-colors">
                  Documentation
                </a>
                <a href="#" className="font-apercu text-[14px] leading-[1.8] text-[#818181] tracking-[-0.42px] uppercase whitespace-nowrap hover:text-[#111111] transition-colors">
                  API Reference
                </a>
                <a href="#" className="font-apercu text-[14px] leading-[1.8] text-[#818181] tracking-[-0.42px] uppercase whitespace-nowrap hover:text-[#111111] transition-colors">
                  Tutorials
                </a>
                <div className="flex gap-[12px] items-start">
                  <a href="#" className="font-apercu text-[14px] leading-[1.8] text-[#818181] tracking-[-0.42px] uppercase whitespace-nowrap hover:text-[#111111] transition-colors">
                    Blog
                  </a>
                  <div className="flex gap-[8px] items-center">
                    <div className="w-[16px] h-[16px] rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="w-[6px] h-[6px] rounded-full bg-blue-600"></div>
                    </div>
                    <span className="font-geist font-normal text-[14px] leading-[24px] text-black tracking-[-0.42px]">New</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-[20px]">
              <p className="font-geist font-normal text-[14px] leading-[24px] text-black tracking-[-0.42px] w-[109px]">
                Company
              </p>
              <div className="flex flex-col gap-[16px] w-[109px]">
                <a href="#" className="font-apercu text-[14px] leading-[1.8] text-[#818181] tracking-[-0.42px] uppercase whitespace-nowrap hover:text-[#111111] transition-colors">
                  About US
                </a>
                <a href="#" className="font-apercu text-[14px] leading-[1.8] text-[#818181] tracking-[-0.42px] uppercase whitespace-nowrap hover:text-[#111111] transition-colors">
                  Careers
                </a>
                <a href="#" className="font-apercu text-[14px] leading-[1.8] text-[#818181] tracking-[-0.42px] uppercase whitespace-nowrap hover:text-[#111111] transition-colors">
                  Contact
                </a>
                <a href="#" className="font-apercu text-[14px] leading-[1.8] text-[#818181] tracking-[-0.42px] uppercase whitespace-nowrap hover:text-[#111111] transition-colors">
                  Partners
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FooterBottomBanner() {
  const currentYear = 2024;

  return (
    <div className="backdrop-blur-[6px] bg-neutral-100 h-[40px] w-full">
      <div className="max-w-[1100px] mx-auto px-4 h-full flex items-center justify-between">
        <p className="font-geist font-normal text-[12px] leading-[20px] text-[#111111] tracking-[-0.36px]">
          ©{currentYear} Geoscanner All Rights Reserved.
        </p>
        <div className="flex gap-[40px] font-geist font-normal text-[12px] leading-[20px] text-[#111111] tracking-[-0.36px]">
          <Link href="/privacy" className="hover:text-orange-600 transition-colors whitespace-nowrap">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-orange-600 transition-colors whitespace-nowrap">
            Terms of Service
          </Link>
          <Link href="/cookies" className="hover:text-orange-600 transition-colors whitespace-nowrap">
            Cookies Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
