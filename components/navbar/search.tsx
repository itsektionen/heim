"use client";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/locales/client";
import { SearchIcon } from "lucide-react";

const Search = () => {
  const t = useI18n();
  const triggerCmdK = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      code: "KeyK",
      metaKey: true,
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);
  };

  return (
    <Button
      onClick={triggerCmdK}
      variant={"outline"}
      className="ml-auto cursor-pointer hidden md:flex lg:w-[260px] !pr-2 text-muted-foreground justify-start hover:!bg-muted dark:hover:!bg-card group !bg-transparent shadow-none"
    >
      <SearchIcon />
      {t("NavBar.Search") + "..."}
      <kbd className="ml-auto pointer-events-none group-hover:border-transparent inline-flex h-5 select-none items-center gap-1 rounded-xs border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
};

export { Search };
