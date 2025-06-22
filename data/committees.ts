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
  },
  {
    name: "Study Environment Committee",
    slug: "smn",
    description: "We fix things!",
  },
  {
    name: "Business Relations Committee",
    slug: "brc",
    description: "We make money",
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
    img: "/assets/img/committees/itk.webp",
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
  },
  {
    name: "JML",
    slug: "jml",
    description: "We do jml",
  },
  {
    name: "Communications Committee",
    slug: "komma",
    description: "We do com",
  },
  {
    name: "Reception",
    slug: "reception",
    description: "We do receive",
  },
] as const;

export type CommitteeSlug = (typeof committees)[number]["slug"];

export default committees;
