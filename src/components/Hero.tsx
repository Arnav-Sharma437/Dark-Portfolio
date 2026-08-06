import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import Hls from "hls.js";
import { motion } from "framer-motion";
import useMagnetic from "../hooks/useMagnetic";

const ROLES = ["Design", "Development", "Performance", "Strategy"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const magneticButton1 = useMagnetic(0.2);
  const magneticButton2 = useMagnetic(0.2);

  useEffect(() => {
    // GSAP Entrance
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );
      
      tl.fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 },
        "-=0.9" // Start slightly before name reveal ends
      );
    }, sectionRef);

    // Role Cycler
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);

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

    return () => {
      ctx.revert();
      clearInterval(roleInterval);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-bg">
      
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        {/* Dark Overlays */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto pt-20">
        
        {/* Figma Tag */}
        <div className="absolute top-0 left-4 md:-left-12 -translate-y-8 flex items-center gap-2 px-2 py-1 bg-[#0d99ff] rounded-[4px] opacity-0 animate-[fadeIn_0.5s_ease-out_1s_forwards]">
          <span className="text-[10px] text-white font-mono tracking-wider">◈ Hero Component</span>
        </div>

        <div className="blur-in relative inline-block text-xs text-muted uppercase tracking-[0.3em] mb-8">
          DIGITAL AGENCY
          {/* Measurement line */}
          <div className="absolute top-1/2 -right-16 w-12 h-px bg-[#0d99ff]/50 border-r border-[#0d99ff]/50" />
          <div className="absolute top-1/2 -left-16 w-12 h-px bg-[#0d99ff]/50 border-l border-[#0d99ff]/50" />
        </div>
        
        <div className="relative group/title">
          <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 transition-all duration-500 hover:text-white hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            Pixxelu
          </h1>
          {/* Hover selection box */}
          <div className="absolute inset-[-10px] border border-[#0d99ff] opacity-0 group-hover/title:opacity-100 transition-opacity pointer-events-none rounded-lg flex items-start justify-start">
             <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-[#0d99ff]" />
             <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-[#0d99ff]" />
             <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-[#0d99ff]" />
             <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-[#0d99ff]" />
          </div>
        </div>
        
        <div className="blur-in text-xl md:text-3xl text-text-primary mb-6 flex items-center justify-center gap-2 font-body">
          <span>A</span>
          <span 
            key={roleIndex} 
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {ROLES[roleIndex]}
          </span>
          <span>Agency based in India.</span>
        </div>
        
        <p className="blur-in text-sm md:text-base text-muted max-w-md mx-auto mb-12">
          Building high-performance websites and bespoke digital experiences natively integrated with AI workflows.
        </p>
        
        {/* CTA Buttons */}
        <div className="blur-in flex flex-col sm:flex-row items-center justify-center gap-4 relative">
          {/* Glassmorphic panel behind buttons */}
          <div className="absolute inset-[-20px] bg-white/5 backdrop-blur-2xl rounded-full opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          {/* See Works (Solid) */}
          <motion.a 
            href="#work"
            ref={magneticButton1.ref as any}
            style={{ x: magneticButton1.x, y: magneticButton1.y }}
            className="group relative inline-flex items-center justify-center rounded-full text-sm px-7 py-3.5 transition-all duration-300 z-10"
          >
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 animate-gradient-shift accent-gradient transition-opacity duration-300 shadow-[0_0_20px_rgba(137,170,204,0.4)]" />
            <span className="relative flex items-center justify-center w-full h-full bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary rounded-full transition-colors duration-300 px-7 py-3.5 whitespace-nowrap font-medium">
              See Works
            </span>
          </motion.a>

          {/* Reach out (Outlined) */}
          <motion.a 
            href="#contact"
            ref={magneticButton2.ref as any}
            style={{ x: magneticButton2.x, y: magneticButton2.y }}
            className="group relative inline-flex items-center justify-center rounded-full text-sm px-7 py-3.5 transition-all duration-300 border-2 border-stroke hover:border-transparent bg-bg text-text-primary z-10"
          >
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 animate-gradient-shift accent-gradient transition-opacity duration-300 shadow-[0_0_20px_rgba(137,170,204,0.4)]" />
            <span className="relative flex items-center justify-center w-full h-full bg-bg rounded-full px-7 py-3.5 whitespace-nowrap font-medium">
              Reach out...
            </span>
          </motion.a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 gap-3">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-12 bg-stroke overflow-hidden relative">
          <div className="w-full h-full bg-text-primary animate-scroll-down" />
        </div>
      </div>

    </section>
  );
}
