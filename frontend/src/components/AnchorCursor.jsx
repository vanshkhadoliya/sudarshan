import { useEffect, useRef } from "react";
import { Anchor } from "lucide-react";

export default function AnchorCursor() {
  const ref = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const move = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      hovering.current = Boolean(e.target.closest?.("a,button,[role='button']"));
    };
    window.addEventListener("mousemove", move);

    let raf;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;
      if (ref.current) {
        ref.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%,-50%) scale(${
          hovering.current ? 1.4 : 1
        })`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
      style={{ transform: "translate(-100px,-100px)" }}
    >
      <Anchor size={22} className="text-teal-300 drop-shadow-[0_0_10px_rgba(45,212,191,0.75)]" />
    </div>
  );
}
