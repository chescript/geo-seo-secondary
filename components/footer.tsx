import Link from "next/link";
import Image from "next/image";

const navHeadingClass = "font-geist text-[14px] leading-[24px] tracking-[-0.42px] text-[#111111] uppercase";
const navLinkClass = "font-apercu text-[14px] leading-[1.8] text-[#6c6c6c] tracking-[-0.42px] uppercase whitespace-nowrap transition-colors hover:text-[#111111]";

const badgeDot = (
  <span className="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#eff4ff]">
    <span className="block h-[6px] w-[6px] rounded-full bg-[#2563eb]" />
  </span>
);

function NewBadge({ label = "New" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-geist text-[14px] leading-[24px] tracking-[-0.42px] text-[#111111]">
      {badgeDot}
      {label}
    </span>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#efefef] bg-[#f7f7f7]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#ffffff_0%,_#f6f6f6_55%,_#eeeeee_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[140px] bg-gradient-to-b from-white via-white/70 to-transparent" />

      <div className="relative mx-auto flex max-w-[1128px] flex-col gap-[64px] px-4 py-[120px] sm:px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-[360px] flex-col gap-[56px]">
            <div className="relative h-6 w-[180px]">
              <Image src="/logos/Logo.png" alt="Geoscanner" fill className="object-contain" sizes="180px" />
            </div>
            <p className="font-apercu text-[14px] leading-[1.8] text-[#6c6c6c] tracking-[-0.42px] uppercase">
              Track your brand visibility across AI models. Get real-time insights on how ChatGPT, Claude, and other AI
              platforms rank your business.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[56px]">
            <div className="flex flex-col gap-[20px]">
              <span className={navHeadingClass}>Product</span>
              <div className="flex w-[185px] flex-col gap-[16px]">
                <Link href="/" className={navLinkClass}>
                  AI Readiness Checker
                </Link>
                <div className="flex items-center gap-[12px]">
                  <Link href="/brand-monitor" className={navLinkClass}>
                    Brand Monitor
                  </Link>
                  <NewBadge />
                </div>
                <Link href="/chat" className={navLinkClass}>
                  AI Chat
                </Link>
                <Link href="/plans" className={navLinkClass}>
                  Pricing
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-[20px]">
              <span className={navHeadingClass}>Resources</span>
              <div className="flex w-[185px] flex-col gap-[16px]">
                <a href="#" className={navLinkClass}>
                  Documentation
                </a>
                <a href="#" className={navLinkClass}>
                  API Reference
                </a>
                <a href="#" className={navLinkClass}>
                  Tutorials
                </a>
                <div className="flex items-center gap-[12px]">
                  <a href="#" className={navLinkClass}>
                    Blog
                  </a>
                  <NewBadge />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[20px]">
              <span className={navHeadingClass}>Company</span>
              <div className="flex w-[150px] flex-col gap-[16px]">
                <a href="#" className={navLinkClass}>
                  About Us
                </a>
                <a href="#" className={navLinkClass}>
                  Careers
                </a>
                <a href="#" className={navLinkClass}>
                  Contact
                </a>
                <a href="#" className={navLinkClass}>
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
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative border-t border-[#e6e6e6] bg-[#efefef]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9d9d9] to-transparent" />
      <div className="mx-auto flex h-[52px] max-w-[1128px] flex-col items-center justify-center gap-2 px-4 text-center sm:px-6 md:flex-row md:justify-between">
        <p className="font-geist text-[12px] leading-[20px] tracking-[-0.36px] text-[#111111]">
          © {currentYear} Geoscanner. All Rights Reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 font-geist text-[12px] leading-[20px] tracking-[-0.36px] text-[#111111]">
          <Link href="/privacy" className="whitespace-nowrap transition-colors hover:text-[#ff6b00]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="whitespace-nowrap transition-colors hover:text-[#ff6b00]">
            Terms of Service
          </Link>
          <Link href="/cookies" className="whitespace-nowrap transition-colors hover:text-[#ff6b00]">
            Cookies Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
