import { motion } from "framer-motion";

const PROJECTS = [
  { id: 1, title: "Shopify E-Commerce", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Squarespace Studio", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "WordPress Headless", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: "Webflow Corporate", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80" },
];

export default function SelectedWorks() {
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
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
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-text-primary mb-4 font-body font-light">
              Featured <span className="font-display italic text-text-primary">projects</span>
            </h2>
            <p className="text-muted text-sm md:text-base max-w-md">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>
          
          {/* Desktop Button */}
          <a href="#" className="hidden md:inline-flex group relative items-center justify-center rounded-full">
            <span className="absolute inset-[-1px] rounded-full opacity-0 group-hover:opacity-100 animate-gradient-shift accent-gradient transition-opacity duration-300" />
            <span className="relative flex items-center justify-center bg-surface border border-stroke rounded-full px-6 py-3 text-sm text-text-primary backdrop-blur-md transition-colors group-hover:border-transparent">
              View all work <span className="ml-2">→</span>
            </span>
          </a>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project, i) => {
            const isWide = i === 0 || i === 3;
            const spanClass = isWide ? "md:col-span-7" : "md:col-span-5";

            return (
              <div 
                key={project.id}
                className={`${spanClass} group relative bg-surface border border-stroke rounded-3xl overflow-hidden aspect-square md:aspect-auto md:h-[450px] cursor-pointer`}
              >
                {/* Base Image */}
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[0.25,0.1,0.25,1] group-hover:scale-105"
                />
                
                {/* Halftone Overlay */}
                <div 
                  className="absolute inset-0 opacity-20 mix-blend-multiply"
                  style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "4px 4px" }}
                />

                {/* Hover Darken + Blur */}
                <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-all duration-500 flex items-center justify-center">
                  
                  {/* Pill Label */}
                  <div className="relative inline-flex items-center justify-center rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[0.25,0.1,0.25,1]">
                    <span className="absolute inset-[-2px] rounded-full animate-gradient-shift accent-gradient opacity-100" />
                    <span className="relative bg-white text-black px-6 py-2 rounded-full text-sm font-medium">
                      View — <span className="font-display italic text-base ml-1">{project.title}</span>
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
