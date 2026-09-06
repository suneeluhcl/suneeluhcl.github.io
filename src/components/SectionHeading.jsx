export default function SectionHeading({ index, label, title }) {
  return <div className="section-heading"><p className="eyebrow"><span>{index}</span> {label}</p><h2>{title}</h2></div>;
}
