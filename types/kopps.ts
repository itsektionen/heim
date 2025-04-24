export type SpecializationsResponse = {
  description: string;
} & {
  [key: string]: {
    sv: string;
    en: string;
  };
};

export type KoppsProgramme = {
  programmeCode: string;
  title: string;
  titleOtherLanguage: string;
  firstAdmissionTerm: string;
  credits: number;
  creditUnitLabel: string;
  creditUnitAbbr: string;
  educationalLevel: string;
  lengthInStudyYears: number;
  owningSchoolCode: string;
  degrees: { code: string }[];
  approvedStudyProgrammeTerms: string[];
};

export type KoppsProgrammeSpecialization = {
  programmeCode: string;
  specialization: string;
  state: string;
  credits: string;
  creditUnitLabel: {
    sv: string;
    en: string;
  };
  creditUnitAbbr: {
    sv: string;
    en: string;
  };
  department: {
    sv: string;
    en: string;
    abbr: string;
  };
  campus: string;
  academicYear: string;
  batch: string;
  studyYear: KoppsStudyYear;
  marketingUrl: string;
  koppsUrl: string;
  programmeStartLevel: {
    level: string;
    emilValue: string;
  };
  courses: KoppsCourse[];
};

export type KoppsStudyYear = 1 | 2 | 3 | 4 | 5;

export type KoppsCourse = {
  code: string;
  name: KoppsLocaleKeys;
  state: KoppsLocaleKeys;
  condition: KoppsLocaleKeys;
  url: KoppsLocaleKeys;
  credits: string;
  creditUnitLabel: KoppsLocaleKeys;
  creditUnitAbbr: KoppsLocaleKeys;
  subjectCode: {
    scb: string;
    emil: string;
  };
  scbSubjectCode: string;
  emilSubjects: {
    emilID: string;
    emilSv: string;
    emilEn: string;
  };
};

export type KoppsLocaleKeys = {
  en: string;
  sv: string;
};
