'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  AlertTriangle,
  Cpu,
  Lightbulb,
  Plug,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react';

type Service = {
  icon: LucideIcon;
  headline: string;
  beschreibung: string;
  preis: string;
  accent?: 'cyan' | 'orange';
};

const services: Service[] = [
  {
    icon: Zap,
    headline: 'Sicherungskasten erneuern',
    beschreibung: 'FI-Schalter, Unterverteilung, normgerechte Beschriftung — VDE-konform.',
    preis: 'ab 1.200 €',
  },
  {
    icon: Cpu,
    headline: 'Smarthome-Installation',
    beschreibung: 'KNX, Loxone, Homematic — Beleuchtung, Heizung, Beschattung zentral.',
    preis: 'ab 3.000 €',
  },
  {
    icon: Plug,
    headline: 'E-Auto-Wallbox',
    beschreibung: '11 kW oder 22 kW · KfW-förderfähig · Eichrechtskonform.',
    preis: 'ab 600 €',
  },
  {
    icon: Lightbulb,
    headline: 'Beleuchtungsplanung',
    beschreibung: 'Lichtkonzept, LED-Umrüstung, dimmbare Szenen für Wohnen & Büro.',
    preis: 'auf Anfrage',
  },
  {
    icon: AlertTriangle,
    headline: '24h Notdienst',
    beschreibung: 'Stromausfall, Kurzschluss, Sicherung defekt — 60 Min Anfahrt in Berlin.',
    preis: '49 € Anfahrt',
    accent: 'orange',
  },
  {
    icon: Wrench,
    headline: 'Reparaturen',
    beschreibung: 'Steckdosen, Lichtschalter, Herd-Anschluss — schnell & sauber.',
    preis: 'ab 89 €/h',
  },
];

export default function Services() {
  const reduce = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };

  const headlineVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: 'easeOut' },
    },
  };

  const sublineVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.2, ease: 'easeOut' },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="leistungen"
      aria-label="Leistungen"
      className="relative w-full bg-white py-12 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-10 lg:mb-14"
        >
          <motion.h2
            variants={headlineVariants}
            className="text-3xl font-semibold tracking-tight text-indigo-950 sm:text-4xl lg:text-5xl"
          >
            Leistungen
          </motion.h2>
          <motion.p
            variants={sublineVariants}
            className="mt-3 text-base text-stone-600 sm:text-lg"
          >
            Sechs Bereiche, ein Anspruch — Berliner Elektro-Handwerk seit 12 Jahren
          </motion.p>
        </motion.header>

        <motion.ul
          role="list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            const isOrange = service.accent === 'orange';
            const iconWrapClass = isOrange
              ? 'bg-orange-600/[0.10] text-orange-700 group-hover:bg-orange-600/[0.16]'
              : 'bg-cyan-500/[0.08] text-cyan-700 group-hover:bg-cyan-500/[0.14]';
            const priceClass = isOrange
              ? 'bg-orange-600/[0.10] text-orange-700'
              : 'bg-cyan-500/[0.10] text-cyan-700';

            return (
              <motion.li
                key={service.headline}
                variants={cardVariants}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -4,
                        boxShadow: '0 20px 40px -12px rgba(15, 23, 42, 0.18)',
                        transition: { type: 'spring', stiffness: 320, damping: 22 },
                      }
                }
                whileTap={reduce ? undefined : { scale: 0.98 }}
                className="group relative flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div
                  aria-hidden="true"
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-colors duration-300 ${iconWrapClass}`}
                >
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </div>

                <h3 className="text-xl font-semibold leading-snug text-indigo-950 sm:text-2xl">
                  {service.headline}
                </h3>

                <p className="mt-2 min-h-[3rem] text-base leading-relaxed text-stone-600">
                  {service.beschreibung}
                </p>

                <div className="mt-6 flex items-center">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${priceClass}`}
                  >
                    {service.preis}
                  </span>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
