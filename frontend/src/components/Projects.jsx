import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "../mock";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            depth="DEPTH 1200 M · MIDNIGHT ZONE"
            title="Things I've built and launched"
            sub="The first mission is always the featured one."
          />
        </Reveal>

        {projects.map((p) => (
          <Reveal
            key={p.title}
            className="rounded-3xl border border-white/15 bg-[#051a30]/45 p-8 backdrop-blur-md md:p-10"
          >
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-mono text-[10px] tracking-[0.4em] text-teal-200/80">{p.overline}</p>
              <span className="rounded-full border border-teal-300/30 bg-teal-400/15 px-3 py-1 font-mono text-[9px] tracking-[0.25em] text-teal-200">
                {p.badge}
              </span>
            </div>

            <h3 className="mt-4 font-display text-3xl text-white md:text-4xl">{p.title}</h3>
            <p className="mt-4 max-w-2xl leading-relaxed text-slate-300">{p.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white transition-colors hover:border-teal-300/50 hover:text-teal-200"
              >
                <Github size={15} /> GitHub <ArrowUpRight size={13} />
              </a>
              <span className="flex items-center gap-2 text-sm text-teal-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-teal-300" />
                {p.liveNote}
              </span>
            </div>
          </Reveal>
        ))}

        <Reveal delay={120} className="mt-6 rounded-3xl border border-dashed border-white/20 p-8 md:p-10">
          <p className="font-mono text-[10px] tracking-[0.4em] text-teal-200/80">NEXT DIVE</p>
          <p className="mt-3 max-w-xl text-slate-300">
            New builds are in the pressure chamber. Check back — or send me an idea worth diving for.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
