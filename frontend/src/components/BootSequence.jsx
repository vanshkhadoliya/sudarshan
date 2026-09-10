import { useEffect, useRef, useState } from "react";
import { bootChecklist } from "../mock";

export default function BootSequence({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  useEffect(() => {
    const start = performance.now();
    const duration = 3600;
    let raf;
    const tick = (now) => {
      const raw = Math.min(1, (now - start) / duration);
      const p = Math.round(raw * 100);
      setProgress(p);
      if (raw < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!doneRef.current) {
        doneRef.current = true;
        setTimeout(() => {
          setLeaving(true);
          setTimeout(() => completeRef.current?.(), 650);
        }, 600);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#030a13] transition-opacity duration-700 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center px-6">
        <div className="relative mb-10 grid h-24 w-24 place-items-center">
          <div className="absolute inset-0 rounded-full border border-teal-300/20" />
          <div
            className="orbit-rot absolute inset-0 rounded-full border border-dashed border-teal-300/40"
            style={{ animationDuration: "14s" }}
          />
          <div className="absolute inset-3 rounded-full bg-teal-400/10 blur-sm" />
          <span className="font-mono text-sm tracking-[0.3em] text-teal-200 drop-shadow-[0_0_12px_rgba(45,212,191,0.8)]">
            S.S
          </span>
        </div>

        <p className="font-mono text-[10px] tracking-[0.45em] text-teal-200/60">
          SUBMERSIBLE BOOT SEQUENCE
        </p>

        <div className="mt-4 flex items-end font-display text-6xl font-light text-white">
          {progress}
          <span className="mb-1 ml-1 text-lg text-teal-300">%</span>
        </div>

        <div className="mt-5 h-[3px] w-64 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.8)] transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-8 w-64 space-y-2.5">
          {bootChecklist.map((item, i) => {
            const shown = progress >= ((i + 1) / bootChecklist.length) * 100 - 10;
            return (
              <div
                key={item}
                className={`flex items-center justify-between font-mono text-[11px] transition-opacity duration-500 ${
                  shown ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-slate-400">{item}</span>
                <span className="text-teal-300">OK</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
