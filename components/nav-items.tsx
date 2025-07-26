import { NavBarTranslationKey } from "@/locales/types";
import {
  CalendarIcon,
  FileTextIcon,
  GraduationCapIcon,
  PartyPopperIcon,
  School2Icon,
  ScrollIcon,
  UsersIcon,
} from "lucide-react";
import { ItChip } from "./it-chip";

export type NavigationItem = {
  title: NavBarTranslationKey;
  href: string;
  icon?: React.ReactNode;
  description: NavBarTranslationKey;
  children?: NavigationItem[];
};

export type NavigationGroup = {
  title: NavBarTranslationKey;
  icon?: React.ReactNode;
  items: NavigationItem[];
};

export const educationItems: NavigationItem[] = [
  {
    title: "Education.Programmes",
    href: "/education",
    icon: <School2Icon className="w-4 h-4" />,
    description: "Education.Programmes.description",
  },
  {
    title: "Education.Courses",
    href: "/education/courses",
    icon: <GraduationCapIcon className="w-4 h-4" />,
    description: "Education.Courses.description",
  },
];

export const chapterItems: NavigationItem[] = [
  {
    title: "Chapter.About",
    href: "/chapter",
    icon: <ItChip primary="var(--muted-foreground)" />,
    description: "Chapter.About.description",
  },
  {
    title: "Chapter.Committees",
    href: "/committees",
    icon: <PartyPopperIcon />,
    description: "Chapter.Committees.description",
  },
  {
    title: "Chapter.Trustees",
    href: "/trustees",
    icon: <UsersIcon />,
    description: "Chapter.Trustees.description",
  },
  {
    title: "Chapter.Events",
    href: "/events",
    icon: <CalendarIcon />,
    description: "Chapter.Events.description",
  },
];

export const documentItems: NavigationItem[] = [
  {
    title: "Documents.Protocols",
    href: "/documents/protocols",
    icon: <FileTextIcon />,
    description: "Documents.Protocols.description",
  },
  {
    title: "Documents.StatutesBylaws",
    href: "/documents/statutes",
    icon: <ScrollIcon />,
    description: "Documents.StatutesBylaws.description",
  },
  {
    title: "Documents.Committees",
    href: "/documents/committees",
    icon: <PartyPopperIcon />,
    description: "Documents.Committees.description",
  },
];

export const navigationGroups = [
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
] as const;

export type NavigationGroupTitle = (typeof navigationGroups)[number]["title"];
