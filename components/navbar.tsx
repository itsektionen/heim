import { ItChip } from "@/components/it-chip";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="sticky z-50 top-0 border-b bg-background/90 backdrop-blur">
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
                  <ListItem title={"Programmes"} href={"/education"}>
                    The programs at KTH Kista include a Master of Science in
                    Information Technology (civilingenjör), Bachelor of Science
                    programs in Computer Science and Electronics and Computer
                    Science (högskoleingenjör), an international Bachelor of
                    Science in Information and Communication Technology, and
                    several mapped master&apos;s programs.
                  </ListItem>
                  <ListItem
                    title={"Course Browser"}
                    href={"/education/programmes"}
                  >
                    Are you curious about what courses you will study? Use the
                    course browser to find out!
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Chapter</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  <ListItem title={"Committees"} href={"/committees"}>
                    The committees are the backbone of the IT Chapter. They
                    organize events, ensure a high study quality, and provide
                    valuable resources to the members.
                  </ListItem>
                  <ListItem title={"Trustees"} href={"/trustees"}>
                    The trustees are people who have been elected by the members
                    of the IT Chapter to oversee its daily operations.
                  </ListItem>
                  <ListItem title={"Events"} href={"/events"}>
                    The events are organized by the committees and are a great
                    way to meet new people and learn new things.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Documents</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-[400px] flex flex-col gap-3 p-4">
                  <ListItem title={"Protocols"} href={"/documents/protocols"}>
                    Read meeting minutes and protocols from chapter meetings
                    (SM) and board meetings (StyM).
                  </ListItem>
                  <ListItem
                    title={"Statutes & Bylaws"}
                    href={"/documents/statutes"}
                  >
                    Read the statutes and bylaws of the IT Chapter. They are
                    important documents that govern the operations of the
                    chapter.
                  </ListItem>
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
