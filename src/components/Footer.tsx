import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Hls from "hls.js";

const MARQUEE_TEXT = Array(10).fill("BUILDING THE FUTURE • ").join("");

export default function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Marquee Animation
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }, marqueeRef);

    // HLS Video Setup
    const videoSrc = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
    if (videoRef.current) {
      const video = videoRef.current;
      if (Hls.isSupported()) {
        const hls = new Hls({
          capLevelToPlayerSize: true,
          maxBufferLength: 10
        });
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoSrc;
      }
    }

    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" className="relative bg-bg pt-16 md:pt-32 pb-8 md:pb-12 overflow-hidden border-t border-stroke">
      
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1] opacity-60"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* Animated Marquee */}
        <div className="w-full overflow-hidden flex whitespace-nowrap mb-16 md:mb-24 opacity-20">
          <div ref={marqueeRef} className="text-6xl md:text-9xl font-display italic tracking-tight text-text-primary">
            {MARQUEE_TEXT}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-16 md:mb-24">
          <a href="mailto:hello@pixxelu.com" className="group relative inline-flex items-center justify-center rounded-full">
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 animate-gradient-shift accent-gradient transition-opacity duration-300" />
            <span className="relative flex items-center justify-center bg-surface border border-stroke group-hover:border-transparent rounded-full px-8 py-4 md:px-12 md:py-6 text-xl md:text-3xl font-display italic text-text-primary backdrop-blur-md transition-colors">
              hello@pixxelu.com <span className="ml-3 text-base">↗</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
