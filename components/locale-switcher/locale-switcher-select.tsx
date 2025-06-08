"use client";

import { LocaleSelectItem } from "@/components/locale-switcher";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { useTransition } from "react";

const localeDisplayMap: Record<Locale, { icon: string; label: string }> = {
  sv: {
    icon: "🇸🇪",
    label: "Svenska",
  },
  en: {
    icon: "🇬🇧",
    label: "English",
  },
};

const LocaleSwitcherSelect = ({
  defaultValue,
  locales,
}: {
  defaultValue: Locale;
  locales: LocaleSelectItem[];
}) => {
  const [isPending, startTransition] = useTransition();

  const onChange = (value: string) => {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  };

  return (
    <Select onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger
        className="border-0 !bg-transparent hover:!bg-accent hover:!text-accent-foreground dark:hover:!bg-accent/50 shadow-none"
        disabled={isPending}
      >
        {/* For some reason, <SelectValue {...} /> takes a second to display. Decided to raw dog it instead. */}
        <p className="size-4 text-lg flex items-center justify-center -mb-px">
          {localeDisplayMap[defaultValue].icon}
        </p>
        {localeDisplayMap[defaultValue].label}
        {/* <SelectValue placeholder={defaultValue} defaultValue={defaultValue} /> */}
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale.value} value={locale.value}>
            <p className="size-4 text-lg flex items-center justify-center -mb-px">
              {localeDisplayMap[locale.value].icon}
            </p>
            {locale.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { LocaleSwitcherSelect };
