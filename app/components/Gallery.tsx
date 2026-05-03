'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';

type Kategorie =
  | 'Sicherungskasten'
  | 'Wallbox'
  | 'Smarthome'
  | 'Beleuchtung'
  | 'Notdienst';

type Project = {
  id: number;
  kategorie: Kategorie;
  bezirk: string;
  dauer: string;
  besonderheit: string;
};

const projects: Project[] = [
  { id: 1, kategorie: 'Sicherungskasten', bezirk: 'Wedding', dauer: '1 Tag', besonderheit: 'Komplettsanierung Altbau · 12 Sicherungen + FI' },
  { id: 2, kategorie: 'Wallbox', bezirk: 'Pankow', dauer: '4 Std', besonderheit: '11 kW KEBA · KfW-gefördert · Tiefgarage' },
  { id: 3, kategorie: 'Smarthome', bezirk: 'Charlottenburg', dauer: '5 Tage', besonderheit: 'KNX-Anlage · 38 Aktoren · Loxone-Visualisierung' },
  { id: 4, kategorie: 'Sicherungskasten', bezirk: 'Mitte', dauer: '1 Tag', besonderheit: 'Verteiler-Tausch in bewohntem Büro · 4 Std Strom-Aus' },
  { id: 5, kategorie: 'Beleuchtung', bezirk: 'Friedrichshain', dauer: '2 Tage', besonderheit: 'Restaurant-Lichtkonzept · DALI-Bus · 64 Spots' },
  { id: 6, kategorie: 'Wallbox', bezirk: 'Reinickendorf', dauer: '6 Std', besonderheit: '22 kW Eichrecht · 3-Phasen + Lastmanagement' },
  { id: 7, kategorie: 'Notdienst', bezirk: 'Neukölln', dauer: '90 Min', besonderheit: 'Sonntag 23 Uhr · Kurzschluss Küche · Sicherung getauscht' },
  { id: 8, kategorie: 'Smarthome', bezirk: 'Prenzlauer Berg', dauer: '3 Tage', besonderheit: 'Homematic-Nachrüstung Altbau · ohne Wandschlitze' },
];

type FilterValue = 'Alle' | Kategorie;
const filters: FilterValue[] = ['Alle', 'Sicherungskasten', 'Wallbox', 'Smarthome', 'Beleuchtung', 'Notdienst'];

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n));
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const autoPlayedRef = useRef(false);
  const [position, setPosition] = useState(50);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const slideObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            slideObserver.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    slideObserver.observe(card);

    let autoObserver: IntersectionObserver | null = null;
    if (!reduced) {
      autoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !autoPlayedRef.current && !draggingRef.current) {
              autoPlayedRef.current = true;
              autoObserver?.disconnect();
              animateAuto();
            }
          });
        },
        { threshold: 0.5 },
      );
      autoObserver.observe(card);
    }

    return () => {
      slideObserver.disconnect();
      autoObserver?.disconnect();
    };
  }, []);

  function animateAuto() {
    const start = performance.now();
    const phase1 = 700;
    const phase2 = 800;
    const total = phase1 + phase2;

    function frame(now: number) {
      if (draggingRef.current) return;
      const elapsed = now - start;
      let next: number;
      if (elapsed < phase1) {
        const t = elapsed / phase1;
        next = 50 + (100 - 50) * easeInOutCubic(t);
      } else if (elapsed < total) {
        const t = (elapsed - phase1) / phase2;
        next = 100 + (50 - 100) * easeInOutCubic(t);
      } else {
        setPosition(50);
        return;
      }
      setPosition(next);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function updateFromClientX(clientX: number) {
    const slider = sliderRef.current;
    if (!slider) return;
    const rect = slider.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(clamp(pct));
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    autoPlayedRef.current = true;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = false;
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {}
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowLeft') {
      autoPlayedRef.current = true;
      setPosition((p) => clamp(p - 5));
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      autoPlayedRef.current = true;
      setPosition((p) => clamp(p + 5));
      e.preventDefault();
    }
  }

  return (
    <article
      ref={cardRef}
      className="gallery-card group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-stone-900/5 transition-all duration-300 hover:shadow-2xl hover:ring-stone-900/10"
      style={{ '--card-delay': `${index * 100}ms` } as React.CSSProperties}
    >
      <div
        ref={sliderRef}
        role="slider"
        tabIndex={0}
        aria-label={`Vorher-Nachher-Vergleich: ${project.kategorie} in ${project.bezirk}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        className="relative aspect-[4/3] w-full cursor-ew-resize select-none touch-pan-y overflow-hidden bg-stone-200 outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/40"
      >
        <div className="absolute inset-0 flex items-center justify-center bg-stone-400">
          <span className="text-2xl font-bold tracking-widest text-white/80">VORHER</span>
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center bg-cyan-200"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <span className="text-2xl font-bold tracking-widest text-cyan-950/70">NACHHER</span>
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-stone-900/10">
            <ChevronLeft className="h-4 w-4 text-indigo-950" strokeWidth={2.5} />
            <ChevronRight className="-ml-1 h-4 w-4 text-indigo-950" strokeWidth={2.5} />
          </div>
        </div>

        <div className="pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-indigo-950/85 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          {project.kategorie}
        </div>
      </div>

      <div className="flex flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-950/[0.06] px-3 py-1 text-sm font-medium text-indigo-950">
            <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
            {project.bezirk}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/[0.10] px-3 py-1 text-sm font-medium text-cyan-700">
            <Clock className="h-3.5 w-3.5" strokeWidth={2} />
            {project.dauer}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-stone-600">{project.besonderheit}</p>
      </div>
    </article>
  );
}

export default function Gallery() {
  const [active, setActive] = useState<FilterValue>('Alle');

  const filtered = useMemo(
    () => (active === 'Alle' ? projects : projects.filter((p) => p.kategorie === active)),
    [active],
  );

  return (
    <section
      id="galerie"
      aria-label="Vorher-Nachher-Galerie"
      className="relative w-full bg-stone-50 py-12 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-10 lg:mb-14">
          <h2 className="text-3xl font-semibold tracking-tight text-indigo-950 sm:text-4xl lg:text-5xl">
            Unsere Arbeit
          </h2>
          <p className="mt-3 text-base text-stone-600 sm:text-lg">
            Vorher und Nachher — echte Berliner Installationen
          </p>
        </header>

        <div
          role="tablist"
          aria-label="Projekte filtern"
          className="mb-10 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
        >
          {filters.map((f) => {
            const isActive = active === f;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(f)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-950 text-white shadow-md'
                    : 'border border-stone-300 bg-white text-stone-700 hover:border-indigo-950 hover:text-indigo-950'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
