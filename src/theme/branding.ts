/**
 * ── BRANDING ANCHOR #2 ──────────────────────────────────────────────
 * This is the single file to edit when rebranding this app for a
 * different salon. Nothing else in the codebase should need to change.
 *
 * To rebrand:
 *   1. Edit the values below (name, colors, logo path).
 *   2. Replace src/assets/logo.svg with the new salon logo.
 *   3. Update appId/appName in capacitor.config.ts (new package id
 *      is required if publishing as a separate app on the same phone).
 *   4. Update android/app/src/main/res/mipmap-* icons (see docs/REBRANDING.md).
 *
 * Owners can also override name/colors at runtime from the in-app
 * Settings screen; those overrides are stored in localStorage and take
 * priority over these defaults, via getBranding() below.
 */

export interface Branding {
  salonName: string;
  primaryColor: string;
  primaryColorDark: string;
  accentColor: string;
  logoUrl: string;
}

export const DEFAULT_BRANDING: Branding = {
  salonName: "Salon Manager",
  primaryColor: "#7A3B69",
  primaryColorDark: "#4E2143",
  accentColor: "#E8A33D",
  logoUrl: "/src/assets/logo.svg",
};

const STORAGE_KEY = "salon_branding_override";

export function getBranding(): Branding {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_BRANDING, ...JSON.parse(raw) };
  } catch {
    /* ignore corrupt override */
  }
  return DEFAULT_BRANDING;
}

export function setBranding(partial: Partial<Branding>) {
  const merged = { ...getBranding(), ...partial };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  applyBrandingToDocument(merged);
}

export function applyBrandingToDocument(branding: Branding = getBranding()) {
  const root = document.documentElement;
  root.style.setProperty("--color-primary", branding.primaryColor);
  root.style.setProperty("--color-primary-dark", branding.primaryColorDark);
  root.style.setProperty("--color-accent", branding.accentColor);
  document.title = branding.salonName;
}
