const imgPixelSolidSparkles = "https://www.figma.com/api/mcp/asset/05afc4fb-0f4a-49ac-a4ca-0cb500fc8ad3";

export default function TransparentPricingBadge() {
  return (
    <div className="bg-[#f4f4f4] border border-solid border-white flex items-center justify-center gap-[8px] px-[14px] py-[6px] rounded-[322px]" data-node-id="1553:20807">
      <div className="relative shrink-0 size-[14px]" data-name="Pixel/Solid/Sparkles" data-node-id="1553:20808">
        <img alt="" className="block max-w-none size-full" src={imgPixelSolidSparkles} />
      </div>
      <p className="font-['Apercu_Mono_Pro:Regular',sans-serif] leading-[1.8] not-italic relative shrink-0 text-[#818181] text-[14px] text-center tracking-[-0.42px] uppercase" data-node-id="1553:20812">
        TRANSPARENT PRICING
      </p>
    </div>
  );
}
