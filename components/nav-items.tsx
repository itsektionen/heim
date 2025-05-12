import {
  CalendarIcon,
  FileTextIcon,
  GraduationCapIcon,
  PartyPopperIcon,
  School2Icon,
  ScrollIcon,
  UsersIcon,
} from "lucide-react";

export type NavigationItem = {
  title: string;
  href: string;
  icon?: React.ReactNode;
  description?: string;
  children?: NavigationItem[];
};

export type NavigationGroup = {
  title: string;
  icon?: React.ReactNode;
  items: NavigationItem[];
};

export const educationItems: NavigationItem[] = [
  {
    title: "Programmes",
    href: "/education",
    icon: <School2Icon className="w-4 h-4" />,
    description:
      "The programs at KTH Kista include a Master of Science in Information Technology (civilingenjör), Bachelor of Science programs in Computer Science and Electronics and Computer Science (högskoleingenjör), an international Bachelor of Science in Information and Communication Technology, and several mapped master's programs.",
  },
  {
    title: "Courses",
    href: "/education/courses",
    icon: <GraduationCapIcon className="w-4 h-4" />,
    description:
      "Are you curious about what courses you will study? Use the course browser to find out!",
  },
];

export const chapterItems: NavigationItem[] = [
  {
    title: "Committees",
    href: "/committees",
    icon: <PartyPopperIcon />,
    description:
      "The committees are the backbone of the IT Chapter. They organize events, ensure a high study quality, and provide valuable resources to the members.",
  },
  {
    title: "Trustees",
    href: "/trustees",
    icon: <UsersIcon />,
    description:
      "The trustees are people who have been elected by the members of the IT Chapter to oversee its daily operations.",
  },
  {
    title: "Events",
    href: "/events",
    icon: <CalendarIcon />,
    description:
      "The events are organized by the committees and are a great way to meet new people and learn new things.",
  },
];

export const documentItems: NavigationItem[] = [
  {
    title: "Protocols",
    href: "/documents/protocols",
    icon: <FileTextIcon />,
    description:
      "Read meeting minutes and protocols from chapter meetings (SM) and board meetings (StyM).",
  },
  {
    title: "Statutes & Bylaws",
    href: "/documents/statutes",
    icon: <ScrollIcon />,
    description:
      "Read the statutes and bylaws of the IT Chapter. They are important documents that govern the operations of the chapter.",
  },
];

export const navigationGroups: NavigationGroup[] = [
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
