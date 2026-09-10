import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function RobotAssembly() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth progress spring for fluid movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  // Layer transforms: exploded (progress 0) -> assembled / locked together (progress 1)
  // Layer 1: Upper Turret & Hydraulic Arm (moves from top right & rotates slightly)
  const turretY = useTransform(smoothProgress, [0, 0.7, 1], [-90, -15, 0]);
  const turretX = useTransform(smoothProgress, [0, 0.7, 1], [60, 10, 0]);
  const turretRotate = useTransform(smoothProgress, [0, 0.7, 1], [8, 2, 0]);
  const turretScale = useTransform(smoothProgress, [0, 1], [1.12, 1]);

  // Layer 2: Core CNC Chassis & Central Drive (centers in)
  const chassisY = useTransform(smoothProgress, [0, 0.7, 1], [-25, -5, 0]);
  const chassisScale = useTransform(smoothProgress, [0, 0.7, 1], [1.05, 1.01, 1]);

  // Layer 3: Left Tread & Track Drive Assembly (spreads from bottom-left)
  const leftTreadX = useTransform(smoothProgress, [0, 0.7, 1], [-90, -18, 0]);
  const leftTreadY = useTransform(smoothProgress, [0, 0.7, 1], [80, 15, 0]);
  const leftTreadRotate = useTransform(smoothProgress, [0, 0.7, 1], [-6, -1, 0]);

  // Layer 4: Right Tread & Drive Sprockets (spreads from bottom-right)
  const rightTreadX = useTransform(smoothProgress, [0, 0.7, 1], [90, 18, 0]);
  const rightTreadY = useTransform(smoothProgress, [0, 0.7, 1], [90, 15, 0]);
  const rightTreadRotate = useTransform(smoothProgress, [0, 0.7, 1], [6, 1, 0]);

  // Fasteners & Bolt particles flying inward
  const boltsSpread = useTransform(smoothProgress, [0, 0.6, 1], [140, 20, 0]);
  const boltsOpacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0.9, 1, 0.6, 0.2]);

  // Grid scan line & holographic HUD data
  const scanLineY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const lockStatus = useTransform(smoothProgress, (val) => {
    if (val < 0.25) return { text: "EXPLODED SCHEMATIC", color: "text-amber-400", state: "01 // DISASSEMBLED" };
    if (val < 0.7) return { text: "ALIGNING COMPONENTS", color: "text-[#0d99ff]", state: "02 // SYNCHRONIZING" };
    return { text: "ASSEMBLY LOCKED (100%)", color: "text-emerald-400", state: "03 // SYSTEM ARMED" };
  });

  const [hudState, setHudState] = useState({ text: "EXPLODED SCHEMATIC", color: "text-amber-400", state: "01 // DISASSEMBLED" });

  useEffect(() => {
    return lockStatus.on("change", (latest) => setHudState(latest));
  }, [lockStatus]);

  const SPEC_DATA = [
    { label: "Total Vertices", value: "261,836 pts" },
    { label: "Polygonal Faces", value: "777,826 mesh" },
    { label: "Drive System", value: "Dual Continuous Track" },
    { label: "Precision Machining", value: "±0.005mm 6061-T6" },
  ];

  return (
    <section ref={containerRef} className="relative bg-bg w-full h-[320vh]">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Radial Glow & Technical Coordinate Crosshairs */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] md:w-[900px] h-[600px] bg-gradient-to-tr from-[#0d99ff]/10 via-purple-600/5 to-emerald-500/10 rounded-full blur-[120px] opacity-70" />
        </div>

        {/* HUD Top Bar */}
        <div className="absolute top-20 md:top-24 left-6 right-6 md:left-16 md:right-16 flex items-center justify-between pointer-events-none z-30 border-b border-stroke/60 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0d99ff] animate-ping" />
            <span className="text-[11px] font-mono tracking-widest text-[#0d99ff] font-semibold">
              ROBOTIC ASSEMBLY ENGINE // SCROLL INTERACTION
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-xs font-mono font-bold tracking-widest ${hudState.color} transition-colors duration-300`}>
              {hudState.state}
            </span>
            <span className="hidden sm:inline-block px-2.5 py-1 bg-surface border border-stroke rounded text-[10px] font-mono text-muted">
              {hudState.text}
            </span>
          </div>
        </div>

        {/* Interactive Center Stage */}
        <div className="relative w-full max-w-4xl h-[420px] md:h-[560px] flex items-center justify-center px-4">
          
          {/* Circular Blueprint Reticle */}
          <div className="absolute w-[320px] md:w-[480px] h-[320px] md:h-[480px] rounded-full border border-stroke/40 border-dashed pointer-events-none animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[220px] md:w-[360px] h-[220px] md:h-[360px] rounded-full border border-[#0d99ff]/15 pointer-events-none" />

          {/* Holographic Laser Scan Line */}
          <motion.div 
            style={{ top: scanLineY }}
            className="absolute left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#0d99ff] to-transparent shadow-[0_0_15px_#0d99ff] pointer-events-none z-20"
          />

          {/* MAIN DECONSTRUCTED / EXPLODED ROBOT LAYERS */}
          <div className="relative w-[340px] md:w-[540px] aspect-square flex items-center justify-center">
            
            {/* LAYER 1: Upper Turret & High-Pressure Arm */}
            <motion.div 
              style={{ 
                x: turretX, 
                y: turretY, 
                rotate: turretRotate,
                scale: turretScale,
                clipPath: "polygon(18% 0%, 100% 0%, 100% 48%, 28% 48%, 18% 28%)"
              }}
              className="absolute inset-0 w-full h-full z-10 drop-shadow-[0_15px_35px_rgba(13,153,255,0.25)] transition-all pointer-events-none"
            >
              <img 
                src="/exploded-robot.jpg" 
                alt="Robot Upper Arm & Turret" 
                className="w-full h-full object-contain filter contrast-110 brightness-105"
              />
            </motion.div>

            {/* LAYER 2: Central CNC Chassis & Internal Actuators */}
            <motion.div 
              style={{ 
                y: chassisY,
                scale: chassisScale,
                clipPath: "polygon(0% 28%, 100% 28%, 100% 64%, 0% 64%)"
              }}
              className="absolute inset-0 w-full h-full z-0 pointer-events-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
            >
              <img 
                src="/exploded-robot.jpg" 
                alt="Robot CNC Chassis" 
                className="w-full h-full object-contain filter contrast-110 brightness-105"
              />
            </motion.div>

            {/* LAYER 3: Left Continuous Track & Suspension */}
            <motion.div 
              style={{ 
                x: leftTreadX, 
                y: leftTreadY, 
                rotate: leftTreadRotate,
                clipPath: "polygon(0% 52%, 52% 52%, 52% 100%, 0% 100%)"
              }}
              className="absolute inset-0 w-full h-full z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] pointer-events-none"
            >
              <img 
                src="/exploded-robot.jpg" 
                alt="Robot Left Drive Track" 
                className="w-full h-full object-contain filter contrast-110 brightness-105"
              />
            </motion.div>

            {/* LAYER 4: Right Track & Armored Sideplates */}
            <motion.div 
              style={{ 
                x: rightTreadX, 
                y: rightTreadY, 
                rotate: rightTreadRotate,
                clipPath: "polygon(50% 52%, 100% 52%, 100% 100%, 50% 100%)"
              }}
              className="absolute inset-0 w-full h-full z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] pointer-events-none"
            >
              <img 
                src="/exploded-robot.jpg" 
                alt="Robot Right Track Plate" 
                className="w-full h-full object-contain filter contrast-110 brightness-105"
              />
            </motion.div>

            {/* Floating Calibration Fasteners / HUD Pins */}
            <motion.div 
              style={{ y: boltsSpread, opacity: boltsOpacity }}
              className="absolute -top-8 -left-8 px-2 py-1 bg-surface/90 border border-amber-400/60 rounded text-[9px] font-mono text-amber-300 pointer-events-none shadow-lg backdrop-blur-sm"
            >
              ◈ M8 HEX BOLT [x24]
            </motion.div>

            <motion.div 
              style={{ y: boltsSpread, x: boltsSpread, opacity: boltsOpacity }}
              className="absolute -bottom-6 -right-6 px-2 py-1 bg-surface/90 border border-[#0d99ff]/60 rounded text-[9px] font-mono text-[#0d99ff] pointer-events-none shadow-lg backdrop-blur-sm"
            >
              ◈ SPROCKET GEAR 42T
            </motion.div>

          </div>

          {/* Floating Spec Panels (Left & Right) */}
          <div className="hidden lg:flex flex-col gap-3 absolute left-0 top-1/2 -translate-y-1/2 pointer-events-auto">
            {SPEC_DATA.slice(0, 2).map((item, idx) => (
              <div key={idx} className="bg-surface/80 border border-stroke/80 backdrop-blur-md rounded-2xl p-4 w-48 shadow-xl">
                <div className="text-[10px] uppercase font-mono text-muted tracking-wider mb-1">{item.label}</div>
                <div className="text-sm font-display italic text-text-primary font-semibold">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex flex-col gap-3 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-auto">
            {SPEC_DATA.slice(2, 4).map((item, idx) => (
              <div key={idx} className="bg-surface/80 border border-stroke/80 backdrop-blur-md rounded-2xl p-4 w-48 shadow-xl text-right">
                <div className="text-[10px] uppercase font-mono text-muted tracking-wider mb-1">{item.label}</div>
                <div className="text-sm font-display italic text-text-primary font-semibold">{item.value}</div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Scroll Progress Controller */}
        <div className="absolute bottom-8 left-6 right-6 md:left-16 md:right-16 flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto z-30">
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted uppercase tracking-widest">
              Scroll to Assemble
            </span>
            <div className="w-32 h-1.5 bg-stroke/60 rounded-full overflow-hidden">
              <motion.div 
                style={{ scaleX: smoothProgress }}
                className="h-full w-full origin-left bg-gradient-to-r from-amber-400 via-[#0d99ff] to-emerald-400"
              />
            </div>
          </div>

          <div className="text-center md:text-right">
            <span className="text-[11px] font-mono text-muted">
              INTERACTIVE MECHATRONIC EXPLODED VIEW — FULL 3D ASSEMBLY SIMULATION
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
