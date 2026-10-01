"use client";

import { useEffect, useState } from "react";
import { WHATSAPP_PHONE } from "@/lib/contact";

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={`https://wa.me/${WHATSAPP_PHONE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Vragen? Whatsapp ons via WhatsApp"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 border-2 border-accent bg-accent px-5 py-4 shadow-lg transition-all duration-300 hover:bg-transparent hover:[&_span]:text-accent hover:[&_svg]:fill-accent max-md:bottom-4 max-md:right-4 max-md:gap-2 max-md:border max-md:px-3 max-md:py-2.5 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0 fill-background max-md:h-5 max-md:w-5" aria-hidden="true">
        <path d="M12.01 2C6.48 2 2 6.48 2 12.01c0 1.98.58 3.83 1.58 5.39L2 22l4.75-1.55a9.96 9.96 0 0 0 5.26 1.5c5.53 0 10.01-4.48 10.01-10.01C22.02 6.48 17.54 2 12.01 2zm5.85 14.27c-.25.7-1.25 1.29-2.03 1.46-.55.12-1.26.21-3.65-.78-3.07-1.27-5.05-4.39-5.2-4.6-.15-.2-1.24-1.65-1.24-3.15s.78-2.23 1.05-2.53c.27-.3.6-.38.8-.38h.57c.18 0 .43-.07.67.51.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.45.54-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.06 1.14 1.02 2.1 1.34 2.4 1.49.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.02.97.3.15.5.22.57.35.07.13.07.75-.18 1.44z" />
      </svg>
      <span className="font-display text-sm uppercase leading-tight tracking-tight text-background max-md:text-xs">
        Vragen?
        <br />
        Whatsapp ons!
      </span>
    </a>
  );
}
