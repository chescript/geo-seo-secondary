import { cva, type VariantProps } from "class-variance-authority"

export const buttonTokens = {
  base:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-geist font-medium tracking-[-0.48px] leading-none text-[16px] transition-all duration-200 disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/20 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
  sizes: {
    sm: "h-9 px-4 text-[14px]",
    default: "h-11 px-5",
    lg: "h-12 px-6 text-[17px]",
    icon: "h-11 w-11 rounded-full",
  },
  tones: {
    primary:
      "bg-gradient-to-b from-[#282828] to-[#0f0f0f] text-white border border-transparent border-t border-t-[#7a7a7a] shadow-[0px_25px_45px_rgba(5,5,5,0.35)] hover:-translate-y-[1px] hover:shadow-[0px_18px_35px_rgba(5,5,5,0.35)] active:translate-y-[1px]",
    secondary:
      "bg-white text-[#111111] border border-[#e1e1e1] hover:-translate-y-[1px] hover:shadow-[0px_18px_45px_rgba(0,0,0,0.08)] active:translate-y-[1px]",
    ghost:
      "bg-transparent text-[#111111] hover:bg-[#f3f3f3] active:bg-[#e8e8e8]",
    destructive:
      "bg-gradient-to-b from-[#c7362d] to-[#7a1d16] text-white border border-[#f3a8a3] shadow-[0px_20px_40px_rgba(199,54,45,0.35)] hover:-translate-y-[1px]",
    link: "bg-transparent text-[#111111] underline underline-offset-4 hover:text-[#050505]",
  },
}

export const buttonVariants = cva(buttonTokens.base, {
  variants: {
    variant: buttonTokens.tones,
    size: buttonTokens.sizes,
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
})

export type ButtonVariantName = keyof typeof buttonTokens.tones
export type ButtonSizeName = keyof typeof buttonTokens.sizes
export type ButtonVariantProps = VariantProps<typeof buttonVariants>

export const buttonClassName = (props?: ButtonVariantProps) => buttonVariants(props)
