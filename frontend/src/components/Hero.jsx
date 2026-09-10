import { ArrowUpRight, ChevronDown, CircleArrowRight, Download, Mail } from "lucide-react";
import { toast } from "sonner";
import { profile, socials } from "../mock";
import SocialIcon from "./SocialIcon";

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero({ booted }) {
  const fade = (ms, extra = "") => ({
    className: `${booted ? "animate-fade-up" : "opacity-0"} ${extra}`,
    style: booted ? { animationDelay: `${ms}ms` } : undefined,
  });

  const downloadResume = () => {
    const lines = [
      profile.name.toUpperCase(),
      profile.rolesLine,
      "",
      `Location: ${profile.location}`,
      `Email: ${profile.email}`,
      `Phone: ${profile.phone}`,
      "",
      "EDUCATION",
      "B.Tech, Computer Science (Core) — JECRC University NCR, Alwar (2025 — Present)",
      "",
      "FOCUS",
      "Software Development · Lua · AI Engineering",
      "",
      "PROJECTS",
      "Deep Ocean Portfolio — React, TypeScript, Three.js, R3F, Framer Motion, Tailwind",
    ].join("\n");
    const blob = new Blob([lines], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Sudarshan_Soni_Resume.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    toast.success("Resume downloaded — safe travels to the surface.");
  };

  return (
    <section id="surface" className="relative flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-6xl px-6 pb-28 pt-32">
        <p {...fade(100, "font-mono text-[11px] tracking-[0.4em] text-[#0e4a5e]/85")}>
          ALWAR, RAJASTHAN · DEPTH 0 M
        </p>

        <h1
          {...fade(
            220,
            "mt-6 font-display font-semibold leading-[0.95] tracking-tight text-[#0a2540] text-[clamp(3rem,9vw,7.5rem)]"
          )}
        >
          <span className="align-top font-light text-teal-500">&lt;</span>SUDARSHAN
          <br />
          SONI<span className="align-top font-light text-teal-500">&gt;</span>
        </h1>

        <p {...fade(340, "mt-6 font-display text-xl font-medium text-[#0e3a56] md:text-2xl")}>
          {profile.role}
        </p>
        <p {...fade(420, "mt-3 max-w-md leading-relaxed text-slate-600")}>{profile.heroTagline}</p>

        <div {...fade(520, "mt-9 flex flex-wrap items-center gap-4")}>
          <button
            onClick={() => go("projects")}
            className="flex items-center gap-2 rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-[#03211d] shadow-[0_8px_30px_rgba(45,212,191,0.35)] transition-colors hover:bg-teal-300"
          >
            View Projects <CircleArrowRight size={16} />
          </button>
          <button
            onClick={() => go("contact")}
            className="flex items-center gap-2 rounded-full border border-[#0a2540]/20 bg-white/25 px-6 py-3 text-sm font-medium text-[#0a2540] backdrop-blur-md transition-colors hover:bg-white/40"
          >
            Contact Me <Mail size={15} />
          </button>
          <button
            onClick={downloadResume}
            className="flex items-center gap-2 rounded-full border border-[#0a2540]/20 bg-white/25 px-6 py-3 text-sm font-medium text-[#0a2540] backdrop-blur-md transition-colors hover:bg-white/40"
          >
            Download Resume <Download size={15} />
          </button>
        </div>

        <div {...fade(640, "mt-12")}>
          <p className="mb-3 font-mono text-[10px] tracking-[0.35em] text-[#0d4a5e]/80">
            PERSONAL CHANNELS
          </p>
          <div className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 rounded-full bg-[#081c30]/90 px-4 py-2.5 text-xs font-medium text-white shadow-lg transition-colors hover:bg-[#0d2c49]"
              >
                <SocialIcon icon={s.icon} size={14} />
                {s.label}
                <ArrowUpRight
                  size={12}
                  className="text-teal-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-7 flex justify-center">
        <div className="flex flex-col items-center gap-1.5">
          <span className="font-mono text-[10px] tracking-[0.4em] text-[#0d4a5e]/80">
            SCROLL TO DIVE
          </span>
          <ChevronDown size={15} className="animate-bounce text-[#0d4a5e]" />
        </div>
      </div>
    </section>
  );
}
