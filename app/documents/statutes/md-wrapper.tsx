"use client";

import { Button } from "@/components/ui/button";
import useClosestAnchor from "@/hooks/use-closest-anchor";
import { getHeadings } from "@/lib/md";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon, ScrollIcon } from "lucide-react";
import Link from "next/link";

const MdWrapper = ({
  children,
  markdown,
}: {
  children: React.ReactNode;
  markdown: string;
}) => {
  const [anchor] = useClosestAnchor();
  const headings = getHeadings(markdown);
  return (
    <div className="-mt-6 -ml-6 -mr-6 -mb-42">
      <div className="border-b px-6 py-3 text-sm">
        <div className="flex items-center gap-2 mb-1">
          <ScrollIcon className="size-4 text-primary" />
          <p className="font-medium">Statutes</p>
          <Button className="ml-auto" size="sm" asChild variant="link">
            <Link
              href={"https://github.com/itsektionen/styrdokument"}
              target="_blank"
            >
              Source
              <ExternalLinkIcon />
            </Link>
          </Button>
        </div>
        <p className="text-muted-foreground text-sm max-w-prose">
          These are the chapter&apos;s statutes. They are our regulatory
          documents.
        </p>
      </div>
      <div className="flex">
        <div>
          <div className="hidden lg:block sticky top-[calc(4rem+1px)] w-[280px]">
            <div className="relative h-[calc(100vh-4rem-1px)]">
              <nav className="absolute top-0 bottom-0 p-6 border-r overflow-y-auto">
                <p className="text-muted-foreground font-medium text-sm mb-2">
                  Table of Contents
                </p>
                <ul>
                  {headings?.slice(1).map((heading) => (
                    <li
                      style={{ marginLeft: `${heading.level * 1.2}rem` }}
                      key={heading.link}
                    >
                      <Link
                        className={cn(
                          "font-poppins font-medium text-sm hover:opacity-80 transition-all",
                          anchor === heading.link.slice(1) && "text-primary",
                        )}
                        href={heading.link}
                      >
                        {heading.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default MdWrapper;
