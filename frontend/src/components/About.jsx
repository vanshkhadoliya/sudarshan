import { Building2, GraduationCap, MapPin, Medal } from "lucide-react";
import { aboutFacts, profile, socials, stats } from "../mock";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SocialIcon from "./SocialIcon";

const factIcons = {
  graduation: GraduationCap,
  building: Building2,
  pin: MapPin,
  medal: Medal,
};

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            depth="DEPTH 40 M · SUNLIT ZONE"
            title="Diagnostics of a first-year builder"
            sub={profile.rolesLine}
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <Reveal className="rounded-3xl border border-white/15 bg-[#07203a]/35 p-8 backdrop-blur-md">
            <p className="font-mono text-[10px] tracking-[0.4em] text-teal-200/80">BIOGRAPHY</p>
            <p className="mt-4 leading-relaxed text-slate-100/90">{profile.bio}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {aboutFacts.map((f) => {
                const Icon = factIcons[f.icon];
                return (
                  <div
                    key={f.text}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-2.5 text-xs text-slate-200"
                  >
                    <Icon size={14} className="shrink-0 text-teal-300" />
                    {f.text}
                  </div>
                );
              })}
            </div>

            <div className="my-7 h-px bg-white/10" />

            <p className="font-mono text-[10px] tracking-[0.4em] text-teal-200/80">ELSEWHERE</p>
            <p className="mt-2 text-sm text-slate-300">Follow the work beyond this dive.</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {socials.map((s) => (
                <div key={s.id}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-[#081c30]/80 px-3 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#0d2c49]"
                  >
                    <SocialIcon icon={s.icon} size={13} />
                    {s.label}
                  </a>
                  <p className="mt-2 text-center text-[10px] leading-snug text-slate-400">
                    {s.caption}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 90}
                className="flex flex-col justify-center rounded-3xl border border-white/15 bg-[#07203a]/35 p-6 backdrop-blur-md"
              >
                <span className="font-display text-4xl font-medium text-white md:text-5xl">
                  {s.value}
                </span>
                <span className="mt-3 font-mono text-[10px] tracking-[0.3em] text-teal-200/80">
                  {s.label}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
