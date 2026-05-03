'use client';

import { useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { AlertTriangle, CheckCircle2, MessageCircle, Phone, Send } from 'lucide-react';

type FormState = {
  name: string;
  phone: string;
  bezirk: string;
  anliegen: string;
  notfall: boolean;
  dsgvo: boolean;
};

type Errors = Partial<Record<'name' | 'phone' | 'dsgvo', string>>;

const bezirke = [
  'Wedding',
  'Mitte',
  'Pankow',
  'Reinickendorf',
  'Charlottenburg',
  'Spandau',
  'Kreuzberg',
  'Neukölln',
  'Friedrichshain',
  'Tempelhof',
  'Steglitz',
  'Lichtenberg',
  'Treptow',
  'Köpenick',
  'Anderer Bezirk',
];

const NOTDIENST_TEL = '+4930567890000';
const NOTDIENST_TEL_DISPLAY = '030 5678 9000';
const WHATSAPP_HREF =
  'https://wa.me/4917012345678?text=Hallo%2C%20ich%20interessiere%20mich%20für%20eine%20Beratung.';

const initialState: FormState = {
  name: '',
  phone: '',
  bezirk: '',
  anliegen: '',
  notfall: false,
  dsgvo: false,
};

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = 'Bitte geben Sie Ihren Namen an.';
  if (!form.phone.trim()) errors.phone = 'Bitte geben Sie eine Telefonnummer an.';
  if (!form.dsgvo) errors.dsgvo = 'Bitte stimmen Sie der Datenverarbeitung zu.';
  return errors;
}

