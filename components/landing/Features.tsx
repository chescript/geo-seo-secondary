const imgPixelSolidBadgeCheck = "https://www.figma.com/api/mcp/asset/3dae2fb2-7f1a-4281-91d1-9fecb7df45fe";

export default function FeaturesContainer() {
  return (
    <div className="content-stretch flex flex-col sm:flex-row gap-[16px] items-center justify-center relative size-full" data-name="Features Container" data-node-id="1592:1861">
      <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Feature Item" data-node-id="1592:1862">
        <div className="relative shrink-0 size-[18px]" data-name="Pixel/Solid/Badge Check" data-node-id="1592:1863">
          <img alt="" className="block max-w-none size-full" src={imgPixelSolidBadgeCheck} />
        </div>
        <p className="font-neueBit font-bold leading-[1.4] not-italic relative shrink-0 text-[#111111] text-[18px] text-center tracking-[-0.54px]" data-node-id="1592:1865">
          Free forever
        </p>
      </div>
      <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Feature Item" data-node-id="1592:1866">
        <div className="relative shrink-0 size-[18px]" data-name="Pixel/Solid/Badge Check" data-node-id="1592:1867">
          <img alt="" className="block max-w-none size-full" src={imgPixelSolidBadgeCheck} />
        </div>
        <p className="font-neueBit font-bold leading-[1.4] not-italic relative shrink-0 text-[#111111] text-[18px] text-center tracking-[-0.54px]" data-node-id="1592:1869">
          No signup required
        </p>
      </div>
      <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Feature Item" data-node-id="1592:1870">
        <div className="relative shrink-0 size-[18px]" data-name="Pixel/Solid/Badge Check" data-node-id="1592:1871">
          <img alt="" className="block max-w-none size-full" src={imgPixelSolidBadgeCheck} />
        </div>
        <p className="font-neueBit font-bold leading-[1.4] not-italic relative shrink-0 text-[#111111] text-[18px] text-center tracking-[-0.54px]" data-node-id="1592:1873">
          Instant results
        </p>
      </div>
    </div>
  );
}
