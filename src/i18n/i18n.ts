import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import pt from "./pt";
import es from "./es";

console.log("expo-localization:", Localization);

const i18n = new I18n({
  pt,
  es,
});

// --- defensive locale resolution ---
const rawLocale =
  (Localization && (Localization as any).locale) ||
  (Localization && Array.isArray((Localization as any).locales) && (Localization as any).locales[0]) ||
  "pt";

const deviceLocale = String(rawLocale).toLowerCase();
i18n.locale = deviceLocale.startsWith("es") ? "es" : "pt";

i18n.enableFallback = true;

// ---- tiny pub/sub so React components can re-render on language change ----
const listeners: Array<() => void> = [];

export const onLanguageChange = (cb: () => void) => {
  listeners.push(cb);
  return () => {
    const idx = listeners.indexOf(cb);
    if (idx >= 0) listeners.splice(idx, 1);
  };
};

const emitLanguageChange = () => {
  listeners.slice().forEach((cb) => {
    try {
      cb();
    } catch (err) {
      // ignore listener errors
      console.warn("i18n listener error:", err);
    }
  });
};

// Permite mudar o idioma manualmente
export const changeLanguage = (lang: "pt" | "es") => {
  i18n.locale = lang;
  // avisa quem estiver ouvindo para re-renderizar
  emitLanguageChange();
};

export default i18n;