export default function ContactForm() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Set<keyof FormState>>(new Set());

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (touched.has(key)) {
      const nextErrors = validate({ ...form, [key]: value });
      setErrors(nextErrors);
    }
  }

  function markTouched(key: keyof FormState) {
    setTouched((prev) => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
    setErrors(validate(form));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setTouched(new Set(['name', 'phone', 'dsgvo']));
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  function reset() {
    setForm(initialState);
    setErrors({});
    setTouched(new Set());
    setSubmitted(false);
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: 'easeOut' },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="anfrage"
      aria-label="Anfrage senden"
      className="relative w-full bg-indigo-950 py-12 lg:py-20"
    >
      <div className="mx-auto max-w-5xl px-4">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-10 text-center lg:mb-14"
        >
          <motion.h2
            variants={headerVariants}
            className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Bereit für Ihre{' '}
            <span className="italic font-normal text-stone-300">neue Installation?</span>
          </motion.h2>
          <motion.p
            variants={headerVariants}
            className="mx-auto mt-3 max-w-2xl text-base text-stone-300 sm:text-lg"
          >
            Schreiben Sie uns oder rufen Sie an — Notdienst Mo-So 0-24 Uhr · Termine binnen 24 Std
          </motion.p>
        </motion.header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          <motion.aside
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-6 lg:col-span-2"
          >
            <div className="flex flex-col rounded-3xl bg-orange-600 p-8 text-white shadow-xl sm:p-9">
              <div
                aria-hidden="true"
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm"
              >
                <Phone className="h-7 w-7" strokeWidth={1.75} />
              </div>

              <h3 className="text-xl font-semibold leading-tight sm:text-2xl">
                Notfall? Direkt anrufen.
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-orange-50/90 sm:text-base">
                24/7 erreichbar — Meister direkt am Telefon.
              </p>

              <a
                href={`tel:${NOTDIENST_TEL}`}
                className="mt-5 block text-2xl font-bold tracking-tight text-white tabular-nums hover:text-orange-100 transition-colors sm:text-3xl"
              >
                {NOTDIENST_TEL_DISPLAY}
              </a>
            </div>

            <div className="flex flex-col rounded-3xl bg-green-500 p-8 text-white shadow-xl sm:p-9">
              <div
                aria-hidden="true"
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm"
              >
                <MessageCircle className="h-7 w-7" strokeWidth={1.75} />
              </div>

              <h3 className="text-xl font-semibold leading-tight sm:text-2xl">
                Lieber per WhatsApp?
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-green-50/90 sm:text-base">
                Antwort meist innerhalb 30 Min · Mo-Fr 8-18 Uhr.
              </p>

              <motion.a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={
                  reduce
                    ? undefined
                    : {
                        scale: 1.02,
                        transition: { type: 'spring', stiffness: 320, damping: 22 },
                      }
                }
                whileTap={reduce ? undefined : { scale: 0.97 }}
                className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-green-700 shadow-lg shadow-green-700/20 transition-colors hover:bg-green-50 sm:text-base"
              >
                Per WhatsApp anfragen <span aria-hidden="true">→</span>
              </motion.a>
            </div>
          </motion.aside>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-3xl bg-white p-6 shadow-xl sm:p-10 lg:col-span-3"
          >
            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.div
                  key="success"
                  initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }}
                  className="flex flex-col items-center text-center"
                  role="status"
                  aria-live="polite"
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-9 w-9" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-semibold text-indigo-950 sm:text-3xl">
                    Vielen Dank für Ihre Anfrage!
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-stone-600 sm:text-lg">
                    {form.notfall
                      ? 'Notfall registriert — wir rufen Sie binnen 15 Min zurück.'
                      : 'Wir melden uns binnen 24 Stunden.'}
                  </p>
                  <p className="mt-2 max-w-md text-sm text-stone-500">
                    Sie erhalten eine Bestätigungs-SMS an die angegebene Nummer.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-6 text-sm font-medium text-stone-700 underline underline-offset-4 transition-colors hover:text-indigo-950"
                  >
                    Neue Anfrage stellen
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
                  className="flex flex-col gap-5"
                >
                  <button
                    type="button"
                    onClick={() => setField('notfall', !form.notfall)}
                    aria-pressed={form.notfall}
                    className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all duration-200 ${
                      form.notfall
                        ? 'border-orange-600 bg-orange-50 ring-2 ring-orange-600/20'
                        : 'border-stone-200 bg-white hover:border-orange-400'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        form.notfall ? 'bg-orange-600 text-white' : 'bg-orange-600/10 text-orange-600'
                      }`}
                    >
                      <AlertTriangle className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-indigo-950 sm:text-base">
                        Notfall — Rückruf binnen 15 Min
                      </span>
                      <span className="block text-xs text-stone-500 sm:text-sm">
                        {form.notfall ? 'Aktiv · wir rufen sofort zurück' : 'Klicken zum Aktivieren'}
                      </span>
                    </span>
                  </button>

                  <Field
                    id="name"
                    label="Ihr Name"
                    required
                    error={errors.name}
                  >
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Max Mustermann"
                      value={form.name}
                      onChange={(e) => setField('name', e.target.value)}
                      onBlur={() => markTouched('name')}
                      aria-required
                      aria-invalid={Boolean(errors.name) || undefined}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={inputClass(Boolean(errors.name))}
                    />
                  </Field>

                  <Field
                    id="phone"
                    label="Telefonnummer"
                    required
                    error={errors.phone}
                  >
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="0151 12345678"
                      value={form.phone}
                      onChange={(e) => setField('phone', e.target.value)}
                      onBlur={() => markTouched('phone')}
                      aria-required
                      aria-invalid={Boolean(errors.phone) || undefined}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      className={inputClass(Boolean(errors.phone))}
                    />
                  </Field>

                  <Field id="bezirk" label="Bezirk">
                    <select
                      id="bezirk"
                      name="bezirk"
                      value={form.bezirk}
                      onChange={(e) => setField('bezirk', e.target.value)}
                      className={inputClass(false)}
                    >
                      <option value="">Bezirk wählen</option>
                      {bezirke.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field id="anliegen" label="Was brauchen Sie?">
                    <textarea
                      id="anliegen"
                      name="anliegen"
                      rows={4}
                      placeholder="z.B. Wallbox 11 kW Tiefgarage, KfW-Antrag bitte mit ausfüllen"
                      value={form.anliegen}
                      onChange={(e) => setField('anliegen', e.target.value)}
                      className={`${inputClass(false)} resize-none`}
                    />
                  </Field>

                  <div>
                    <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-stone-700">
                      <input
                        type="checkbox"
                        checked={form.dsgvo}
                        onChange={(e) => setField('dsgvo', e.target.checked)}
                        onBlur={() => markTouched('dsgvo')}
                        aria-required
                        aria-invalid={Boolean(errors.dsgvo) || undefined}
                        aria-describedby={errors.dsgvo ? 'dsgvo-error' : undefined}
                        className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-2 border-stone-300 text-indigo-950 accent-indigo-950 focus-visible:ring-2 focus-visible:ring-cyan-500/40"
                      />
                      <span>
                        Ich habe die{' '}
                        <a
                          href="#datenschutz"
                          className="font-medium text-indigo-950 underline underline-offset-2 hover:text-cyan-700"
                        >
                          Datenschutzerklärung
                        </a>{' '}
                        gelesen und stimme der Verarbeitung meiner Daten zur Anfragenbearbeitung
                        zu. <span className="text-red-600">*</span>
                      </span>
                    </label>
                    {errors.dsgvo && (
                      <p
                        id="dsgvo-error"
                        role="alert"
                        className="mt-2 text-sm font-medium text-red-600"
                      >
                        {errors.dsgvo}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={
                      reduce
                        ? undefined
                        : {
                            scale: 1.015,
                            transition: { type: 'spring', stiffness: 320, damping: 22 },
                          }
                    }
                    whileTap={reduce ? undefined : { scale: 0.97 }}
                    className={`mt-2 inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-8 text-base font-semibold text-white shadow-lg transition-colors sm:text-lg ${
                      form.notfall
                        ? 'bg-orange-600 shadow-orange-600/25 hover:bg-orange-500'
                        : 'bg-indigo-950 shadow-indigo-950/20 hover:bg-indigo-900'
                    }`}
                  >
                    <Send className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                    {form.notfall ? 'Notfall melden' : 'Kostenlosen Termin anfragen'}
                  </motion.button>

                  <p className="text-center text-xs text-stone-500">
                    <span className="text-red-600">*</span> Pflichtfelder
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function inputClass(hasError: boolean) {
  return [
    'w-full rounded-xl border-2 bg-white px-4 py-3 text-base text-indigo-950 placeholder:text-stone-400',
    'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40',
    hasError
      ? 'border-red-500 focus:border-red-600'
      : 'border-stone-200 focus:border-indigo-950',
  ].join(' ');
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-indigo-950"
      >
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-sm font-medium text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
