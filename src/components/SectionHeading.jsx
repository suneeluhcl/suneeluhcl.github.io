import Reveal from "./Reveal.jsx";

export default function SectionHeading({ index, label, title }) {
  return (
    <Reveal className="mb-12">
      <p className="font-mono text-sm text-accent mb-2">
        <span className="text-mut">//</span> {index}. {label}
      </p>
      <h2 className="font-mono text-3xl md:text-4xl font-bold tracking-tight">
        {title}
        <span className="text-accent">.</span>
      </h2>
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-accent to-transparent" />
    </Reveal>
  );
}
