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
      onOpenChange={(next) => setOpen(slug, next)}
      className="scroll-mt-20 border-b">
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 py-3 text-left font-medium text-primary hover:opacity-80 transition-all">
        <span>{title}</span>
        <ChevronDownIcon
          className={cn(
            "size-4 shrink-0 transition-transform",
            open && "rotate-180",
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="md pb-6">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default DocSection;
