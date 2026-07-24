import { MapPin, Laptop, BadgeCheck, CalendarCheck } from "lucide-react";
import { availability } from "../data.js";

const items = [
  { key: "location", value: availability.location, Icon: MapPin, label: "Location" },
  { key: "arrangement", value: availability.arrangement, Icon: Laptop, label: "Work arrangement" },
  { key: "workAuth", value: availability.workAuth, Icon: BadgeCheck, label: "Work authorization" },
  { key: "status", value: availability.status, Icon: CalendarCheck, label: "Availability" },
];

export const configuredAvailability = items.filter((i) => Boolean(i.value));

/**
 * The logistics a recruiter screens on before making contact: where he is, how he
 * works, whether sponsorship is needed, and when he can start. Answering these on
 * the page avoids both the wasted intro call and the silent pass.
 */
export default function Availability({ className = "", style }) {
  if (configuredAvailability.length === 0) return null;

  return (
    <ul aria-label="Availability and work logistics" className={`flex flex-wrap gap-2 ${className}`} style={style}>
      {configuredAvailability.map(({ key, value, Icon, label }) => (
        <li
          key={key}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-card/60
                     px-3.5 py-1.5 font-mono text-xs text-mut"
        >
          <Icon size={14} className="text-accent shrink-0" aria-hidden="true" />
          <span className="sr-only">{label}: </span>
          {value}
        </li>
      ))}
    </ul>
  );
}
