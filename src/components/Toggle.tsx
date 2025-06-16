"use client";
import { useEffect, useState } from "react";

export default function Toggle() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <button
      className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-md shadow"
      onClick={() => setDarkMode((prev) => !prev)}
    >
      Switch to {darkMode ? "Light" : "Dark"} Mode
    </button>
  );
}
