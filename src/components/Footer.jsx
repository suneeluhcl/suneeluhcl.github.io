import { profile } from "../data.js";
import SocialLinks from "./SocialLinks.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-mut">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <SocialLinks variant="icon" />
        <p className="font-mono text-xs text-mut">
          <span className="text-accent">$</span> built with React + Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
