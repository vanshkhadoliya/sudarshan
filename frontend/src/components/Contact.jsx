import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { profile, socials } from "../mock";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SocialIcon from "./SocialIcon";

const channels = [
  { icon: Mail, value: profile.email },
  { icon: Phone, value: profile.phone },
  { icon: MapPin, value: profile.location },
];

const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-teal-300/60";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("All fields are required to launch a signal.");
      return;
    }
    const stored = JSON.parse(localStorage.getItem("deep_ocean_messages") || "[]");
    stored.push({ ...form, at: new Date().toISOString() });
    localStorage.setItem("deep_ocean_messages", JSON.stringify(stored));
    toast.success("Signal launched — it reaches the surface within a day.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            depth="DEPTH 10 900 M · MARIANA TRENCH"
            title="Mission control"
            sub="Send a signal. It reaches the surface within a day."
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-3xl border border-white/15 bg-[#051a30]/45 p-8 backdrop-blur-md">
            <p className="font-mono text-[10px] tracking-[0.4em] text-teal-200/80">CHANNELS</p>
            <div className="mt-5 space-y-4">
              {channels.map((c) => (
                <div key={c.value} className="flex items-center gap-3.5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05]">
                    <c.icon size={15} className="text-teal-300" />
                  </span>
                  <span className="text-sm text-slate-200">{c.value}</span>
                </div>
              ))}
            </div>

            <div className="my-6 h-px bg-white/10" />
            <p className="text-sm leading-relaxed text-slate-300">
              Open to internships, collaborations and any project where I get to learn something
              hard.
            </p>
            <div className="my-6 h-px bg-white/10" />

            <p className="font-mono text-[10px] tracking-[0.4em] text-teal-200/80">OPEN CHANNELS</p>
            <p className="mt-2 text-sm text-slate-300">Choose the route that fits your signal.</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {socials.map((s) => (
                <div key={s.id}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-2.5 text-xs font-medium text-white transition-colors hover:border-teal-300/40 hover:text-teal-200"
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

          <Reveal delay={120} className="rounded-3xl border border-white/15 bg-[#051a30]/45 p-8 backdrop-blur-md">
            <form onSubmit={submit} className="flex h-full flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block font-mono text-[10px] tracking-[0.35em] text-teal-200/80">
                    NAME
                  </label>
                  <input
                    id="contact-name"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block font-mono text-[10px] tracking-[0.35em] text-teal-200/80">
                    EMAIL
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@domain.com"
                    className={inputCls}
                  />
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor="contact-message" className="mb-2 block font-mono text-[10px] tracking-[0.35em] text-teal-200/80">
                  TRANSMISSION
                </label>
                <textarea
                  id="contact-message"
                  rows={6}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="What are we building?"
                  className={`${inputCls} h-full min-h-[140px] resize-none`}
                />
              </div>
              <button
                type="submit"
                className="flex w-fit items-center gap-2 rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-[#03211d] shadow-[0_8px_30px_rgba(45,212,191,0.3)] transition-colors hover:bg-teal-300"
              >
                <Send size={15} /> Launch message
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
