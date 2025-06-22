import committees, { Committee, CommitteeSlug } from "@/data/committees";
import { boardTrustees, committeeTrustees, Trustee } from "@/data/trustees";
import { getContrastingColor } from "./utils";

const defaultColor = "#cc99ff";

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
  return committees.map((c) => fixColors(c));
};

const fixColors = (c: Committee): Committee => ({
  ...c,
  color: c.color || defaultColor,
  textColor: c.textColor || getContrastingColor(c.color || defaultColor),
});

export { getCommittee, listCommittees };
