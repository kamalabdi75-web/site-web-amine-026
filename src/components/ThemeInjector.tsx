"use client";

import { useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";

// Utility: darken or lighten a hex color by a percentage
function shadeColor(hex: string, percent: number): string {
    hex = hex.replace("#", "");
    if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
    const num = parseInt(hex, 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + percent));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + percent));
    const b = Math.min(255, Math.max(0, (num & 0xff) + percent));
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

// A list of fonts available via Google Fonts that we will load on demand
export const FONT_OPTIONS = [
    { label: "Inter (Défaut)", value: "Inter", css: "Inter, sans-serif" },
    { label: "Roboto", value: "Roboto", css: "Roboto, sans-serif" },
    { label: "Poppins", value: "Poppins", css: "Poppins, sans-serif" },
    { label: "Montserrat", value: "Montserrat", css: "Montserrat, sans-serif" },
    { label: "Outfit", value: "Outfit", css: "Outfit, sans-serif" },
    { label: "Nunito", value: "Nunito", css: "Nunito, sans-serif" },
    { label: "Lato", value: "Lato", css: "Lato, sans-serif" },
    { label: "Open Sans", value: "Open Sans", css: "'Open Sans', sans-serif" },
    { label: "Raleway", value: "Raleway", css: "Raleway, sans-serif" },
    { label: "Cairo (عربي)", value: "Cairo", css: "Cairo, sans-serif" },
    { label: "Tajawal (عربي)", value: "Tajawal", css: "Tajawal, sans-serif" },
];

export default function ThemeInjector() {
    const { settings } = useSettings();

    useEffect(() => {
        const root = document.documentElement;

        if (settings?.theme_primary_color) {
            const primary = settings.theme_primary_color;
            const light = shadeColor(primary, 20);
            const dark = shadeColor(primary, -25);
            root.style.setProperty("--site-primary", primary);
            root.style.setProperty("--site-primary-light", light);
            root.style.setProperty("--site-primary-dark", dark);
        } else {
            root.style.removeProperty("--site-primary");
            root.style.removeProperty("--site-primary-light");
            root.style.removeProperty("--site-primary-dark");
        }

        if (settings?.theme_font_family) {
            const fontEntry = FONT_OPTIONS.find(f => f.value === settings.theme_font_family);
            if (fontEntry) {
                // Load font from Google Fonts if not Inter (Inter is already bundled)
                if (fontEntry.value !== "Inter") {
                    const existing = document.getElementById("dynamic-google-font");
                    if (existing) existing.remove();
                    const link = document.createElement("link");
                    link.id = "dynamic-google-font";
                    link.rel = "stylesheet";
                    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontEntry.value)}:wght@400;500;700;900&display=swap`;
                    document.head.appendChild(link);
                }
                root.style.setProperty("--site-font", fontEntry.css);
            }
        } else {
            root.style.removeProperty("--site-font");
        }
    }, [settings?.theme_primary_color, settings?.theme_font_family]);

    return null; // purely side-effectful
}
