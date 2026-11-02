"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useSyncExternalStore } from "react";
import { PREMIUM_CTA_STYLE, PREMIUM_TILE_STYLE } from "@/lib/premiumStyle";

// Meta Pixel wordt alleen geladen nadat de bezoeker toestemming geeft.
const META_PIXEL_ID = "2267874284069776";

const STORAGE_KEY = "ace-cookie-consent";
const CHANGE_EVENT = "ace:cookie-consent-change";
const OPEN_EVENT = "ace:open-cookie-settings";

type Consent = "granted" | "denied" | null;

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

function readConsent(): Consent {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function writeConsent(value: "granted" | "denied") {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Opslag geblokkeerd (bijv. privévenster): keuze geldt dan alleen voor deze pagina.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// Wordt true als de bezoeker via "Cookie-instellingen" de melding opnieuw opent.
let bannerForcedOpen = false;

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

// "unset" = nog geen keuze gemaakt; "hidden" = server-render, dan nog niets tonen.
function getSnapshot(): string {
  return `${readConsent() ?? "unset"}|${bannerForcedOpen ? "open" : "closed"}`;
}

function getServerSnapshot(): string {
  return "hidden|closed";
}

// Standaard Meta Pixel-code, omgezet naar een functie.
function loadMetaPixel() {
  if (window.fbq) return;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", META_PIXEL_ID);
}

function removeMetaCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const name of ["_fbp", "_fbc"]) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

export function CookieConsent() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [consentState, openState] = snapshot.split("|");
  const consent: Consent = consentState === "granted" || consentState === "denied" ? consentState : null;
  const showBanner = consentState === "unset" || (consentState !== "hidden" && openState === "open");
  const pathname = usePathname();

  useEffect(() => {
    const open = () => {
      bannerForcedOpen = true;
      window.dispatchEvent(new Event(CHANGE_EVENT));
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  useEffect(() => {
    if (consent === "granted") loadMetaPixel();
  }, [consent]);

  // Paginaweergave bij elke (client-side) navigatie, alleen met toestemming.
  useEffect(() => {
    if (consent === "granted") window.fbq?.("track", "PageView");
  }, [consent, pathname]);

  const choose = useCallback(
    (value: "granted" | "denied") => {
      const wasGranted = consent === "granted";
      bannerForcedOpen = false;
      writeConsent(value);
      if (value === "denied" && wasGranted) {
        // Pixel is al geladen: cookies opruimen en herladen zodat hij echt stopt.
        removeMetaCookies();
        window.location.reload();
      }
    },
    [consent],
  );

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie-instellingen"
      className="fixed inset-x-0 bottom-0 z-[60] p-4 md:p-6"
    >
      <div
        className="mx-auto flex max-w-4xl flex-col gap-4 border border-accent/40 p-5 md:flex-row md:items-center md:gap-6"
        style={PREMIUM_TILE_STYLE}
      >
        <p className="text-sm leading-relaxed opacity-90">
          Wij gebruiken cookies van Meta (Facebook en Instagram) om te meten hoe onze advertenties
          werken en ze te verbeteren. Dat doen we alleen als je daarvoor toestemming geeft. Lees meer
          in onze{" "}
          <Link href="/privacyverklaring" className="text-accent underline hover:no-underline">
            privacyverklaring
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="flex-1 cursor-pointer border-2 border-accent px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-foreground transition-colors hover:bg-accent/10 md:flex-none"
          >
            Weigeren
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="flex-1 cursor-pointer border-2 border-transparent px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-[#0B2038] transition-opacity hover:opacity-90 md:flex-none"
            style={PREMIUM_CTA_STYLE}
          >
            Accepteren
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={`cursor-pointer underline hover:text-accent ${className}`}
    >
      Cookie-instellingen
    </button>
  );
}
