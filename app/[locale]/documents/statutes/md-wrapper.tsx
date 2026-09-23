"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useClosestAnchor from "@/hooks/use-closest-anchor";
import type { Heading } from "@/lib/md";
import { cn } from "@/lib/utils";
import { useI18n } from "@/locales/client";
import { ChevronDownIcon, ScrollIcon, TableOfContentsIcon } from "lucide-react";
import Link from "next/link";
import { CollapseProvider, useCollapse } from "./collapse-context";

export type TocDoc = { slug: string; title: string; headings: Heading[] };

const HeadingLinks = ({
  headings,
  anchor,
}: {
  headings: Heading[];
  anchor: string | null;
}) => {
  const { navigate } = useCollapse();

  return (
    <ul>
      {headings.map((heading) => (
        <li
          style={{ marginLeft: `${heading.level * 0.5}rem` }}
          className="min-w-0"
          key={heading.link}>
          <Link
            className={cn(
              "block break-words font-poppins font-normal text-sm hover:opacity-80 transition-all",
              anchor === heading.link.slice(1) && "text-primary",
            )}
            href={heading.link}
            onClick={(event) => {
              event.preventDefault();
              navigate(heading.link);
            }}>
            {heading.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const DocEntry = ({ doc, anchor }: { doc: TocDoc; anchor: string | null }) => {
  const { isOpen, setOpen, reveal } = useCollapse();
  const open = isOpen(doc.slug);

  return (
    <li>
      <Link
        href={`#${doc.slug}`}
        onClick={(event) => {
          event.preventDefault();
          if (open) {
            setOpen(doc.slug, false);
          } else {
            reveal(doc.slug);
          }
        }}
        className="flex w-full items-center justify-between gap-2 text-left font-poppins font-medium text-sm hover:opacity-80 transition-all">
        <span className={cn(open && "text-primary")}>{doc.title}</span>
        <ChevronDownIcon
          className={cn(
            "size-3.5 shrink-0 transition-transform",
            open && "rotate-180",
          )}
        />
      </Link>
      {open && doc.headings.length > 0 && (
        <div className="mt-1 mb-2">
          <HeadingLinks headings={doc.headings} anchor={anchor} />
        </div>
      )}
    </li>
  );
};

const TocBody = ({
  statutes,
  memos,
}: {
  statutes: TocDoc;
  memos: TocDoc[];
}) => {
  const [anchor] = useClosestAnchor();

  return (
    <ul className="space-y-2">
      <DocEntry doc={statutes} anchor={anchor} />
      {memos.map((memo) => (
        <DocEntry key={memo.slug} doc={memo} anchor={anchor} />
      ))}
    </ul>
  );
};

const MdWrapper = ({
  children,
  statutes,
  memos,
}: {
  children: React.ReactNode;
  statutes: TocDoc;
  memos: TocDoc[];
}) => {
  const t = useI18n();

  return (
    <CollapseProvider defaultOpen={[statutes.slug]}>
      <div className="-mt-6 -ml-6 -mr-6 -mb-42">
        <section className="border-b px-6 py-3 text-sm">
          <div className="flex items-center gap-2 mb-1">
            <ScrollIcon className="size-4 text-primary" />
            <h1 className="font-medium">
              {t("NavBar.Documents.StatutesBylaws")}
            </h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-prose">
            {t("NavBar.Documents.StatutesBylaws.description")}
          </p>
        </section>
        <Sheet>
          <SheetTrigger className="flex shadow-xs items-center justify-center lg:hidden fixed top-3 right-3 z-1 size-9 bg-background rounded-md border">
            <TableOfContentsIcon className="size-4 text-primary" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="mb-0">
              <SheetTitle>{t("Statutes.toc")}</SheetTitle>
            </SheetHeader>
            <div className="pl-6 pr-2 overflow-y-auto -mt-6 pb-18 [scrollbar-gutter:stable]">
              <TocBody statutes={statutes} memos={memos} />
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex">
          <div>
            <div className="hidden lg:block sticky top-[calc(4rem+1px)] w-[280px]">
              <div className="relative h-[calc(100vh-4rem-1px)]">
                <nav className="absolute top-0 bottom-0 pt-6 pb-6 pl-6 pr-2 border-r overflow-x-hidden overflow-y-auto [scrollbar-gutter:stable]">
                  <p className="text-muted-foreground font-medium text-sm mb-2">
                    {t("Statutes.toc")}
                  </p>
                  <TocBody statutes={statutes} memos={memos} />
                </nav>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </CollapseProvider>
  );
};

export default MdWrapper;
