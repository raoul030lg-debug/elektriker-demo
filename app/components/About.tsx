'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ShieldCheck, Sparkles, Wrench, type LucideIcon } from 'lucide-react';

const story = [
  'Ich komme aus Wedding und hab nach der Mittleren Reife direkt mit der Elektriker-Lehre angefangen — 9 Jahre als Geselle, bevor ich 2018 meinen Meisterbrief in der Tasche hatte.',
  'Heute leite ich einen Familienbetrieb mit 4 festen Mitarbeitern, mein Bruder Yusuf macht die Disposition. Wir arbeiten in ganz Berlin, am liebsten im Norden — Wedding, Pankow, Reinickendorf.',
  'Was mich von vielen anderen unterscheidet: Ich nehme den Notdienst-Anruf selbst entgegen. Auch nachts. Sie reden direkt mit dem Meister — nicht mit einem Callcenter.',
  'Wir sind Mitglied der Elektro-Innung Berlin, eichrechtszertifiziert für Wallboxen und tragen für jeden Auftrag eine Berufshaftpflicht über 5 Mio. €.',
];

type Trait = {
  icon: LucideIcon;
  phrase: string;
  detail: string;
};

const traits: Trait[] = [
  {
    icon: Sparkles,
    phrase: '„Geht-nicht gibt\u2019s nicht"',
    detail: 'Auch im Altbau ohne Wandschlitze — wir finden einen Weg.',
  },
  {
    icon: Wrench,
    phrase: '„Erst messen, dann bohren"',
    detail: 'Lastberechnung vorab — keine durchgebrannten Sicherungen.',
  },
  {
    icon: ShieldCheck,
    phrase: '„Sauber kommen, sauber gehen"',
    detail: 'Wir verlassen Ihre Wohnung wie wir sie vorgefunden haben.',
  },
];

export default function About() {
  const reduce = useReducedMotion();

  const headlineVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: 'easeOut' },
    },
  };

  const photoVariants: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: reduce
        ? { duration: 0 }
        : { type: 'spring', stiffness: 110, damping: 18, mass: 0.9 },
    },
  };

  const textColumnVariants: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: reduce
        ? { duration: 0 }
        : { type: 'spring', stiffness: 110, damping: 18, mass: 0.9, delay: 0.2 },
    },
  };

  const traitsContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };

  const traitItemVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="ueber-uns"
      aria-label="Über uns"
      className="relative w-full bg-stone-50 py-12 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4">
        <motion.h2
          variants={headlineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mb-10 text-3xl font-semibold tracking-tight text-indigo-950 sm:text-4xl lg:mb-14 lg:text-5xl"
        >
          Wer hinter den{' '}
          <span className="italic font-normal text-stone-700">Sicherungen</span> steht
        </motion.h2>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-5 lg:gap-16">
          <motion.figure
            variants={photoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto w-full max-w-sm lg:col-span-2 lg:mx-0 lg:max-w-none"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-stone-200 to-stone-300 shadow-lg ring-1 ring-stone-900/5">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="flex h-[200px] w-[200px] items-center justify-center rounded-full bg-indigo-950 shadow-xl ring-4 ring-white/40">
                  <span className="text-5xl font-bold tracking-wide text-white">MD</span>
                </div>
                <span className="text-xs font-medium text-stone-500 font-mono-meta">
                  Foto wird nachgereicht
                </span>
              </div>
            </div>
          </motion.figure>

          <motion.div
            variants={textColumnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-3"
          >
            <header className="mb-6">
              <h3 className="text-2xl font-semibold text-indigo-950 sm:text-3xl">
                Mehmet Demir
              </h3>
              <p className="mt-1 text-base font-medium text-cyan-700 font-mono-meta">
                Elektromeister · Inhaber
              </p>
            </header>

            <div className="space-y-4">
              {story.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-stone-700 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <hr className="my-8 border-stone-200" />

            <motion.ul
              role="list"
              variants={traitsContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-4"
            >
              {traits.map((trait) => {
                const Icon = trait.icon;
                return (
                  <motion.li
                    key={trait.phrase}
                    variants={traitItemVariants}
                    className="flex items-start gap-4"
                  >
                    <div
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/[0.10] text-cyan-700"
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="font-semibold text-indigo-950">{trait.phrase}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-stone-600">
                        {trait.detail}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
