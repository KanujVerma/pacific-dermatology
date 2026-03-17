import Link from "next/link";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  href?: string;
  image?: string;
}

export default function ServiceCard({ title, description, href = "/services", image }: ServiceCardProps) {
  if (image) {
    return (
      <Link
        href={href}
        className="group block relative overflow-hidden h-48 bg-navy-900 border border-navy-700 hover:border-gold-500/50 transition-all duration-300"
      >
        <Image
          src={image}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/60 to-navy-950/20" />
        <div className="relative flex flex-col justify-end h-full p-6">
          <h3 className="text-cream-100 font-serif text-lg mb-2 group-hover:text-gold-300 transition-colors">
            {title}
          </h3>
          <p className="text-cream-400 text-sm leading-relaxed">{description}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group block bg-navy-900 border border-navy-700 hover:border-gold-500/50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy-950/50"
    >
      <h3 className="text-cream-100 font-serif text-lg mb-2 group-hover:text-gold-300 transition-colors">
        {title}
      </h3>
      <p className="text-cream-400 text-sm leading-relaxed">{description}</p>
    </Link>
  );
}
