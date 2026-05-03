'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { AlertTriangle, Clock, Phone, ShieldCheck } from 'lucide-react';

const NOTDIENST_TEL = '+4930567890000';
const NOTDIENST_TEL_DISPLAY = '030 5678 9000';

export default function Notdienst() {
  const reduce = useReducedMotion();

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 28, scale: reduce ? 1 : 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="notdienst"
      aria-label="24-Stunden-Notdienst"
      className="relative w-full bg-stone-900 py-12 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-600/10 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-5xl px-4">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="overflow-hidden rounded-3xl bg-gradient-to-br from-stone-800 to-stone-900 p-8 shadow-2xl ring-1 ring-orange-600/20 sm:p-12 lg:p-16"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:items-center">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-600/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-300 font-mono-meta">
                <span className="live-dot inline-block h-2 w-2 rounded-full bg-green-400" />
                Aktuell verfügbar · 24 / 7 / 365
              </div>

              <h2 className="mt-6 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                Strom weg, Sicherung raus,{' '}
                <span className="italic font-normal text-stone-300">Funken im Schalter?</span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-300 sm:text-lg">
                Tag und Nacht erreichbar — Montag bis Sonntag. Anfahrt innerhalb 60 Min in Berlin.
                Direkt der Meister am Telefon.
              </p>

              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <li className="flex items-start gap-3 text-sm text-stone-300">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" strokeWidth={1.75} />
                  <span><span className="font-semibold text-white">Reaktionszeit ≤ 60 Min</span> in S-Bahn-Ring</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-stone-300">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" strokeWidth={1.75} />
                  <span><span className="font-semibold text-white">Versichert</span> · Wohngebäude-VS deckt Notdienst</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-stone-300">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" strokeWidth={1.75} />
                  <span><span className="font-semibold text-white">Anfahrt 49 €</span> · transparent vorab</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-stone-300">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" strokeWidth={1.75} />
                  <span><span className="font-semibold text-white">Stundensatz 89 € / 119 €</span> Notfall ab 18 Uhr</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 font-mono-meta">
                  Notdienst-Hotline
                </p>
                <a
                  href={`tel:${NOTDIENST_TEL}`}
                  className="mt-3 block text-3xl font-bold tracking-tight text-white tabular-nums hover:text-orange-300 transition-colors sm:text-4xl"
                >
                  {NOTDIENST_TEL_DISPLAY}
                </a>
                <a
                  href={`tel:${NOTDIENST_TEL}`}
                  className="mt-6 inline-flex w-full min-h-14 items-center justify-center gap-2 rounded-full bg-orange-600 px-6 text-base font-semibold text-white shadow-lg shadow-orange-600/25 transition-colors hover:bg-orange-500"
                >
                  <Phone className="h-5 w-5" strokeWidth={2.25} />
                  Jetzt anrufen
                </a>
                <p className="mt-4 text-center text-xs text-stone-400">
                  Mo–So · 0–24 Uhr · Festnetzpreis
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
