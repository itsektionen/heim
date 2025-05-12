"use client";

import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { navigationGroups } from "./nav-items";

const CommandMenu = () => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleNavigation = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem>
              <HomeIcon /> Home
            </CommandItem>
          </CommandGroup>
          {navigationGroups.map((group, i) => (
            <CommandGroup
              key={`cmd.group.${group.title}.${i}`}
              heading={group.title}
            >
              {group.items.map((item, j) => (
                <CommandItem
                  key={`cmd.group.${group.title}.${i}.item.${item.title}.${j}`}
                  onSelect={() => handleNavigation(item.href)}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export { CommandMenu };
