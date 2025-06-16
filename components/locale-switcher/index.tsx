"use client";
import {
  useChangeLocale,
  useCurrentLocale,
  useScopedI18n,
} from "../../locales/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const LocaleSwitcher = () => {
  const locale = useCurrentLocale();
  const changeLocale = useChangeLocale();
  const t = useScopedI18n("LocaleSwitcher");

  const flagMap: Record<typeof locale, string> = {
    en: "🇬🇧",
    sv: "🇸🇪",
  };

  const locales: (typeof locale)[] = ["en", "sv"];

  return (
    <Select
      onValueChange={(value) => changeLocale(value as typeof locale)}
      defaultValue={locale}
    >
      <SelectTrigger className="border-0 shadow-none !bg-transparent hover:!bg-accent dark:hover:!bg-input/50 transition-colors">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={`locale-switcher.${locale}`} value={locale}>
            <p className="-mb-px text-lg">{flagMap[locale]}</p>
            {t(locale)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { LocaleSwitcher };
