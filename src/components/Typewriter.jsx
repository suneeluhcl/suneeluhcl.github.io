import { useEffect, useState } from "react";

/**
 * Self-contained typing effect. State lives here (not in the parent), so a
 * keystroke re-renders ONLY this node — not the whole hero. A single timer and
 * local loop variables mean the effect runs once and never thrashes, which
 * eliminates the stutter from the old hook.
 */
export default function Typewriter({
  words,
  typeSpeed = 75,
  deleteSpeed = 38,
  pause = 1500,
  className = "",
}) {
  const [text, setText] = useState("");

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setText(words[0] ?? "");
      return;
    }

    let timer;
    let chars = 0;
    let wi = 0;
    let deleting = false;

    const tick = () => {
      const word = words[wi % words.length];
      if (!deleting) {
        chars += 1;
        setText(word.slice(0, chars));
        if (chars === word.length) {
          deleting = true;
          timer = setTimeout(tick, pause); // hold the full word
          return;
        }
      } else {
        chars -= 1;
        setText(word.slice(0, chars));
        if (chars === 0) {
          deleting = false;
          wi = (wi + 1) % words.length;
          timer = setTimeout(tick, typeSpeed + 140); // brief beat before next word
          return;
        }
      }
      timer = setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
    };

    timer = setTimeout(tick, 350);
    return () => clearTimeout(timer);
  }, [words, typeSpeed, deleteSpeed, pause]);

  return (
    <>
      <span className={className}>{text}</span>
      <span className="type-cursor text-accent" aria-hidden="true">▌</span>
    </>
  );
}
