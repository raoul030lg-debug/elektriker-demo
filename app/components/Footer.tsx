'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Zap,
} from 'lucide-react';

const bezirke = ['Wedding', 'Mitte', 'Pankow', 'Reinickendorf', 'Charlottenburg'];

const COOKIE_KEY = 'elektro-demir-cookie-consent';

export default function Footer() {
  return (
    <>
      <footer className="bg-stone-900 text-stone-300">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:py-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div>
              <p className="flex items-center gap-2 text-xl font-semibold text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400">
                  <Zap className="h-4 w-4" strokeWidth={2.25} />
                </span>
                Elektro Demir
              </p>
              <p className="mt-2 text-sm text-stone-400">
                Berliner Elektro-Handwerk seit 12 Jahren
              </p>
              <p className="mt-2 text-sm font-semibold text-orange-400">
                Notdienst 24/7 · 030 5678 9000
              </p>
              <p className="mt-6 text-xs italic text-stone-500 font-mono-meta">
                Demo-Website von 030 Digital Berlin
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono-meta">
                Kontakt
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-2.5">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-stone-400"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span>
                    Müllerstraße 99
                    <br />
                    13357 Berlin Wedding
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone
                    className="h-4 w-4 shrink-0 text-stone-400"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <a
                    href="tel:+4930567890000"
                    className="transition-colors hover:text-white tabular-nums"
                  >
                    030 5678 9000
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail
                    className="h-4 w-4 shrink-0 text-stone-400"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <a
                    href="mailto:info@elektro-demir-demo.de"
                    className="break-all transition-colors hover:text-white"
                  >
                    info@elektro-demir-demo.de
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <MessageCircle
                    className="h-4 w-4 shrink-0 text-stone-400"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <a
                    href="https://wa.me/4917012345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white tabular-nums"
                  >
                    +49 170 1234 5678
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock
                    className="h-4 w-4 shrink-0 text-stone-400"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span>Mo-Fr 8-18 Uhr · Notdienst 24/7</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono-meta">
                Wir sind aktiv in
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {bezirke.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-stone-500">
                ganz Berlin auf Anfrage · Notdienst innerhalb S-Bahn-Ring
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono-meta">
                Vertrauen
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-2.5">
                  <Shield
                    className="mt-0.5 h-4 w-4 shrink-0 text-stone-400"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span>Mitglied der Elektro-Innung Berlin</span>
                </li>
                <li className="text-stone-400">HWK-Nr.: D-HWK-67890</li>
                <li className="text-stone-400">Steuernr.: 13/468/01234</li>
                <li className="text-stone-400">Berufshaftpflicht 5 Mio. €</li>
                <li className="text-stone-400">Eichrecht-Zertifiziert (Wallbox)</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-stone-800 pt-6 text-sm sm:flex-row">
            <p className="text-stone-500">
              © 2026 Elektro Demir GmbH (Demo-Website)
            </p>
            <nav aria-label="Rechtliches">
              <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-stone-400">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Impressum
                  </a>
                </li>
                <li>
                  <a href="#datenschutz" className="transition-colors hover:text-white">
                    Datenschutz
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    AGB
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>

      <CookieBanner />
    </>
  );
}

function CookieBanner() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(COOKIE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function decide(value: 'accepted' | 'declined') {
    try {
      window.localStorage.setItem(COOKIE_KEY, value);
    } catch {}
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie-Hinweis"
          initial={reduce ? { opacity: 1 } : { y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: '100%', opacity: 0 }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: 'spring', stiffness: 280, damping: 32 }
          }
          className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white shadow-2xl"
        >
          <div className="mx-auto flex max-w-4xl flex-col items-stretch gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5">
            <p className="text-sm leading-relaxed text-stone-700">
              Diese Website verwendet Cookies für ein besseres Nutzungserlebnis.{' '}
              <a
                href="#datenschutz"
                className="font-medium text-indigo-950 underline underline-offset-2 hover:text-cyan-700"
              >
                Mehr erfahren →
              </a>
            </p>
            <div className="flex shrink-0 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => decide('declined')}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold text-stone-700 transition-colors hover:border-stone-400 hover:text-stone-900 sm:flex-none"
              >
                Ablehnen
              </button>
              <button
                type="button"
                onClick={() => decide('accepted')}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-indigo-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-indigo-900 sm:flex-none"
              >
                Akzeptieren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
