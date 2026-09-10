import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile, socials } from "../mock";
import SocialIcon from "./SocialIcon";

export default function Navbar() {
  const [active, setActive] = useState("surface");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let current = "surface";
      for (const l of navLinks) {
        const el = document.getElementById(l.id);
        if (el && el.offsetTop <= y) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="fixed left-1/2 top-4 z-50 w-[min(96vw,1000px)] -translate-x-1/2">
      <nav className="flex items-center justify-between gap-2 rounded-full border border-white/10 bg-[#050f1c]/85 px-4 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <button
          onClick={() => go("surface")}
          className="pl-2 font-mono text-[11px] tracking-[0.4em] text-teal-300 transition-colors hover:text-teal-100"
        >
          {profile.initials}
        </button>

        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`rounded-full px-4 py-1.5 text-[13px] transition-colors ${
                active === l.id
                  ? "bg-teal-400 font-semibold text-[#03211d]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-teal-300/50 hover:text-teal-300"
            >
              <SocialIcon icon={s.icon} size={13} />
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-slate-200 md:hidden"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      {open && (
        <div className="mt-2 rounded-3xl border border-white/10 bg-[#050f1c]/95 p-3 backdrop-blur-xl md:hidden">
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`block w-full rounded-2xl px-4 py-2.5 text-left text-sm transition-colors ${
                active === l.id ? "bg-teal-400/15 text-teal-200" : "text-slate-300 hover:bg-white/5"
              }`}
            >
              {l.label}
            </button>
          ))}
          <div className="mt-2 flex gap-2 px-2 pb-1">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-slate-300"
              >
                <SocialIcon icon={s.icon} size={14} />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
