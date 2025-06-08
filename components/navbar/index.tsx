import { ItChip } from "@/components/it-chip";
import { LocaleSwitcher } from "@/components/locale-switcher";
import {
  chapterItems,
  documentItems,
  educationItems,
} from "@/components/nav-items";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";
import { MobileNavbar } from "./mobile";
import { Search } from "./search";

const DesktopNavbar = async () => {
  const t = await getTranslations("NavBar");

  return (
    <header className="hidden sm:block sticky z-50 top-0 border-b bg-background/90 backdrop-blur">
      <div className="container mx-auto px-6 h-16 border-x flex items-center gap-4">
        <Link
          className="flex text-sm text-foreground items-center gap-2 font-medium mr-2"
          href="/"
        >
          <ItChip primary="var(--primary)" />
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t("Education")}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-[400px] flex flex-col gap-3 p-4">
                  {educationItems.map((item, index) => (
                    <ListItem
                      key={`nav.education.${index}`}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t("Chapter")}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {chapterItems.map((item, index) => (
                    <ListItem
                      key={`nav.chapter.${index}`}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t("Documents")}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-[400px] flex flex-col gap-3 p-4">
                  {documentItems.map((item, index) => (
                    <ListItem
                      key={`nav.document.${index}`}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle())}
                asChild
              >
                <Link href="/contact" passHref>
                  {t("Contact")}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Search />
        <LocaleSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
};

const Navbar = () => {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar>
        <div className="flex items-center gap-2 justify-between -ml-2">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </MobileNavbar>
    </>
  );
};

export { Navbar };

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none flex-col items-start space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
