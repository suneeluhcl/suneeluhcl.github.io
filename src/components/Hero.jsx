import { ArrowUpRight, FileDown, MapPin } from "lucide-react";
import { profile, availability } from "../data.js";
import Availability from "./Availability.jsx";
import portrait from "../assets/suneel.webp";

export default function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="page-width hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">AI engineering · Full-stack development · Application security</p>
          <h1>{profile.name}<span className="text-accent">.</span></h1>
          <p className="hero-statement">Intelligent systems.<br />Secure foundations.</p>
          <p className="hero-description">{profile.tagline}</p>
          <div className="hero-actions">
            <a href="/resume.pdf" download="Suneel-Kumar-Resume.pdf" className="button-primary"><FileDown size={18} aria-hidden="true" /> Download résumé</a>
            <a href="#contact" className="button-secondary">Let’s talk <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
          <Availability className="hero-availability" />
        </div>
        <div className="profile-card">
          <div className="portrait-frame">
            <img src={portrait} alt="Suneel Kumar" width="640" height="640" loading="eager" fetchPriority="high" decoding="async" />
            <div className="portrait-caption"><span className="status-dot" /> Production AI. Full-stack delivery.<br />Security at every layer.</div>
          </div>
          <div className="profile-card-footer">
            <div><strong>10+ years</strong><span>Enterprise engineering</span></div>
            {availability.location && <p><MapPin size={14} aria-hidden="true" /> {availability.location}</p>}
          </div>
        </div>
      </div>
      <div className="page-width">
        <div className="company-strip" aria-label="Selected enterprise experience">
          <p>Experience across<br /><strong>finance &amp; healthcare</strong></p>
          <span>Capital One</span><span>Fidelity Investments</span><span>CVS Health</span><span>Essendant</span>
        </div>
      </div>
    </section>
  );
}
