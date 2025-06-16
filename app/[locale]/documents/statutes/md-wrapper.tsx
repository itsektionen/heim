"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useClosestAnchor from "@/hooks/use-closest-anchor";
import { getHeadings } from "@/lib/md";
import { cn } from "@/lib/utils";
import { useI18n } from "@/locales/client";
import { ScrollIcon, TableOfContentsIcon } from "lucide-react";
import Link from "next/link";
const MdWrapper = ({
  children,
  markdown,
}: {
  children: React.ReactNode;
  markdown: string;
}) => {
  const t = useI18n();
  const [anchor] = useClosestAnchor();
  const headings = getHeadings(markdown);
  return (
    <div className="-mt-6 -ml-6 -mr-6 -mb-42">
      <div className="border-b px-6 py-3 text-sm">
        <div className="flex items-center gap-2 mb-1">
          <ScrollIcon className="size-4 text-primary" />
          <p className="font-medium">{t("Statutes.title")}</p>
        </div>
        <p className="text-muted-foreground text-sm max-w-prose">
          {t("Statutes.subtitle")}
        </p>
      </div>
      <Sheet>
        <SheetTrigger className="flex shadow-xs items-center justify-center lg:hidden fixed top-6 right-6 size-9 bg-background rounded-md border">
          <TableOfContentsIcon className="size-4 text-primary" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="mb-0">
            <SheetTitle>{t("Statutes.toc")}</SheetTitle>
          </SheetHeader>
          <div className="px-6 overflow-y-auto -mt-6 pb-18">
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
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex">
        <div>
          <div className="hidden lg:block sticky top-[calc(4rem+1px)] w-[280px]">
            <div className="relative h-[calc(100vh-4rem-1px)]">
              <nav className="absolute top-0 bottom-0 p-6 border-r overflow-y-auto">
                <p className="text-muted-foreground font-medium text-sm mb-2">
                  {t("Statutes.toc")}
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
