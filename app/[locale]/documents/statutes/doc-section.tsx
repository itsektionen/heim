"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { useCollapse } from "./collapse-context";

const DocSection = ({
  slug,
  title,
  children,
}: {
  slug: string;
  title: string;
  children: React.ReactNode;
}) => {
  const { isOpen, setOpen } = useCollapse();
  const open = isOpen(slug);

  return (
    <Collapsible
      id={slug}
      open={open}
      onToggle={(event) => setOpen(slug, event.currentTarget.open)}
      className="scroll-mt-20">
      <CollapsibleTrigger className="border-b sm:border-y bg-muted/90 hover:bg-accent transition-colors backdrop-blur z-0 sticky top-0 sm:top-16 px-6 py-3 font-medium text-primary">
        <h1>{title}</h1>
        <ChevronDownIcon
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="md p-6">{children}</CollapsibleContent>
    </Collapsible>
  );
};

export default DocSection;
