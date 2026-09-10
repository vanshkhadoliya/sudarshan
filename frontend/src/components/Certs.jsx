import { Award } from "lucide-react";
import { certs } from "../mock";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Certs() {
  return (
    <section id="certs" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            depth="DEPTH 6000 M · HADAL ZONE"
            title="Credentials & achievements"
            sub="An honest shelf: early in the journey, filling up fast."
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((c, i) => (
            <Reveal
              key={c.title}
              delay={i * 100}
              className="rounded-3xl border border-white/15 bg-[#051a30]/45 p-8 backdrop-blur-md"
            >
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-teal-300/30 bg-teal-400/10">
                <Award size={18} className="text-teal-300" />
              </div>
              <h3 className="mt-5 font-display text-xl text-white">{c.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{c.subtitle}</p>
              <p className="mt-4 font-mono text-[11px] tracking-[0.25em] text-teal-300">{c.period}</p>
              <div className="my-5 h-px bg-white/10" />
              <p className="text-sm text-slate-400">{c.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
