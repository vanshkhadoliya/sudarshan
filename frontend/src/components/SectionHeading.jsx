export default function SectionHeading({ depth, title, sub }) {
  return (
    <div className="mb-12">
      <p className="mb-4 font-mono text-[11px] tracking-[0.4em] text-teal-300/90">{depth}</p>
      <h2 className="font-display text-4xl font-medium tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      {sub ? <p className="mt-4 text-base text-slate-300/85 md:text-lg">{sub}</p> : null}
      <div className="mt-6 h-px w-24 bg-gradient-to-r from-teal-300/60 to-transparent" />
    </div>
  );
}
