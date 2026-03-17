import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  href?: string;
}

export default function ServiceCard({ title, description, href = "/services" }: ServiceCardProps) {
  return (
    <a
      href={href}
      className="group block bg-navy-900 border border-navy-700 hover:border-gold-500/50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy-950/50"
    >
      <h3 className="text-cream-100 font-serif text-lg mb-2 group-hover:text-gold-300 transition-colors">
        {title}
      </h3>
      <p className="text-cream-400 text-sm leading-relaxed mb-4">{description}</p>
      <span className="flex items-center gap-1.5 text-gold-500 text-xs tracking-wider uppercase group-hover:gap-2.5 transition-all">
        Learn More <ArrowRight size={12} />
      </span>
    </a>
  );
}
