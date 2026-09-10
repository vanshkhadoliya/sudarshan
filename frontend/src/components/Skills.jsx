import { useState } from "react";
import { Radar } from "lucide-react";
import { skills } from "../mock";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  const [active, setActive] = useState(null);

  return (
    <section id="skills" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            depth="DEPTH 400 M · TWILIGHT ZONE"
            title="A small system of orbiting skills"
            sub="Hover a planet to open its dossier — no progress bars, just honest orbits."
          />
        </Reveal>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="relative mx-auto h-[380px] w-full max-w-[560px] sm:h-[480px] lg:h-[560px]">
            <div className="absolute inset-0 scale-[0.62] sm:scale-75 lg:scale-100">
              {skills.map((s) => (
                <div
                  key={`ring-${s.id}`}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                  style={{ width: s.orbitRadius * 2, height: s.orbitRadius * 2 }}
                />
              ))}

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="animate-float h-10 w-10 rounded-full bg-teal-300/80 shadow-[0_0_50px_rgba(45,212,191,0.8)]" />
              </div>

              {skills.map((s) => (
                <div
                  key={s.id}
                  className="orbit-rot absolute left-1/2 top-1/2"
                  style={{ animationDuration: `${s.duration}s` }}
                >
                  <div
                    className="absolute"
                    style={{ transform: `translate(-50%,-50%) translateY(-${s.orbitRadius}px)` }}
                  >
                    <div
                      className="orbit-counter flex flex-col items-center"
                      style={{ animationDuration: `${s.duration}s` }}
                    >
                      <button
                        onMouseEnter={() => setActive(s)}
                        onMouseLeave={() => setActive(null)}
                        onFocus={() => setActive(s)}
                        onBlur={() => setActive(null)}
                        aria-label={s.name}
                        className={`grid place-items-center rounded-full transition-[box-shadow] duration-300 ${
                          active?.id === s.id ? "ring-2 ring-white/70" : ""
                        }`}
                        style={{
                          width: s.size,
                          height: s.size,
                          background: `radial-gradient(circle at 32% 30%, rgba(255,255,255,0.55), ${s.hue} 45%, rgba(6,40,60,0.92) 100%)`,
                          boxShadow: `0 0 32px ${s.hue}55`,
                        }}
                      >
                        <span className="font-mono text-[11px] font-medium text-[#04202b]">
                          {s.abbr}
                        </span>
                      </button>
                      <p className="mt-2 whitespace-nowrap text-xs text-slate-300">{s.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="min-h-[300px] rounded-3xl border border-white/15 bg-[#051a30]/45 p-8 backdrop-blur-md">
              {active ? (
                <div key={active.id} className="animate-fade-up">
                  <p className="font-mono text-[10px] tracking-[0.4em] text-teal-200/80">
                    TELEMETRY · {active.abbr.toUpperCase()}
                  </p>
                  <h3 className="mt-3 font-display text-3xl text-white">{active.name}</h3>
                  <p className="mt-4 leading-relaxed text-slate-300">{active.blurb}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {active.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div key="idle" className="animate-fade-up">
                  <p className="font-mono text-[10px] tracking-[0.4em] text-teal-200/80">STANDBY</p>
                  <div className="mt-6 grid h-12 w-12 place-items-center rounded-2xl border border-teal-300/30 bg-teal-400/10">
                    <Radar size={20} className="animate-pulse text-teal-300" />
                  </div>
                  <p className="mt-5 leading-relaxed text-slate-300">
                    Sonar idle. Point at a planet and its telemetry appears here.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
