import { journey } from "../mock";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Journey() {
  return (
    <section id="journey" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            depth="DEPTH 4000 M · ABYSSAL ZONE"
            title="The descent log"
            sub="Where I am, and how I got here."
          />
        </Reveal>

        <div className="relative ml-2 max-w-3xl space-y-6 border-l border-white/15 pl-8">
          {journey.map((j, i) => (
            <Reveal key={j.title} delay={i * 110} className="relative">
              <span className="absolute -left-[37px] top-7 h-2.5 w-2.5 rounded-full bg-teal-300 shadow-[0_0_12px_rgba(45,212,191,0.9)]" />
              <div className="rounded-3xl border border-white/15 bg-[#051a30]/45 p-7 backdrop-blur-md">
                <p className="font-mono text-[11px] tracking-[0.25em] text-teal-300">{j.date}</p>
                <h3 className="mt-2 font-display text-xl text-white md:text-2xl">{j.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{j.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{j.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
