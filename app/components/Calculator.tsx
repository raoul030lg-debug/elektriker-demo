'use client';

import { useMemo, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import {
  AlertTriangle,
  Cpu,
  MessageCircle,
  Plug,
  Zap,
  type LucideIcon,
} from 'lucide-react';

type ServiceId = 'sicherung' | 'wallbox' | 'smarthome' | 'notdienst';

type ServiceOption = {
  id: ServiceId;
  label: string;
  icon: LucideIcon;
};

const serviceOptions: ServiceOption[] = [
  { id: 'sicherung', label: 'Sicherungskasten', icon: Zap },
  { id: 'wallbox', label: 'E-Auto-Wallbox', icon: Plug },
  { id: 'smarthome', label: 'Smarthome', icon: Cpu },
  { id: 'notdienst', label: 'Notdienst', icon: AlertTriangle },
];

const fixedPrices: Record<ServiceId, { min: number; max: number }> = {
  sicherung: { min: 1200, max: 2500 },
  wallbox: { min: 600, max: 1500 },
  smarthome: { min: 3000, max: 15000 },
  notdienst: { min: 0, max: 0 },
};

const NOTDIENST_ANFAHRT = 49;
const NOTDIENST_TAG = 89;
const NOTDIENST_NACHT = 119;

const QM_MIN = 1;
const QM_MAX = 6;
const WA_NUMBER = '4917012345678';

const numberFormatter = new Intl.NumberFormat('de-DE');
function formatEur(value: number) {
  return `${numberFormatter.format(Math.round(value))} €`;
}

function calculatePrice(stunden: number, active: Set<ServiceId>) {
  if (active.size === 0) return null;
  let min = 0;
  let max = 0;
  active.forEach((id) => {
    if (id === 'notdienst') {
      min += NOTDIENST_ANFAHRT + stunden * NOTDIENST_TAG;
      max += NOTDIENST_ANFAHRT + stunden * NOTDIENST_NACHT;
    } else {
      const p = fixedPrices[id];
      min += p.min;
      max += p.max;
    }
  });
  return { min, max };
}

export default function Calculator() {
  const reduce = useReducedMotion();
  const [stunden, setStunden] = useState(2);
  const [active, setActive] = useState<Set<ServiceId>>(new Set());

  function toggle(id: ServiceId) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const price = useMemo(() => calculatePrice(stunden, active), [stunden, active]);
  const trackFillPct = ((stunden - QM_MIN) / (QM_MAX - QM_MIN)) * 100;
  const showStundenSlider = active.has('notdienst');

  const waHref = useMemo(() => {
    if (!price) return undefined;
    const labels = serviceOptions
      .filter((s) => active.has(s.id))
      .map((s) => s.label)
      .join(', ');
    const stundenText = showStundenSlider ? ` (Notdienst ca. ${stunden} Std)` : '';
    const text = `Hallo, ich interessiere mich für ${labels}${stundenText}. Der Online-Rechner zeigt eine Spanne von ${formatEur(price.min)} – ${formatEur(price.max)}. Können Sie mir einen Festpreis nach Vor-Ort-Termin machen?`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  }, [price, active, stunden, showStundenSlider]);

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: 'easeOut' },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.96, y: reduce ? 0 : 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: reduce
        ? { duration: 0 }
        : { type: 'spring', stiffness: 140, damping: 20 },
    },
  };

  const priceKey = price ? `${price.min}-${price.max}` : 'empty';

  return (
    <section
      id="kostenrechner"
      aria-label="Kostenrechner"
      className="relative w-full bg-stone-50 py-12 lg:py-20"
    >
      <div className="mx-auto max-w-4xl px-4">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-10 text-center lg:mb-14"
        >
          <motion.h2
            variants={headerVariants}
            className="text-3xl font-semibold tracking-tight text-indigo-950 sm:text-4xl lg:text-5xl"
          >
            Was kostet Ihre Installation?
          </motion.h2>
          <motion.p
            variants={headerVariants}
            className="mx-auto mt-3 max-w-2xl text-base text-stone-600 sm:text-lg"
          >
            Erste Orientierung in 30 Sekunden — verbindlicher Festpreis nach Vor-Ort-Termin
          </motion.p>
        </motion.header>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-stone-900/5 sm:p-10 md:p-12"
        >
          <fieldset>
            <legend className="text-sm font-semibold uppercase tracking-wider text-stone-500 font-mono-meta">
              1. Leistung wählen
            </legend>
            <p className="sr-only">Mehrfachauswahl möglich.</p>
            <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {serviceOptions.map((opt) => {
                const Icon = opt.icon;
                const isActive = active.has(opt.id);
                return (
                  <motion.button
                    key={opt.id}
                    type="button"
                    onClick={() => toggle(opt.id)}
                    aria-pressed={isActive}
                    whileTap={reduce ? undefined : { scale: 0.95 }}
                    className={`flex min-h-14 flex-col items-center justify-center gap-2 rounded-2xl px-3 py-4 text-sm font-semibold transition-all duration-200 sm:flex-row sm:gap-2.5 sm:text-base ${
                      isActive
                        ? 'bg-indigo-950 text-white shadow-lg shadow-indigo-950/20 ring-2 ring-indigo-950/30'
                        : 'border border-stone-200 bg-white text-stone-700 hover:border-indigo-950 hover:text-indigo-950'
                    }`}
                  >
                    <Icon
                      className="h-5 w-5 shrink-0"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span className="text-center leading-tight">{opt.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </fieldset>

          <AnimatePresence>
            {showStundenSlider && (
              <motion.div
                initial={reduce ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                transition={reduce ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <hr className="my-8 border-stone-200 sm:my-10" />
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <label
                      htmlFor="stunden-slider"
                      className="text-sm font-semibold uppercase tracking-wider text-stone-500 font-mono-meta"
                    >
                      2. Notdienst-Stunden
                    </label>
                    <span className="text-3xl font-bold tabular-nums text-indigo-950 sm:text-4xl">
                      {stunden} Std
                    </span>
                  </div>

                  <input
                    id="stunden-slider"
                    type="range"
                    min={QM_MIN}
                    max={QM_MAX}
                    step={1}
                    value={stunden}
                    onChange={(e) => setStunden(Number(e.target.value))}
                    aria-valuemin={QM_MIN}
                    aria-valuemax={QM_MAX}
                    aria-valuenow={stunden}
                    aria-label="Geschätzte Notdienst-Stunden"
                    className="calc-range mt-5 w-full"
                    style={{ '--fill': `${trackFillPct}%` } as React.CSSProperties}
                  />

                  <div className="mt-2 flex justify-between text-xs font-medium text-stone-500 font-mono-meta">
                    <span>1 Std</span>
                    <span>89 €/h Tag · 119 €/h Notfall (ab 18 Uhr)</span>
                    <span>6 Std</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <hr className="my-8 border-stone-200 sm:my-10" />

          <div className="rounded-2xl bg-gradient-to-br from-stone-50 to-white p-6 ring-1 ring-stone-900/5 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-stone-500 font-mono-meta">
              Preisspanne (geschätzt)
            </p>

            <div className="mt-3 min-h-[3.5rem] sm:min-h-[4.5rem]">
              <AnimatePresence mode="wait">
                {price ? (
                  <motion.p
                    key={priceKey}
                    initial={
                      reduce ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.98 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 0.25, ease: 'easeOut' }
                    }
                    className="text-3xl font-bold tabular-nums leading-tight text-indigo-950 sm:text-4xl lg:text-5xl"
                  >
                    {formatEur(price.min)} <span className="text-stone-400">–</span>{' '}
                    {formatEur(price.max)}
                  </motion.p>
                ) : (
                  <motion.p
                    key="empty"
                    initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={reduce ? { duration: 0 } : { duration: 0.2 }}
                    className="text-lg font-medium text-stone-500 sm:text-xl"
                  >
                    Bitte Leistung auswählen
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <p className="mt-2 text-sm text-stone-500">
              Endpreis nach kostenlosem Vor-Ort-Termin · Wallbox: KfW-Förderung möglich
            </p>

            <motion.a
              href={waHref ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!price}
              tabIndex={price ? 0 : -1}
              onClick={(e) => {
                if (!price) e.preventDefault();
              }}
              whileHover={
                reduce || !price
                  ? undefined
                  : { scale: 1.015, transition: { type: 'spring', stiffness: 320, damping: 22 } }
              }
              whileTap={reduce || !price ? undefined : { scale: 0.97 }}
              className={`mt-6 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full px-8 text-base font-semibold shadow-lg transition-colors sm:text-lg ${
                price
                  ? 'bg-green-600 text-white shadow-green-600/20 hover:bg-green-700'
                  : 'cursor-not-allowed bg-stone-200 text-stone-400 shadow-none'
              }`}
            >
              <MessageCircle
                className="h-5 w-5"
                strokeWidth={2}
                aria-hidden="true"
              />
              Per WhatsApp Festpreis anfragen
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
