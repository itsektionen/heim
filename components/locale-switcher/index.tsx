import { Locale } from "@/i18n/config";
import { getLocale, getTranslations } from "next-intl/server";
import { LocaleSwitcherSelect } from "./locale-switcher-select";

export type LocaleSelectItem = { value: Locale; label: string };

const LocaleSwitcher = async () => {
  const t = await getTranslations("LocaleSwitcher");
  const defaultLocale = await getLocale();

  const locales: LocaleSelectItem[] = [
    {
      value: "sv",
      label: t("sv"),
    },
    {
      value: "en",
      label: t("en"),
    },
  ];

  return (
    <LocaleSwitcherSelect
      defaultValue={defaultLocale as Locale}
      locales={locales}
    />
  );
};

export { LocaleSwitcher };
