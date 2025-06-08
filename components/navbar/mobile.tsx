"use client";

import { ItBolt } from "@/components/it-bolt";
import { ItChip } from "@/components/it-chip";
import { navigationGroups } from "@/components/nav-items";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  FileTextIcon,
  GraduationCapIcon,
  HouseIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MobileNavbar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  const t = useTranslations("NavBar");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed flex sm:hidden items-center justify-between bottom-0 left-0 bg-card/90 backdrop-blur z-50 right-0 px-6 py-4 h-15 border-t">
      <MobileNavItem href="/">
        <HouseIcon />
      </MobileNavItem>
      <MobileNavItem href="/events">
        <CalendarIcon />
      </MobileNavItem>
      <Drawer preventScrollRestoration open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="active:scale-90 p-3 transition-transform h-10 w-10 bg-primary rounded-full drop-shadow text-primary-foreground flex items-center justify-center">
          <ItBolt primary="var(--card)" />
        </DrawerTrigger>
        <DrawerContent className="pb-10">
          <DrawerHeader className="flex items-center gap-2">
            <ItChip primary="var(--primary)" />
            <DrawerTitle>The IT Chapter</DrawerTitle>
          </DrawerHeader>
          <div className="px-6">
            <Link href={"/"} className="font-medium mb-4 block w-fit">
              Home
            </Link>
            {navigationGroups.map((group, index) => (
              <div className="mb-4" key={`mobile.nav.${index}`}>
                <h2 className="text-sm font-medium mb-1 text-muted-foreground">
                  {group.title}
                </h2>
                <ul className="space-y-1">
                  {group.items.map((item, index) => (
                    <li key={`mobile.nav.${item.title}.${index}`}>
                      <Link href={item.href} className="font-medium">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link href={"/contact"} className="font-medium mb-4 block w-fit">
              {t("Contact")}
            </Link>
            {children}
          </div>
        </DrawerContent>
      </Drawer>
      <MobileNavItem href="/education/courses">
        <GraduationCapIcon strokeWidth={1.8} className="size-6" />
      </MobileNavItem>
      <MobileNavItem href="/documents/protocols">
        <FileTextIcon />
      </MobileNavItem>
    </nav>
  );
};

const MobileNavItem = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      className={cn(
        "[&_svg:not([class*='size-'])]:size-5 [&_svg]:active:scale-80 [&_svg]:transition-all",
        isActive ? "[&_svg]:text-primary" : "[&_svg]:text-muted-foreground",
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export { MobileNavbar };
