import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { ItChip } from "./it-chip";
import { ThemeToggle } from "./theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

const Navbar = () => {
  return (
    <header className="sticky z-50 top-0 border-b bg-background/90 backdrop-blur">
      <div className="container mx-auto px-6 h-16 border-x flex items-center gap-4">
        <Link
          className="flex text-sm text-foreground items-center gap-2 font-medium mr-8"
          href="/"
        >
          <ItChip primary="var(--primary)" />
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Education</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  <ListItem title={"Committees"} href={"/committees"}>
                    The committees are the backbone of the IT Chapter.
                  </ListItem>
                  <ListItem title={"Trustees"} href={"/trustees"}>
                    The trustees are people who have been elected by the members
                    of the IT Chapter.
                  </ListItem>
                  <ListItem title={"Documents"} href={"/documents"}>
                    The trustees are people who have been elected by the members
                    of the IT Chapter.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Chapter</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  <ListItem title={"Committees"} href={"/committees"}>
                    The committees are the backbone of the IT Chapter.
                  </ListItem>
                  <ListItem title={"Trustees"} href={"/trustees"}>
                    The trustees are people who have been elected by the members
                    of the IT Chapter.
                  </ListItem>
                  <ListItem title={"Documents"} href={"/documents"}>
                    The trustees are people who have been elected by the members
                    of the IT Chapter.
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
