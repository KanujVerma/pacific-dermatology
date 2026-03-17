"use client";

import { Star } from "lucide-react";

interface ReviewCardProps {
  quote: string;
  author: string;
  location?: string;
  rating?: number;
}

export default function ReviewCard({ quote, author, location = "Pleasanton, CA", rating = 5 }: ReviewCardProps) {
  return (
    <div className="bg-cream-100 border border-cream-300 p-8 flex flex-col hover:border-gold-400/50 transition-colors duration-300">
      <div className="flex gap-1 mb-5">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-gold-500 text-gold-500" />
        ))}
      </div>
      <blockquote className="text-navy-800 text-sm leading-relaxed italic flex-1 mb-6">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div>
        <p className="text-navy-900 font-medium text-sm">{author}</p>
        <p className="text-navy-500 text-xs mt-0.5">{location}</p>
      </div>
    </div>
  );
}
