import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import pt from "./pt";
import es from "./es";

const i18n = new I18n({
  pt,
  es,
});

const rawLocale =
  (Localization && (Localization as any).locale) ||
  (Localization &&
    Array.isArray((Localization as any).locales) &&
    (Localization as any).locales[0]) ||
  "pt";

const deviceLocale = String(rawLocale).toLowerCase();
i18n.locale = deviceLocale.startsWith("es") ? "es" : "pt";

i18n.enableFallback = true;

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
      console.warn("i18n listener error:", err);
    }
  });
};

export const changeLanguage = (lang: "pt" | "es") => {
  i18n.locale = lang;
  emitLanguageChange();
};

export default i18n;