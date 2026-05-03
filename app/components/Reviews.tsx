'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { MapPin, Quote, ShieldCheck, Star } from 'lucide-react';

type Review = {
  id: number;
  name: string;
  initials: string;
  bezirk: string;
  rating: number;
  date: string;
  text: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: 'Andreas K.',
    initials: 'AK',
    bezirk: 'Pankow',
    rating: 5,
    date: 'vor 1 Woche',
    text: 'Wallbox in der Tiefgarage installiert — KEBA 11 kW, KfW-Antrag inklusive ausgefüllt. Sauberer Anschluss, Lastmanagement perfekt eingestellt, Eichrechts-Konform. Würde sofort wieder buchen.',
  },
  {
    id: 2,
    name: 'Maria S.',
    initials: 'MS',
    bezirk: 'Neukölln',
    rating: 5,
    date: 'vor 3 Wochen',
    text: 'Sonntag um 23 Uhr Strom weg in halber Wohnung. Mehmet war 45 Min später da, hat die defekte Sicherung ausgetauscht. 168 € inkl. Anfahrt — keine Mondpreise, kein Theater. Echter Lebensretter.',
  },
  {
    id: 3,
    name: 'Familie Çelik',
    initials: 'FÇ',
    bezirk: 'Reinickendorf',
    rating: 5,
    date: 'vor 1 Monat',
    text: 'Komplette Smarthome-Anlage in unserem Neubau — Loxone Visualisierung, KNX-Bus, 38 Aktoren. 5 Tage geplant, 5 Tage geliefert. Festpreis hat genau gepasst, nichts dazu gekommen.',
  },
  {
    id: 4,
    name: 'Dr. Lisa H.',
    initials: 'LH',
    bezirk: 'Charlottenburg',
    rating: 5,
    date: 'vor 6 Wochen',
    text: 'Sicherungskasten-Sanierung in der Praxis — wir mussten 4 Stunden ohne Strom. Das Team war exakt nach Zeitplan fertig, alles VDE-konform protokolliert. Versicherer hatte keine Rückfragen.',
  },
  {
    id: 5,
    name: 'Tobias M.',
    initials: 'TM',
    bezirk: 'Wedding',
    rating: 4,
    date: 'vor 2 Monaten',
    text: 'LED-Umrüstung im Restaurant + DALI-Steuerung — saubere Arbeit, faire Preise. Einziger Punkt Abzug: Material-Liefertermin hat sich um eine Woche verschoben. Kommunikation war aber ehrlich.',
  },
];

function StarRow({ count, size = 'sm' }: { count: number; size?: 'sm' | 'lg' }) {
  const dimension = size === 'lg' ? 'h-6 w-6' : 'h-4 w-4';
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${dimension} ${i < count ? 'fill-cyan-500 text-cyan-500' : 'fill-stone-200 text-stone-200'}`}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const reduce = useReducedMotion();

  const headlineVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: 'easeOut' },
    },
  };

  const scoreVariants: Variants = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: reduce
        ? { duration: 0 }
        : { type: 'spring', stiffness: 180, damping: 18 },
    },
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.55, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="bewertungen"
      aria-label="Kundenbewertungen"
      className="relative w-full bg-white py-12 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mb-10 lg:mb-14"
        >
          <motion.h2
            variants={headlineVariants}
            className="text-3xl font-semibold tracking-tight text-indigo-950 sm:text-4xl lg:text-5xl"
          >
            Was unsere Kunden sagen
          </motion.h2>
          <motion.p
            variants={headlineVariants}
            className="mt-3 text-base text-stone-600 sm:text-lg"
          >
            Echte Bewertungen aus Berlin
          </motion.p>
        </motion.header>

        <motion.div
          variants={scoreVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-12 flex flex-col items-center gap-6 rounded-2xl bg-gradient-to-br from-stone-50 to-white p-8 shadow-md ring-1 ring-stone-900/5 sm:p-10 lg:mb-14 lg:flex-row lg:justify-between lg:gap-10"
        >
          <div className="flex flex-col items-center gap-3 lg:items-start">
            <div className="flex items-baseline gap-3">
              <span className="text-6xl font-bold leading-none text-indigo-950 tabular-nums sm:text-7xl">
                4.9
              </span>
              <span className="text-2xl font-medium text-stone-400">/ 5</span>
            </div>
            <StarRow count={5} size="lg" />
            <p className="text-sm text-stone-600 sm:text-base">
              aus <span className="font-semibold text-indigo-950">132</span> Google-Bewertungen
            </p>
          </div>

          <div
            aria-label="Verifiziert durch Google"
            className="flex items-center gap-3 rounded-full border border-stone-200 bg-white px-5 py-3 shadow-sm"
          >
            <ShieldCheck
              className="h-5 w-5 text-indigo-950"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="text-sm font-semibold text-indigo-950 sm:text-base">
              Verified by Google
            </span>
          </div>
        </motion.div>

        <motion.ul
          role="list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6"
        >
          {reviews.map((review, index) => (
            <motion.li
              key={review.id}
              variants={cardVariants}
              whileHover={
                reduce
                  ? undefined
                  : {
                      y: -4,
                      boxShadow: '0 18px 40px -12px rgba(15, 23, 42, 0.18)',
                      transition: { type: 'spring', stiffness: 320, damping: 22 },
                    }
              }
              className={`relative flex flex-col rounded-2xl border border-stone-200 bg-stone-50 p-6 lg:col-span-2 ${
                index === 3 ? 'lg:col-start-2' : ''
              }`}
            >
              <Quote
                className="absolute right-5 top-5 h-7 w-7 text-indigo-950/10"
                strokeWidth={1.5}
                aria-hidden="true"
              />

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-950 text-sm font-bold text-white"
                  >
                    {review.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-indigo-950">{review.name}</p>
                    <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-stone-500">
                      <MapPin className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                      {review.bezirk}
                    </span>
                  </div>
                </div>
                <span className="shrink-0 text-xs text-stone-500 font-mono-meta">{review.date}</span>
              </div>

              <div className="mt-4">
                <StarRow count={review.rating} />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-stone-700 sm:text-base">
                {review.text}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-10 text-center">
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-700 underline underline-offset-4 transition-colors hover:text-indigo-950 sm:text-base"
          >
            Alle Bewertungen auf Google ansehen
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
