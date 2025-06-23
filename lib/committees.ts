import committees, { Committee, CommitteeSlug } from "@/data/committees";
import { boardTrustees, committeeTrustees, Trustee } from "@/data/trustees";
import { getContrastingColor } from "./utils";

export const defaultCommitteeColor = "#cc99ff";

export const backgroundColor = (committee: Committee) => {
  if (committee.img) {
    if (committee.color == defaultCommitteeColor) {
      return committee.color + "66";
    }
    return committee.color;
  }
  return committee.color + "66";
};

const getCommittee = (
  slug: string,
): { data: { committee: Committee; trustees: Trustee[] } } | undefined => {
  const committee = committees.find((c) => c.slug === slug);
  const trustees = [...boardTrustees, ...committeeTrustees].filter((t) =>
    t.committeeIds?.includes(slug as CommitteeSlug),
  );
  return committee
    ? { data: { committee: fixColors(committee), trustees: trustees } }
    : undefined;
};

const listCommittees = (): Committee[] => {
  return committees
    .map((c) => fixColors(c))
    .sort((a, b) => a.name.localeCompare(b.name));
};

const fixColors = (c: Committee): Committee => ({
  ...c,
  color: c.color || defaultCommitteeColor,
  textColor:
    c.textColor || getContrastingColor(c.color || defaultCommitteeColor),
});

export { getCommittee, listCommittees };
