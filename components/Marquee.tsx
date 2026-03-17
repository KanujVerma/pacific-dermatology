"use client";

interface MarqueeProps {
  items: string[];
  duration?: number;
  className?: string;
  bgColor?: string;
}

export default function Marquee({
  items,
  duration = 40,
  className = "",
  bgColor = "#c9963e",
}: MarqueeProps) {
  const content = items.flatMap((item, i) => [
    <span key={`item-${i}`} className="text-navy-900 text-xs font-medium tracking-[0.2em] uppercase whitespace-nowrap">
      {item}
    </span>,
    <span key={`sep-${i}`} className="text-navy-900 mx-6 text-xs" aria-hidden="true">◆</span>,
  ]);

  return (
    <div
      className={`relative overflow-hidden py-5 ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${bgColor}, transparent)` }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to left, ${bgColor}, transparent)` }}
      />

      {/* Scrolling content — doubled for seamless loop */}
      <div
        className="group flex"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex items-center animate-marquee group-hover:[animation-play-state:paused] shrink-0">
          {content}{content}
        </div>
        <div className="flex items-center animate-marquee group-hover:[animation-play-state:paused] shrink-0" aria-hidden="true">
          {content}{content}
        </div>
      </div>
    </div>
  );
}
