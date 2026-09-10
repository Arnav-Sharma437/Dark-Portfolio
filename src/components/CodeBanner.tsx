import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CODE_DATA = JSON.stringify({
  model: {
    shapegen: "tencent/Hunyuan3D-2/hunyuan3d-dit-v2-0",
    texgen: "tencent/Hunyuan3D-2"
  },
  params: {
    caption: "",
    steps: 30,
    guidance_scale: 5,
    seed: 5856855,
    octree_resolution: 256,
    check_box_rembg: true,
    num_chunks: 8000
  },
  number_of_faces: 777826,
  number_of_vertices: 261836,
  time: {
    "remove background": 0.9953069686889648,
    "shape generation": 6.522051095962524,
    "export to trimesh": 0.12373185157775879,
    "total": 7.643625736236572
  }
});

const REPEATED_CODE = Array(6).fill(CODE_DATA).join("   ///   ");

export default function CodeBanner() {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(tickerRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }, tickerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full overflow-hidden bg-surface/80 border-y border-stroke py-3 backdrop-blur-md relative z-20 flex items-center">
      <div className="flex items-center gap-2.5 px-4 shrink-0 border-r border-stroke mr-4 z-10 bg-surface">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[11px] font-mono text-[#0d99ff] uppercase tracking-widest font-semibold whitespace-nowrap">
          RUN LOG
        </span>
      </div>
      <div className="overflow-hidden flex whitespace-nowrap w-full">
        <div ref={tickerRef} className="text-xs md:text-sm font-mono text-muted/80 tracking-wide">
          {REPEATED_CODE}
        </div>
      </div>
    </div>
  );
}
