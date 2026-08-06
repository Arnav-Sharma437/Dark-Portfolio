export default function Stats() {
  const STATS = [
    { value: "50+", label: "Sites Launched" },
    { value: "4", label: "Platforms Mastered" },
    { value: "5.0", label: "Average Rating" },
  ];

  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-stroke">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center pt-8 md:pt-0 text-center">
              <span className="text-6xl md:text-8xl font-display italic text-text-primary mb-4 leading-none tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-muted uppercase tracking-[0.2em]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
