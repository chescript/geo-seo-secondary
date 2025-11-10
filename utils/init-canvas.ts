export default function initCanvas(canvas: HTMLCanvasElement) {
  const { width, height } = canvas.getBoundingClientRect();
  const ctx = canvas.getContext("2d")!;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const upscaleCanvas = () => {
    const scale = (window as any).visualViewport?.scale || 1;
    const dpr = (window.devicePixelRatio || 1) * scale;

    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    canvas.dispatchEvent(new Event("resize"));
  };

  upscaleCanvas();

  const handleResize = () => {
    // Debounce to avoid excessive resizing during viewport changes
    setTimeout(upscaleCanvas, 300);
  };

  window.addEventListener("resize", handleResize);
  (window as any).visualViewport?.addEventListener("resize", handleResize);

  return ctx;
}