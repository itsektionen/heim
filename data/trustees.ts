import { CommitteeSlug } from "./committees";

export type Trustee = {
  name: string;
  role: string;
  image?: string;
  mail?: string;
  committeeIds?: CommitteeSlug[];
};

export const boardTrustees: Trustee[] = [
  {
    name: "Hannah Veit",
    role: "President",
    mail: "ordf@kth.it",
    committeeIds: ["board"],
  },
  {
    name: "Dante Julio Cosentino",
    role: "vice President",
    mail: "vordf@kth.it",
    committeeIds: ["board"],
  },
  {
    name: "Benedek Boldizsár",
    role: "Cashier",
    mail: "kassor@kth.it",
    committeeIds: ["board"],
  },
  {
    name: "Leonard Lindgren",
    role: "Secretary",
    mail: "sekr@kth.it",
    committeeIds: ["board"],
  },
  {
    name: "Alexander Lapin Pashchenko",
    role: "President of the Business Relations Committee",
    mail: "naringsliv@kth.it",
    committeeIds: ["board", "brc"],
  },
  {
    name: "Simon Hedström",
    role: "President of the Study Social Committee",
    mail: "studiesocialt@kth.it",
    committeeIds: ["board", "study-social"],
  },
  {
    name: "Elina Wang",
    role: "President of the Communications Committee",
    mail: "kommunikation@kth.it",
    committeeIds: ["komma", "board"],
  },
  {
    name: "Denise Hommik",
    role: "President of the Study Committee",
    mail: "sno@kth.it",
    committeeIds: ["board", "study-committee"],
  },
  {
    name: "Julle Juliusson Keuschnig",
    role: "President of the JML Committee",
    mail: "jml@kth.it",
    committeeIds: ["jml", "board"],
  },
  {
    name: "Albin Durfors",
    role: "Board Member",
    mail: "ledamot@kth.it",
    committeeIds: ["board"],
  },
];

