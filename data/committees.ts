export type Committee = {
  name: string;
  slug: string;
  color?: string;
  textColor?: string;
  description: string;
  website?: string;
  img?: string;
};

const committees = [
  {
    name: "Board",
    slug: "board",
    description:
      "The Board is the Chapter’s highest decision-making body between Chapter meetings. It oversees the Chapter’s operations and ensures that activities align with the Chapter’s goals. The Board is responsible for financial management, long-term planning, and representing the Chapter externally.",
  },
  {
    name: "Study Social Committee",
    slug: "study-social",
    description:
      "Responsible for the Chapter’s study-related social activities and for ensuring that our premises, Kistan, are in exceptional condition. Their responsibilities include managing bookings for Kistan and promoting internal cohesion among the Chapter's study-related social bodies.",
  },
  {
    name: "Study Committee",
    slug: "study-committee",
    description:
      "Responsible for coordinating academic monitoring and educational impact, as well as representing the Chapter in academic matters. Historically, this has been the core activity of all student unions and is naturally very important for the Chapter.",
    img: "/assets/img/committees/study-committee.svg",
  },
  {
    name: "Study Environment Committee",
    slug: "smn",
    description:
      "Responsible for the physical study environment in both the Chapter's premises and the entire KTH Kista. In practice, this means addressing issues and deficiencies or ensuring that the school is made aware of them.",
    img: "/assets/img/committees/smn.svg",
  },
  {
    name: "Business Relations Committee",
    slug: "brc",
    description:
      "Promotes the Chapter externally and works toward more collaboration between students and industry. Organizes events such as the Kista Career Fair (KAM), featuring a large number of participating companies.",
    img: "/assets/img/committees/brc.svg",
  },
  {
    name: "Council of Safety",
    slug: "sso",
    description:
      "They are here for everyone in the Chapter and ensure their well-being. They are bound by confidentiality.",
  },
  {
    name: "Election Committee",
    slug: "val",
    description:
      "Leads the work in finding and nominating members for the Chapter's elected positions.",
  },
  {
    name: "Qmisk",
    slug: "qmisk",
    color: "#800000",
    description:
      "QMISK is one of the Chapter's masteries, with its roots in IsK, a long-standing institution. QMISK organizes pub nights in Kistan every Thursday and hosts gasques, the most famous being the annual Midvinterblot.",
    website: "https://qmisk.com",
    img: "/assets/img/committees/qmisk.png",
  },
  {
    name: "ITK",
    slug: "itk",
    color: "#131413",
    description:
      "Organizes activities around all forms of gaming as well as activities related to computers, programming, hardware, and networking. They host ITK Mys every Wednesday with board games, snacks etc., as well as large LAN events after each exam period.",
    website: "https://itk.gg",
    img: "/assets/img/committees/itk.png",
    textColor: "#ADFF5B",
  },
  {
    name: "TMEIT",
    slug: "tmeit",
    color: "#8BD4FF",
    description:
      "TMEIT is one of the Chapter's masteries, with roots in the IT and ME Chapters. TMEIT hosts Friday pubs in Kistan as well as Exam Gasques in connection with each exam period.",
    website: "https://tmeit.se",
    img: "/assets/img/committees/tmeit.svg",
  },
  {
    name: "Sports Committee",
    slug: "sports",
    description:
      "Organizes opportunities for Chapter members to get active. The most popular activities are floorball and football, but other sports such as badminton, climbing, rounders, and volleyball are also offered.",
    img: "/assets/img/committees/sports.svg",
  },
  {
    name: "JML",
    slug: "jml",
    description:
      "JML stands for Equality, Diversity, and Equal Opportunities. JML is a group of dedicated students striving for a more equitable and diverse environment within the Chapter.",
    img: "/assets/img/committees/jml.svg",
  },
  {
    name: "Communications Committee",
    slug: "komma",
    description:
      "Responsible for the Chapter's communication with its members. This includes providing information about activities through the Chapter's website and social media.",
    img: "/assets/img/committees/komma.svg",
  },
  {
    name: "Reception",
    slug: "reception",
    description:
      "Responsible for welcoming new students each year during the three-week-long Reception. INGEN, NÅGON, MUX, and many Fadders plan numerous events to make the starting period at KTH as enjoyable as possible.",
    img: "/assets/img/committees/reception.svg",
  },
] as const;

export type CommitteeSlug = (typeof committees)[number]["slug"];

export default committees;
