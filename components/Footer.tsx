import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-serif text-xl text-gold-400 mb-3">Pacific Dermatology</div>
            <p className="text-cream-400 text-sm leading-relaxed mb-4">
              Pleasanton's premier dermatology practice. Over 20 years of trusted,
              full-service medical and cosmetic skin care under Dr. Hank Fung.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-cream-200 text-xs tracking-[0.2em] uppercase font-sans mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "#reviews", label: "Patient Stories" },
                { href: "https://d1wqtots2bk2xi.cloudfront.net/Pacific+Dermatology+New+Patient+Registration+Form.pdf", label: "New Patient Form", external: true },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-cream-400 hover:text-gold-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-cream-200 text-xs tracking-[0.2em] uppercase font-sans mb-5">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:9254268828" className="flex items-start gap-3 text-cream-400 hover:text-gold-400 text-sm transition-colors">
                  <Phone size={14} className="mt-0.5 shrink-0" />
                  (925) 426-8828
                </a>
              </li>
              <li>
                <a href="mailto:pacificdermatology@yahoo.com" className="flex items-start gap-3 text-cream-400 hover:text-gold-400 text-sm transition-colors">
                  <Mail size={14} className="mt-0.5 shrink-0" />
                  pacificdermatology@yahoo.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-cream-400 text-sm">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>Pleasanton, CA 94566</span>
              </li>
              <li className="flex items-start gap-3 text-cream-400 text-sm">
                <Clock size={14} className="mt-0.5 shrink-0" />
                <span>Call for current hours</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-cream-200 text-xs tracking-[0.2em] uppercase font-sans mb-5">New Patients</h3>
            <p className="text-cream-400 text-sm mb-4">
              Ready to experience concierge-level dermatology care?
            </p>
            <a
              href="https://d1wqtots2bk2xi.cloudfront.net/Pacific+Dermatology+New+Patient+Registration+Form.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-navy-950 text-xs tracking-[0.15em] uppercase px-5 py-3 transition-all mb-3"
            >
              Download Patient Form
            </a>
            <br />
            <a
              href="tel:9254268828"
              className="inline-block bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs tracking-[0.15em] uppercase px-5 py-3 transition-all font-medium"
            >
              Call to Schedule
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-navy-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-navy-400 text-xs">
            © {new Date().getFullYear()} Pacific Dermatology. All rights reserved.
          </p>
          <p className="text-navy-500 text-xs">
            Dr. Hank Fung, MD · Board-Certified Dermatologist · Pleasanton, CA
          </p>
        </div>
      </div>
    </footer>
  );
}
