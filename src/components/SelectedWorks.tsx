import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const PROJECTS = [
  { id: 1, title: "Wix E-Commerce Suite", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Zenith Brand Identity", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Apex SEO Growth", img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: "Real Estate Wix Studio", img: "https://images.unsplash.com/photo-1547658719-da2b8116c1d0?auto=format&fit=crop&w=800&q=80" },
];

function TiltCard({ project, spanClass }: { project: typeof PROJECTS[0], spanClass: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`${spanClass} group relative bg-surface border border-stroke rounded-3xl overflow-hidden aspect-square md:aspect-auto md:h-[450px] cursor-pointer`}
    >
      {/* Base Image */}
      <motion.img 
        style={{ translateZ: "20px" }}
        src={project.img} 
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[0.25,0.1,0.25,1] group-hover:scale-110"
      />
      
      {/* Halftone Overlay */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-multiply"
        style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "4px 4px" }}
      />

      {/* Hover Darken + Blur */}
      <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-all duration-500 flex items-center justify-center">
        {/* Pill Label */}
        <motion.div 
          style={{ translateZ: "40px" }}
          className="relative inline-flex items-center justify-center rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[0.25,0.1,0.25,1]"
        >
          <span className="absolute inset-[-2px] rounded-full animate-gradient-shift accent-gradient opacity-100 shadow-[0_0_20px_rgba(137,170,204,0.4)]" />
          <span className="relative bg-white text-black px-6 py-2 rounded-full text-sm font-medium">
            View — <span className="font-display italic text-base ml-1">{project.title}</span>
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

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
              A curated showcase of bespoke Wix website designs, visual identities, and high-impact SEO campaigns.
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
        <div className="relative">
          {/* Figma bounding box markers for the entire grid */}
          <div className="absolute -top-4 -left-4 w-4 h-4 border-t-2 border-l-2 border-[#0d99ff] opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute -top-4 -right-4 w-4 h-4 border-t-2 border-r-2 border-[#0d99ff] opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute -bottom-4 -left-4 w-4 h-4 border-b-2 border-l-2 border-[#0d99ff] opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-4 h-4 border-b-2 border-r-2 border-[#0d99ff] opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          <div className="absolute -top-12 right-0 flex items-center gap-2 px-2 py-1 bg-[#0d99ff]/20 border border-[#0d99ff]/50 rounded-[4px] opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-default">
            <span className="text-[10px] text-[#0d99ff] font-mono tracking-wider">Auto Layout (Wrap)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6" style={{ perspective: "1000px" }}>
            {PROJECTS.map((project, i) => {
              const isWide = i === 0 || i === 3;
              const spanClass = isWide ? "md:col-span-7" : "md:col-span-5";

              return <TiltCard key={project.id} project={project} spanClass={spanClass} />;
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
