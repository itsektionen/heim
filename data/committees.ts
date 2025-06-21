export type Committee = {
  name: string;
  slug: string;
  color?: string;
  textColor?: string;
  description: string;
  website?: string;
  img?: string;
};

const committees: Committee[] = [
  {
    name: "Qmisk",
    slug: "qmisk",
    color: "#800000",
    description: "Description of Committee 1",
    website: "https://example.com/committee1",
    img: "/assets/img/committees/qmisk.png",
  },
  {
    name: "ITK",
    slug: "itk",
    color: "#131413",
    description: "Description of Committee 2",
    website: "https://example.com/committee2",
    img: "/assets/img/committees/itk.webp",
    textColor: "#ADFF5B",
  },
  {
    name: "TMEIT",
    slug: "tmeit",
    color: "#8BD4FF",
    description: "Description of Committee 3",
    website: "https://example.com/committee3",
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
];

export default committees;
