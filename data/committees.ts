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
    description: "The board",
  },
  {
    name: "Study Committee",
    slug: "study-committee",
    description: "The Study Committee",
    img: "/assets/img/committees/study-committee.svg",
  },
  {
    name: "Study Environment Committee",
    slug: "smn",
    description: "We fix things!",
    img: "/assets/img/committees/smn.svg",
  },
  {
    name: "Business Relations Committee",
    slug: "brc",
    description: "We make money",
    img: "/assets/img/committees/brc.svg",
  },
  {
    name: "Council of Safety",
    slug: "sso",
    description: "Keepin y'all safe",
  },
  {
    name: "Election Committee",
    slug: "val",
    description: "*whale noises*",
  },
  {
    name: "Qmisk",
    slug: "qmisk",
    color: "#800000",
    description: "Description of Committee 1",
    website: "https://qmisk.com",
    img: "/assets/img/committees/qmisk.png",
  },
  {
    name: "ITK",
    slug: "itk",
    color: "#131413",
    description: "Description of Committee 2",
    website: "https://itk.gg",
    img: "/assets/img/committees/itk.png",
    textColor: "#ADFF5B",
  },
  {
    name: "TMEIT",
    slug: "tmeit",
    color: "#8BD4FF",
    description: "Description of Committee 3",
    website: "https://tmeit.se",
    img: "/assets/img/committees/tmeit.svg",
  },
  {
    name: "Sports Committee",
    slug: "sports",
    description: "We do sports",
    img: "/assets/img/committees/sports.svg",
  },
  {
    name: "JML",
    slug: "jml",
    description: "We do jml",
    img: "/assets/img/committees/jml.svg",
  },
  {
    name: "Communications Committee",
    slug: "komma",
    description: "We do com",
    img: "/assets/img/committees/komma.svg",
  },
  {
    name: "Reception",
    slug: "reception",
    description: "We do receive",
    img: "/assets/img/committees/reception.svg",
  },
] as const;

export type CommitteeSlug = (typeof committees)[number]["slug"];

export default committees;
