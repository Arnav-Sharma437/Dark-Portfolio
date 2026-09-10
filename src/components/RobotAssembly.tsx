import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function RobotAssembly() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Smooth transforms based on scroll
  // When entering viewport (progress ~0.1-0.2): exploded apart
  // In the middle of viewport (progress ~0.5): fully assembled and locked!
  // When leaving (progress ~0.8-1.0): smooth transition
  const turretY = useTransform(smoothProgress, [0.1, 0.45, 0.55, 0.9], [-100, 0, 0, -40]);
  const turretX = useTransform(smoothProgress, [0.1, 0.45, 0.55, 0.9], [60, 0, 0, 30]);
  const turretRotate = useTransform(smoothProgress, [0.1, 0.45, 0.55, 0.9], [10, 0, 0, 4]);

  const leftTreadX = useTransform(smoothProgress, [0.1, 0.45, 0.55, 0.9], [-90, 0, 0, -40]);
  const leftTreadY = useTransform(smoothProgress, [0.1, 0.45, 0.55, 0.9], [80, 0, 0, 40]);
  const leftTreadRotate = useTransform(smoothProgress, [0.1, 0.45, 0.55, 0.9], [-8, 0, 0, -4]);

  const rightTreadX = useTransform(smoothProgress, [0.1, 0.45, 0.55, 0.9], [90, 0, 0, 40]);
  const rightTreadY = useTransform(smoothProgress, [0.1, 0.45, 0.55, 0.9], [80, 0, 0, 40]);
  const rightTreadRotate = useTransform(smoothProgress, [0.1, 0.45, 0.55, 0.9], [8, 0, 0, 4]);

  const boltsSpread = useTransform(smoothProgress, [0.1, 0.45, 0.55, 0.9], [120, 0, 0, 60]);
  const glowScale = useTransform(smoothProgress, [0.1, 0.5, 0.9], [0.8, 1.2, 0.8]);

  const [activeTab, setActiveTab] = useState<"turret" | "chassis" | "tracks">("chassis");

  const SPEC_DATA = [
    { label: "Total Vertices", value: "261,836 pts" },
    { label: "Polygonal Faces", value: "777,826 mesh" },
    { label: "Drive System", value: "Dual Continuous Track" },
    { label: "Machining Standard", value: "±0.005mm 6061-T6" },
  ];

  return (
    <section ref={containerRef} className="relative bg-bg w-full py-24 md:py-36 overflow-hidden border-t border-stroke">
      
      {/* Background Blueprint Grid and Radial Atmosphere */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div 
          style={{ scale: glowScale }}
          className="w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-gradient-to-tr from-[#0d99ff]/15 via-purple-600/10 to-emerald-500/10 rounded-full blur-[140px] opacity-70"
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0d99ff] animate-ping" />
              <span className="text-xs text-[#0d99ff] uppercase tracking-[0.3em] font-mono">
                Interactive Assembly Simulation
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-text-primary mb-3 font-body font-light">
              Deconstructed <span className="font-display italic text-text-primary">Mechatronics</span>
            </h2>
            <p className="text-muted text-sm md:text-base max-w-lg">
              Scroll down to watch the high-precision CNC robotic chassis assemble in real-time.
            </p>
          </div>

          {/* Interactive Inspection Mode Pills */}
          <div className="flex items-center gap-2 bg-surface/80 border border-stroke p-1 rounded-full backdrop-blur-md">
            {(["turret", "chassis", "tracks"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab 
                    ? "bg-[#0d99ff] text-white shadow-lg shadow-[#0d99ff]/30 font-semibold" 
                    : "text-muted hover:text-text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Center Stage: Interactive Robotic Exploded / Assembly View */}
        <div className="relative w-full h-[450px] md:h-[620px] rounded-3xl bg-surface/40 border border-stroke/80 backdrop-blur-xl flex items-center justify-center overflow-hidden shadow-2xl p-6">
          
          {/* Engineering Blueprint Overlays */}
          <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 bg-black/60 border border-stroke rounded-lg font-mono text-[11px] text-muted">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>CALIBRATION: ACTIVE [±0.005mm]</span>
          </div>

          <div className="absolute top-6 right-6 hidden sm:flex items-center gap-2 px-3 py-1.5 bg-black/60 border border-stroke rounded-lg font-mono text-[11px] text-muted">
            <span>SCROLL PROGRESS DYNAMICS</span>
          </div>

          {/* Circular Blueprint HUD Reticle */}
          <div className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full border border-stroke/40 border-dashed pointer-events-none animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[200px] md:w-[380px] h-[200px] md:h-[380px] rounded-full border border-[#0d99ff]/20 pointer-events-none" />

          {/* Interactive Component Stage */}
          <div className="relative w-[300px] sm:w-[420px] md:w-[540px] aspect-square flex items-center justify-center">
            
            {/* LAYER 1: Upper Turret & Hydraulic Arm */}
            <motion.div 
              style={{ 
                x: turretX, 
                y: turretY, 
                rotate: turretRotate,
                clipPath: "polygon(18% 0%, 100% 0%, 100% 48%, 28% 48%, 18% 28%)"
              }}
              className={`absolute inset-0 w-full h-full z-20 pointer-events-none transition-opacity duration-300 drop-shadow-[0_15px_35px_rgba(13,153,255,0.3)] ${
                activeTab === "turret" ? "opacity-100 ring-2 ring-[#0d99ff]/50 rounded-2xl" : "opacity-95"
              }`}
            >
              <img 
                src="/exploded-robot.jpg" 
                alt="Turret and Armature" 
                className="w-full h-full object-contain filter contrast-110 brightness-105"
              />
            </motion.div>

            {/* LAYER 2: Core CNC Mainframe Chassis */}
            <motion.div 
              style={{ 
                clipPath: "polygon(0% 28%, 100% 28%, 100% 64%, 0% 64%)"
              }}
              className={`absolute inset-0 w-full h-full z-10 pointer-events-none transition-opacity duration-300 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] ${
                activeTab === "chassis" ? "opacity-100 ring-2 ring-[#0d99ff]/50 rounded-2xl" : "opacity-95"
              }`}
            >
              <img 
                src="/exploded-robot.jpg" 
                alt="Mainframe Chassis" 
                className="w-full h-full object-contain filter contrast-110 brightness-105"
              />
            </motion.div>

            {/* LAYER 3: Left Tread Assembly */}
            <motion.div 
              style={{ 
                x: leftTreadX, 
                y: leftTreadY, 
                rotate: leftTreadRotate,
                clipPath: "polygon(0% 52%, 52% 52%, 52% 100%, 0% 100%)"
              }}
              className={`absolute inset-0 w-full h-full z-20 pointer-events-none transition-opacity duration-300 drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] ${
                activeTab === "tracks" ? "opacity-100 ring-2 ring-[#0d99ff]/50 rounded-2xl" : "opacity-95"
              }`}
            >
              <img 
                src="/exploded-robot.jpg" 
                alt="Left Track Drive" 
                className="w-full h-full object-contain filter contrast-110 brightness-105"
              />
            </motion.div>

            {/* LAYER 4: Right Tread Assembly */}
            <motion.div 
              style={{ 
                x: rightTreadX, 
                y: rightTreadY, 
                rotate: rightTreadRotate,
                clipPath: "polygon(50% 52%, 100% 52%, 100% 100%, 50% 100%)"
              }}
              className={`absolute inset-0 w-full h-full z-20 pointer-events-none transition-opacity duration-300 drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] ${
                activeTab === "tracks" ? "opacity-100 ring-2 ring-[#0d99ff]/50 rounded-2xl" : "opacity-95"
              }`}
            >
              <img 
                src="/exploded-robot.jpg" 
                alt="Right Track Drive" 
                className="w-full h-full object-contain filter contrast-110 brightness-105"
              />
            </motion.div>

            {/* Dynamic Bolt Callout Pins */}
            <motion.div 
              style={{ y: boltsSpread }}
              className="absolute -top-4 -left-4 px-2.5 py-1 bg-surface/90 border border-amber-400/60 rounded-md text-[10px] font-mono text-amber-300 shadow-xl backdrop-blur-md"
            >
              ◈ M8 HEX FASTENERS [x24]
            </motion.div>

            <motion.div 
              style={{ y: boltsSpread, x: boltsSpread }}
              className="absolute -bottom-4 -right-4 px-2.5 py-1 bg-surface/90 border border-[#0d99ff]/60 rounded-md text-[10px] font-mono text-[#0d99ff] shadow-xl backdrop-blur-md"
            >
              ◈ 42T SPROCKET GEAR
            </motion.div>

          </div>

          {/* Bottom Overlay Instructions */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none text-muted text-xs font-mono">
            <span className="hidden sm:inline">EXPLODED SCHEMATIC ➔ SNAP ALIGNMENT</span>
            <span className="text-[#0d99ff]">SCROLL TO ASSEMBLE ↕</span>
          </div>

        </div>

        {/* Technical Specification Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {SPEC_DATA.map((item, idx) => (
            <div key={idx} className="bg-surface/60 border border-stroke rounded-2xl p-5 backdrop-blur-md">
              <div className="text-[11px] font-mono text-muted uppercase tracking-wider mb-1.5">{item.label}</div>
              <div className="text-lg md:text-xl font-display italic text-text-primary font-semibold">{item.value}</div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
