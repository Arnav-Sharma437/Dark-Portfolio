import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

const ENTRIES = [
  { id: 1, title: "Wix Custom Development", date: "Studio", time: "Velo API", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=150&q=80" },
  { id: 2, title: "Graphic & Brand Design", date: "Identity", time: "Creative", img: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=150&q=80" },
  { id: 3, title: "Search Engine Optimization", date: "Ranking", time: "Audits", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=150&q=80" },
  { id: 4, title: "Wix E-Commerce & CRO", date: "Conversion", time: "Stores", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=150&q=80" },
];

function GlowRow({ entry }: { entry: typeof ENTRIES[0] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 80%)`;

  return (
    <motion.a 
      href="#"
      onMouseMove={handleMouseMove}
      className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-4 bg-surface/30 border border-stroke rounded-[32px] sm:rounded-full transition-colors duration-300 group overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] sm:rounded-full opacity-0 group-hover:opacity-100 transition duration-300"
        style={{ background }}
      />
      
      <div className="flex items-center gap-6 relative z-10">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-shadow duration-500">
          <img src={entry.img} alt={entry.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" />
        </div>
        <h3 className="text-lg md:text-xl text-text-primary font-medium tracking-tight">
          {entry.title}
        </h3>
      </div>
      
      <div className="flex items-center gap-6 pl-22 sm:pl-0 pr-4 sm:pr-8 relative z-10">
        <span className="text-xs text-muted uppercase tracking-widest">{entry.time}</span>
        <span className="text-xs text-muted uppercase tracking-widest hidden sm:block">{entry.date}</span>
        <div className="w-8 h-8 rounded-full border border-stroke flex items-center justify-center group-hover:bg-text-primary group-hover:text-bg transition-colors shadow-[0_0_10px_rgba(255,255,255,0)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          <span className="text-xs">↗</span>
        </div>
      </div>
    </motion.a>
  );
}

export default function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-text-primary mb-4 font-body font-light">
              What we <span className="font-display italic text-text-primary">do</span>
            </h2>
            <p className="text-muted text-sm md:text-base max-w-md">
              We design stunning visuals, develop powerful Wix websites, and optimize them to dominate search engines.
            </p>
          </div>
          
          <a href="#" className="hidden md:inline-flex group relative items-center justify-center rounded-full">
            <span className="absolute inset-[-1px] rounded-full opacity-0 group-hover:opacity-100 animate-gradient-shift accent-gradient transition-opacity duration-300" />
            <span className="relative flex items-center justify-center bg-surface border border-stroke rounded-full px-6 py-3 text-sm text-text-primary backdrop-blur-md transition-colors group-hover:border-transparent">
              View all <span className="ml-2">→</span>
            </span>
          </a>
        </motion.div>

        {/* Entries */}
        <div className="flex flex-col gap-4 relative">
          <div className="absolute top-1/2 -left-12 -translate-y-1/2 flex flex-col gap-1 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="text-[10px] text-pink-500 font-mono tracking-wider">gap-4</span>
            <div className="w-px h-12 bg-pink-500/50 mx-auto" />
          </div>

          {ENTRIES.map((entry) => (
            <GlowRow key={entry.id} entry={entry} />
          ))}
        </div>

      </div>
    </section>
  );
}
