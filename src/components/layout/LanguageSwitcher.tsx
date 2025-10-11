import { LocaleString } from "@/lib/types/intl";
import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";

export default function LanguageSwitcher({ locale }: { locale: LocaleString }) {
  return (
    <div
      className={clsx(
        TYPOGRAPHY.mono18,
        "uppercase px-2 rounded-xs tracking-tighter bg-white/70 hover:bg-white-100 transition-all duration-200"
      )}
    >
      {locale === "en" ? "EN" : "ES"}
    </div>
  );
}
