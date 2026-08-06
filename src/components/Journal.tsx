import { motion } from "framer-motion";

const ENTRIES = [
  { id: 1, title: "Custom CMS Mastery", date: "WordPress", time: "Shopify", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=150&q=80" },
  { id: 2, title: "High-Performance Dev", date: "React", time: "Next.js", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=150&q=80" },
  { id: 3, title: "UI/UX Engineering", date: "Figma", time: "Design", img: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=150&q=80" },
  { id: 4, title: "Brand Identity", date: "Guidelines", time: "Strategy", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=150&q=80" },
];

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
              We engineer pixel-perfect frontends and completely bespoke platforms.
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
        <div className="flex flex-col gap-4">
          {ENTRIES.map((entry) => (
            <a 
              key={entry.id}
              href="#"
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[32px] sm:rounded-full transition-colors duration-300 group"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0">
                  <img src={entry.img} alt={entry.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-lg md:text-xl text-text-primary font-medium tracking-tight">
                  {entry.title}
                </h3>
              </div>
              
              <div className="flex items-center gap-6 pl-22 sm:pl-0 pr-4 sm:pr-8">
                <span className="text-xs text-muted uppercase tracking-widest">{entry.time}</span>
                <span className="text-xs text-muted uppercase tracking-widest hidden sm:block">{entry.date}</span>
                <div className="w-8 h-8 rounded-full border border-stroke flex items-center justify-center group-hover:bg-text-primary group-hover:text-bg transition-colors">
                  <span className="text-xs">↗</span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