export const committeeTrustees: Trustee[] = [
  {
    name: "Benjamin Kalatsjan-Kirejevas",
    role: "Root",
    mail: "root@kth.it",
    committeeIds: ["itk"],
  },
  {
    name: "Moa Fredriksson",
    role: "Sudo",
    mail: "sudo@kth.it",
    committeeIds: ["itk"],
  },
  {
    name: "Isak Ahlberg",
    role: "President of the Sports Committee",
    mail: "sport@kth.it",
    committeeIds: ["sports"],
  },
  {
    name: "Erik Losin",
    role: "vice President of the Sports Committee",
    mail: "sport@kth.it",
    committeeIds: ["sports"],
  },
  {
    name: "Danni Norén",
    role: "vice President of the JML Committee",
    mail: "jml@kth.it",
    committeeIds: ["jml"],
  },
  {
    name: "Vladimir Li",
    role: "vice President of the Communications Committee",
    mail: "kommunikation@kth.it",
    committeeIds: ["komma"],
  },
  {
    name: "Simon Hedström",
    role: "History Responsible",
    mail: "historia@kth.it",
  },
  {
    name: "Gustav Appelros",
    role: "INGEN",
    mail: "ingen@kth.it",
    committeeIds: ["reception"],
  },
  {
    name: "Justus Kluge",
    role: "NÅGON",
    mail: "nagon@kth.it",
    committeeIds: ["reception"],
  },
  {
    name: "Rozhan Asadi",
    role: "vice President of the Business",
    mail: "naringsliv@kth.it",
    committeeIds: ["brc"],
  },
  {
    name: "Vakant Vakantsson",
    role: "KAM Responsile",
    mail: "kam@kth.it",
  },
  {
    name: "Malin Andréasson",
    role: "QM",
    mail: "qm@qmisk.com",
    committeeIds: ["qmisk"],
  },
  {
    name: "Evelina Berg",
    role: "vQM",
    mail: "vqm@qmisk.com",
    committeeIds: ["qmisk"],
  },
  {
    name: "Sanna Lindberg",
    role: "Cashier QMISK",
    mail: "skm@qmisk.com",
    committeeIds: ["qmisk"],
  },
  {
    name: "Viktor Sandström",
    role: "StURe",
    mail: "sture@kth.it",
    committeeIds: ["smn"],
  },
  {
    name: "Julle Juliusson Keuschnig",
    role: "Lill-StURe",
    mail: "sture@kth.it",
    committeeIds: ["smn"],
  },
  {
    name: "Marcus Söderlund",
    role: "PAS CINTE",
    mail: "cintepas@kth.it",
    committeeIds: ["study-committee"],
  },
  {
    name: "Benjamin Kalatsjan-Kirejevas",
    role: "PAS TIDAB",
    mail: "tidabpas@kth.it",
    committeeIds: ["study-committee"],
  },
  {
    name: "Madelaine Bunao",
    role: "PAS TIEDB",
    mail: "tiedbpas@kth.it",
    committeeIds: ["study-committee"],
  },
  {
    name: "Benedek Boldizsár",
    role: "PAS TCOMK",
    mail: "tcomkpas@kth.it",
    committeeIds: ["study-committee"],
  },
  {
    name: "Jonathan Lundström",
    role: "PAS MASTER",
    mail: "masterpas@kth.it",
    committeeIds: ["study-committee"],
  },
  {
    name: "Nils Granqvist",
    role: "International Coordinator",
    mail: "international@kth.it",
  },
  {
    name: "Marcus Söderlund",
    role: "TM",
    mail: "tm@tmeit.se",
    committeeIds: ["tmeit"],
  },
  {
    name: "Dante Solender",
    role: "vTM",
    mail: "vtm@tmeit.se",
    committeeIds: ["tmeit"],
  },
  {
    name: "Tor Dyreklev",
    role: "TMEIT Cashier",
    mail: "tmeit@kth.it",
    committeeIds: ["tmeit"],
  },
  {
    name: "Adem Ramström",
    role: "Head Responsible Safety Officer",
    mail: "sso@kth.it",
    committeeIds: ["sso"],
  },
  {
    name: "Alin-Cristan Serban",
    role: "Safety Officer",
    mail: "sso@kth.it",
    committeeIds: ["sso"],
  },
  {
    name: "Ludvig Hellman Öhman",
    role: "Safety Officer",
    mail: "sso@kth.it",
    committeeIds: ["sso"],
  },
  {
    name: "Moa Fredriksson",
    role: "Safety Officer",
    mail: "sso@kth.it",
    committeeIds: ["sso"],
  },
  {
    name: "Daniel Nordin",
    role: "Election Committee Convener",
    mail: "val@kth.it",
    committeeIds: ["val"],
  },
  {
    name: "Dante Julio Cosentino",
    role: "Election Committee",
    mail: "val@kth.it",
    committeeIds: ["val"],
  },
  {
    name: "Benjamin Kalatsjan-Kirejevas",
    role: "Election Committee",
    mail: "val@kth.it",
    committeeIds: ["val"],
  },
  {
    name: "Zak Ora",
    role: "Election Committee",
    mail: "val@kth.it",
    committeeIds: ["val"],
  },
  {
    name: "Victor Karlström",
    role: "Election Committee",
    mail: "val@kth.it",
    committeeIds: ["val"],
  },
  {
    name: "Simon Hedström",
    role: "Election Committee",
    mail: "val@kth.it",
    committeeIds: ["val"],
  },
  {
    name: "Dylan Horn Kreiner",
    role: "vice Cashier",
    mail: "kassor@kth.it",
  },
  {
    name: "Evelina Berg",
    role: "Auditor",
    mail: "revisor@kth.it",
  },
  {
    name: "Katya Holmberg",
    role: "Auditor",
    mail: "revisor@kth.it",
  },
  {
    name: "Simon Hocker",
    role: "Standard Bearer",
  },
  {
    name: "Elina Wang",
    role: "Standard Bearer",
  },
  {
    name: "Hugo Bachér",
    role: "Power Outlet Coordinator",
  },
];
