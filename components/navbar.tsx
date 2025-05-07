"use client";

import { ItBolt } from "@/components/it-bolt";
import { ItChip } from "@/components/it-chip";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  FileTextIcon,
  GraduationCapIcon,
  HouseIcon,
  MenuIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type NavigationItem = {
  title: string;
  href: string;
  icon?: React.ReactNode;
  description?: string;
  children?: NavigationItem[];
};

type NavigationGroup = {
  title: string;
  icon?: React.ReactNode;
  items: NavigationItem[];
};

const educationItems: NavigationItem[] = [
  {
    title: "Programmes",
    href: "/education",
    icon: <MenuIcon className="w-4 h-4" />,
    description:
      "The programs at KTH Kista include a Master of Science in Information Technology (civilingenjör), Bachelor of Science programs in Computer Science and Electronics and Computer Science (högskoleingenjör), an international Bachelor of Science in Information and Communication Technology, and several mapped master's programs.",
  },
  {
    title: "Courses",
    href: "/education/courses",
    icon: <MenuIcon className="w-4 h-4" />,
    description:
      "Are you curious about what courses you will study? Use the course browser to find out!",
  },
];

const chapterItems: NavigationItem[] = [
  {
    title: "Committees",
    href: "/committees",
    description:
      "The committees are the backbone of the IT Chapter. They organize events, ensure a high study quality, and provide valuable resources to the members.",
  },
  {
    title: "Trustees",
    href: "/trustees",
    description:
      "The trustees are people who have been elected by the members of the IT Chapter to oversee its daily operations.",
  },
  {
    title: "Events",
    href: "/events",
    description:
      "The events are organized by the committees and are a great way to meet new people and learn new things.",
  },
];

const documentItems: NavigationItem[] = [
  {
    title: "Protocols",
    href: "/documents/protocols",
    icon: <MenuIcon className="w-4 h-4" />,
    description:
      "Read meeting minutes and protocols from chapter meetings (SM) and board meetings (StyM).",
  },
  {
    title: "Statutes & Bylaws",
    href: "/documents/statutes",
    icon: <MenuIcon className="w-4 h-4" />,
    description:
      "Read the statutes and bylaws of the IT Chapter. They are important documents that govern the operations of the chapter.",
  },
];

const navigationGroups: NavigationGroup[] = [
  {
    title: "Education",
    items: educationItems,
  },
  {
    title: "Chapter",
    items: chapterItems,
  },
  {
    title: "Documents",
    items: documentItems,
  },
];

const DesktopNavbar = () => {
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
              <NavigationMenuTrigger>Education</NavigationMenuTrigger>
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
              <NavigationMenuTrigger>Chapter</NavigationMenuTrigger>
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
              <NavigationMenuTrigger>Documents</NavigationMenuTrigger>
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
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

const MobileNavbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

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
            <ThemeToggle />
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

const Navbar = () => {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
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
