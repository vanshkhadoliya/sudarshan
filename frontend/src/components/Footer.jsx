import { Mail } from "lucide-react";
import { profile, socials } from "../mock";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  return (
    <footer className="relative py-20 text-center">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="font-mono text-[11px] tracking-[0.4em] text-teal-200/80 transition-colors hover:text-teal-100"
      >
        RETURN TO SURFACE ↑
      </button>

      <h3 className="mt-10 font-display text-3xl text-white">{profile.name}</h3>
      <p className="mt-2 text-sm text-slate-400">{profile.rolesLine}</p>

      <div className="mt-7 flex justify-center gap-3">
        <a
          href={`mailto:${profile.email}`}
          aria-label="Email"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-teal-300/50 hover:text-teal-300"
        >
          <Mail size={15} />
        </a>
        {socials.map((s) => (
          <a
            key={s.id}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-teal-300/50 hover:text-teal-300"
          >
            <SocialIcon icon={s.icon} size={15} />
          </a>
        ))}
      </div>

      <div className="mx-auto mt-10 h-px w-40 bg-white/10" />
      <p className="mt-6 font-mono text-[10px] tracking-[0.35em] text-slate-500">
        © 2026 · BUILT IN THE DEEP
      </p>
    </footer>
  );
}
