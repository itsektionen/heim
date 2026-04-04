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
      "The Board is the Chapter's highest decision-making body between Chapter meetings. It consists of 10 members, the president, vice president, treasuerer and secretary, who together make up the presidium, and 6 additional members who are either general board members or presidents of different chapter committees. Together they oversee the Chapter's operations and ensures that activities align with the Chapter's goals. The Board is responsible for financial management, long-term planning, and representing the Chapter externally.",
  },
  {
    name: "Study Social Committee",
    slug: "study-social",
    description:
      "The Study Social Committee are responsible for the Chapter's study-related social activities and for ensuring that our premises, Kistan 2.0, are in exceptional condition. Their responsibilities include managing bookings for our chapter locale, Kistan 2.0, promoting internal cohesion among the Chapter's study-related social bodies, and developing student life within the chapter in the long term.",
  },
  {
    name: "Study Committee",
    slug: "study",
    description:
      "The Study Committee is a core part of the chapter. Historically, this has been the sole activity of all student unions and is naturally very important for the Chapter. Their main responsiblity are coordinating academic monitoring and educational impact, as well as representing the Chapter in academic matters. Improving the education quality and helping students with issues in courses, forwarding your opinions to teachers and responsible at EECS.",
    img: "/assets/img/committees/study.svg",
  },
  {
    name: "Study Environment Committee",
    slug: "smn",
    description:
      "The Study Environment Committee are responsible for the physical study environment in both the Chapter's premises and the entire KTH Kista. In practice, this means addressing issues and deficiencies or ensuring that the school is made aware of them.",
    img: "/assets/img/committees/smn.svg",
  },
  {
    name: "Business Relations Committee",
    slug: "brc",
    description:
      "The Business Relations Committee (BRC) promotes the Chapter externally and works toward more collaboration between students and industry. Organizes engaging events such as the Kista Career Fair (KAM), featuring a large number of participating companies, that at the same time raise money for the chapter.",
    img: "/assets/img/committees/brc.svg",
  },
  {
    name: "Council of Safety",
    slug: "sso",
    description:
      "The Council of Safety are here for everyone in the Chapter and ensure their well-being. All Safety Officiers are bound by confidentiality. Reports to the Council of Safety can be made via the shared email, through the members personal email addresses or anonymously via their report form.",
  },
  {
    name: "Election Committee",
    slug: "val",
    description:
      "The Election Committee leads the work in finding and nominating members for the Chapter's elected positions. They administer all elections, conducts candidate interviews, and writes a written statement about the candidate for the chapter meeting (SM).",
  },
  {
    name: "QMISK",
    slug: "qmisk",
    color: "#800000",
    description:
      "Qlubbmästeriet IT-Sektionen Kista (QMISK) is one of the Chapter's masteries, with its roots in the old Ingenjörsektionen Kista (IsK) from the 1990s, a long-standing institution. QMISK organizes pub nights in Kistan every Thursday and hosts gasques, the most famous being the annual Midvinterblot during the late winter.",
    website: "https://qmisk.com",
    img: "/assets/img/committees/qmisk.png",
  },
  {
    name: "ITK",
    slug: "itk",
    color: "#131413",
    description:
      "ITerativa Klubben (ITK) is the hobby committee of the chapter. They organize activities for everything unrelated to alcohol. Their members are encourage to bring their own hobbies and interest. They are invested around all forms of gaming as well as activities related to computers, programming, cooking, arts, music and movies. They host ITK Mys every Wednesday with a variety of activities, including board games, fika etc., as well as large LAN events after each exam period with big tournaments and themed events.",
    website: "https://itk.gg",
    img: "/assets/img/committees/itk.png",
    textColor: "#ADFF5C",
  },
  {
    name: "TMEIT",
    slug: "tmeit",
    color: "#6AA7EE",
    description:
      "TraditionsMEsterIT (TMEIT) is one of the Chapter's masteries, with roots in the IT and ME Chapters from the early 2000s. TMEIT hosts Friday pubs in Kistan as well as Exam Gasques in connection with each exam period.",
    website: "https://tmeit.se",
    img: "/assets/img/committees/tmeit.svg",
  },
  {
    name: "Sports Committee",
    slug: "sports",
    description:
      "The Sports Committee organizes opportunities for Chapter members to get active. The most popular activities are floorball and football, but other sports such as running, badminton, climbing, rounders, and volleyball are also offered. Would you like the committee to engage in another sport? They are always open to suggestions from Chapter members for other activities.",
    img: "/assets/img/committees/sports.svg",
  },
  {
    name: "JML",
    slug: "jml",
    description:
      "JML stands for Equality, Diversity, and Equal Opportunities. JML is a group of dedicated students striving for a more equitable and diverse environment within the Chapter. They are also responsible for furthering the integration and engagement of international students and to run Internationally-linked work for chapter members.",
    img: "/assets/img/committees/jml.svg",
  },
  {
    name: "Communications Committee",
    slug: "kommn",
    description:
      "The Communications Committee (KommN) handles the Chapter's internal and external communication. It's exactly as broad as it sounds and includes a variety of tasks within web design, social media, and graphic design. We work closely with the other committees to distribute information as effectively as possible to all members of the chapter, making use of the Chapter's Discord, Instagram, Facebook and LinkedIn. Informing students about the various events happening in Kistan 2.0. They also build, maintain and update this website. The committee's work in graphic design is focused on producing various marketing materials such as posters, images, logos, patches and sometimes merch like the overalls. While the rest of the Chapter's work is continuous, the committee's graphic design work is primarily done on request from other committees. Some of these assignments included creating new logos for committees that previously did not have a logo.",
    img: "/assets/img/committees/komma.svg",
  },
  {
    name: "Reception",
    slug: "reception",
    description:
      "The Reception Committee are responsible for welcoming all newly admitted students each year during the three-week-long Reception. INGEN, NÅGON, MUX, and many Fadders plan numerous events to make the starting period at KTH as enjoyable as possible. So you can get familiar with everything related to KTH, the Chapter, as well as making new connections with other fellow students.",
    website: "https://mottagningen.se",
    img: "/assets/img/committees/reception.svg",
  },
] as const;

export type CommitteeSlug = (typeof committees)[number]["slug"];

export default committees;
