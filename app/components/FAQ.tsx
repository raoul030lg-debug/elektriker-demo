'use client';

import { useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { ChevronDown } from 'lucide-react';

type Faq = {
  id: number;
  question: string;
  answer: string;
};

const faqs: Faq[] = [
  {
    id: 1,
    question: 'Was kostet der Notdienst nachts oder am Wochenende?',
    answer:
      'Anfahrt 49 € pauschal · Stundensatz 89 € tagsüber, 119 € nachts ab 18 Uhr und am Wochenende. Wir telefonieren vorher kurz durch, was anliegt — so wissen Sie spätestens nach 5 Min, was etwa auf Sie zukommt. Keine Mondpreise, keine Überraschungen.',
  },
  {
    id: 2,
    question: 'Bin ich versichert wenn etwas schiefgeht?',
    answer:
      'Ja. Wir tragen eine Berufshaftpflicht über 5 Mio. €, die jeden Schaden an Ihrer Wohnung oder am Hausnetz abdeckt. Außerdem alle Arbeiten VDE-konform protokolliert — Ihre Wohngebäudeversicherung erkennt das ohne Rückfragen an.',
  },
  {
    id: 3,
    question: 'Welche Garantie gibt es auf installierte Anlagen?',
    answer:
      '5 Jahre BGB-Gewährleistung schriftlich auf alle Installationen. Auf Wallboxen, Sicherungskästen und Smarthome-Aktoren gelten zusätzlich die Hersteller-Garantien (KEBA, ABB, Loxone meist 2-3 Jahre). Sollte etwas defekt sein, kommen wir innerhalb 24 Std vorbei.',
  },
  {
    id: 4,
    question: 'Bekomme ich KfW-Förderung für die Wallbox?',
    answer:
      'Aktuell läuft das Programm 442 nicht — aber viele Bundesländer und Stadtwerke fördern weiterhin. Wir füllen den Antrag für Sie aus und liefern die nötige Fachbetriebs-Bescheinigung. In den letzten 12 Monaten haben wir 87 % unserer Wallbox-Kunden zu Förderung verholfen.',
  },
  {
    id: 5,
    question: 'Beraten Sie auch zu Smarthome-Systemen?',
    answer:
      'Ja, kostenlos und herstellerneutral. Wir empfehlen je nach Bedarf KNX (für Neubau), Loxone (für Visualisierung), Homematic IP (Nachrüstung Altbau) oder bei kleinen Setups auch Shelly. 1-stündige Vor-Ort-Beratung mit Konzept-Skizze: 0 €.',
  },
  {
    id: 6,
    question: 'Wie schnell sind Sie im Notfall vor Ort?',
    answer:
      'Innerhalb des S-Bahn-Rings: max. 60 Min nach dem Anruf — meistens 30-45 Min. Außerhalb (Spandau, Köpenick, Pankow): bis 90 Min. Sie bekommen direkt am Telefon eine genaue Ankunftszeit, kein „so schnell wie möglich".',
  },
];

const WHATSAPP_HREF =
  'https://wa.me/4917012345678?text=Hallo%2C%20ich%20habe%20noch%20eine%20Frage.';

export default function FAQ() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<Set<number>>(new Set());

  function toggle(id: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: 'easeOut' },
    },
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="faq"
      aria-label="Häufige Fragen"
      className="relative w-full bg-stone-50 py-12 lg:py-20"
    >
      <div className="mx-auto max-w-4xl px-4">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mb-10 lg:mb-14"
        >
          <motion.h2
            variants={headerVariants}
            className="text-3xl font-semibold tracking-tight text-indigo-950 sm:text-4xl lg:text-5xl"
          >
            Häufige Fragen
          </motion.h2>
          <motion.p
            variants={headerVariants}
            className="mt-3 text-base text-stone-600 sm:text-lg"
          >
            Antworten auf die Fragen, die wir am häufigsten bekommen
          </motion.p>
        </motion.header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-stone-900/5"
        >
          {faqs.map((faq, index) => {
            const isOpen = open.has(faq.id);
            return (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className={index < faqs.length - 1 ? 'border-b border-stone-200' : ''}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${faq.id}`}
                    id={`faq-trigger-${faq.id}`}
                    className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-500/40 sm:px-7 sm:py-6"
                  >
                    <span className="text-base font-semibold text-indigo-950 sm:text-lg">
                      {faq.question}
                    </span>
                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 300, damping: 22 }
                      }
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-500/[0.10] text-cyan-700 transition-colors group-hover:bg-cyan-500/[0.18]"
                    >
                      <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={`faq-panel-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${faq.id}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={
                        reduce ? { height: 'auto', opacity: 1 } : { height: 'auto', opacity: 1 }
                      }
                      exit={reduce ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : {
                              height: { duration: 0.3, ease: 'easeOut' },
                              opacity: { duration: 0.2, ease: 'easeOut' },
                            }
                      }
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 pt-0 text-sm leading-relaxed text-stone-700 sm:px-7 sm:pb-7 sm:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        <p className="mt-8 text-center text-sm text-stone-600 sm:text-base">
          Noch eine Frage offen?{' '}
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-indigo-950 underline underline-offset-4 transition-colors hover:text-cyan-700"
          >
            Schreiben Sie uns auf WhatsApp →
          </a>
        </p>
      </div>
    </section>
  );
}
