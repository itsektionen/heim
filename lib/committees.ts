import committees, { Committee } from "@/data/committees";
import { getContrastingColor } from "./utils";

const defaultColor = "#cc99ff";

const getCommittee = (slug: string) => {
  const committee = committees.find((c) => c.slug === slug);
  return committee ? fixColors(committee) : undefined;
};

const listCommittees = (): Committee[] => {
  return committees.map((c) => fixColors(c));
};

const fixColors = (c: Committee): Committee => ({
  ...c,
  color: c.color || defaultColor,
  textColor: c.textColor || getContrastingColor(c.color || defaultColor),
});

export { getCommittee, listCommittees };
