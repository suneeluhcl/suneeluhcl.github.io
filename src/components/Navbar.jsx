import { useEffect, useRef, useState } from "react";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { href: "#projects", label: "Selected work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Expertise" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [dark, setDark] = useState(true);
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    const desktop = window.matchMedia("(min-width: 900px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);
  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch { /* Theme works without storage. */ }
  };
  return (
    <header className="site-header">
      <nav aria-label="Main navigation" className="page-width nav-layout">
        <a href="#top" className="wordmark" aria-label="Suneel Kumar — home">sk<span>.</span></a>
        <ul className="desktop-links">{links.map((link) => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>
        <div className="nav-actions">
          <a href="/resume/" className="nav-resume">Résumé <ArrowUpRight size={15} aria-hidden="true" /></a>
          <button onClick={toggleTheme} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} className="icon-button">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button ref={menuButton} onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open} aria-controls="mobile-menu" className="icon-button mobile-toggle">{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </nav>
      <ul id="mobile-menu" className="mobile-links" hidden={!open}>
        {links.map((link) => <li key={link.href}><a href={link.href} onClick={() => setOpen(false)}>{link.label}</a></li>)}
      </ul>
    </header>
  );
}
