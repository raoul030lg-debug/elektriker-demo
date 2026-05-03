'use client';

import { useEffect, useRef } from 'react';
import { BadgeCheck, Clock, Shield, ShieldCheck, Zap } from 'lucide-react';

type TrustItem = {
  icon: typeof Shield;
  headline: string;
  subline: string;
  accent: 'indigo' | 'cyan';
};

const items: TrustItem[] = [
  { icon: Shield, headline: 'Innung Berlin', subline: 'Mitgliedsbetrieb', accent: 'indigo' },
  { icon: BadgeCheck, headline: 'Meisterbetrieb', subline: 'Geprüfte Qualität', accent: 'indigo' },
  { icon: Clock, headline: '24h Notdienst', subline: '7 Tage / Woche', accent: 'cyan' },
  { icon: ShieldCheck, headline: 'Versichert', subline: 'Haftpflicht inklusive', accent: 'indigo' },
  { icon: Zap, headline: 'Festpreis', subline: 'Vor Auftragsbeginn', accent: 'indigo' },
];

export default function TrustBar() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      section.querySelectorAll<HTMLElement>('.trust-card').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll<HTMLElement>('.trust-card')
              .forEach((el) => el.classList.add('is-visible'));
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="trust"
      aria-label="Vertrauenssignale"
      className="relative w-full bg-white py-10 lg:py-16"
    >
      <div className="mx-auto max-w-7xl px-4">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-5 lg:gap-6">
          {items.map((item, index) => {
            const Icon = item.icon;
            const isCyan = item.accent === 'cyan';
            const iconWrapClass = isCyan
              ? 'bg-cyan-500/[0.10] text-cyan-600'
              : 'bg-indigo-950/[0.06] text-indigo-950';

            return (
              <li
                key={item.headline}
                className="trust-card group relative flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-lg ring-1 ring-stone-900/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:ring-stone-900/10 sm:p-8 lg:items-start lg:text-left"
                style={{ '--trust-delay': `${index * 100}ms` } as React.CSSProperties}
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${iconWrapClass}`}
                  aria-hidden="true"
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-semibold leading-snug text-indigo-950 sm:text-lg">
                  {item.headline}
                </h3>
                <p className="mt-1 text-sm text-stone-600">{item.subline}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
