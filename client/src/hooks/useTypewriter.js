import { useState, useEffect } from "react";

export default function useTypewriter(words, speed = 100, pause = 1500) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplay(current.slice(0, charIdx + 1));
          setCharIdx((i) => i + 1);

          if (charIdx + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          }
        } else {
          setDisplay(current.slice(0, charIdx - 1));
          setCharIdx((i) => i - 1);

          if (charIdx - 1 === 0) {
            setDeleting(false);
            setWordIdx((i) => (i + 1) % words.length);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}
