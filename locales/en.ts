export default {
  HomePage: {
    title: "The IT Chapter",
    tagline:
      "As one of the largest chapters within the Tekniska Högskolans Studentkår (THS Student Union) at KTH in Stockholm, we are thrilled to have you here!",
    Cards: {
      NewStudent: {
        title: "New student",
        content:
          "Are you a newly admitted student? {link} has all the information you need to find your way around KTH and the IT Chapter.",
      },
      Education: {
        title: "The Education",
        content:
          "There are 3 programmes mapped to the IT Chapter: CINTE, TIDAB and TCOMK. The Chapter exists to ensure that our members get the best education possible.",
      },
      Chapter: {
        title: "The Chapter",
        content:
          "Aside from study quality assurance, the chapter provides a plethora of extracurricular activities such as pubs, board game nights, sports events and LAN parties.",
      },
    },
    News: {
      title: "Latest news",
      "no-news": "There are no news.",
    },
  },
  EducationPage: {
    title: "Education",
    "hero-image-alt":
      "The Electrum lab in Kista seen from the outside on a cloudy autumn day.",
    "browse-courses": "Browse courses",
    intro:
      "Our programs include a MSE Degree Programme in Information Technology (civilingenjör), Bachelor of Science in Computer Science (högskoleingenjör), an international Bachelor of Science in Information and Communication Technology, and several mapped Master's programs.",
    program: {
      CINTE: {
        title: "Degree Programme in Information Technology",
        content: [
          "The Degree Programme in Information Technology (CINTE) is a five-year program consisting of 300 Swedish hp credits. It is a Swedish civilingenjör education which is closest described by a Master of Science in Engineering (MSE) education.",
          "It starts with a three-year Bachelor's program in Information Technology (180 Swedish hp credits) with mandatory core courses and some free-choice courses, followed by a two-year Master's program (120 Swedish hp credits) within one of the eligible Master's programs mapped to the Degree Programme in Information Technology.",
          "The program is designed for those who want to work with the future challenges in IT, both in international companies and startup businesses.",
        ],
      },
      TIDAB: {
        title: "Degree Programme in Computer Engineering",
        content: [
          "The Degree Programme in Computer Engineering (TIDAB) is a three-year program consisting of 180 Swedish hp credits. It is a Swedish högskoleingenjör education which is closest described by a Bachelor of Science in Engineering (BSE) education.",
          "It starts with mandatory core courses in the first year, followed by a mix of mandatory and free-choice courses during the last two years.",
          "The program is designed for those who want to develop future connected products and software.",
        ],
      },
      TCOMK: {
        title:
          "Bachelor's Programme in Information and Communication Technology",
        content: [
          "The Bachelor's Programme in Information and Communication Technology (TCOMK) is a three-year Bachelor's program consisting of 180 Swedish hp credits, entirely taught in English, and equivalent to an international Bachelor's degree.",
          "It starts with mandatory core courses in the first year, followed by a mix of mandatory and free-choice courses during the last two years.",
          "As the program is on an international track in English, students come from various parts of the world.",
        ],
      },
    },
  },
  Statutes: {
    title: "Statutes",
    subtitle:
      "These are the chapter's statutes. They are our regulatory documents.",
    toc: "Table of Contents",
  },
  Trustees: {
    Board: "The Board",
    "Board.description":
      "The board is responsible for overseeing the IT Chapter's operations. This includes budgeting, fundraising, the monitoring of studies and extracurricular activities.",
    Committees: "Committee Representatives",
    "Committees.description":
      "The committee representatives represent the committees of the chapter.",
  },
  NavBar: {
    Home: "Home",
    Education: "Education",
    "Education.Programmes": "Programmes",
    "Education.Programmes.description":
      "Our programmes include Master's and Bachelor's in IT and Computer Science.",
    "Education.Courses": "Courses",
    "Education.Courses.description":
      "Are you curious about what courses you will study? Use the course browser to find out!",
    Chapter: "Chapter",
    "Chapter.About": "About",
    "Chapter.About.description":
      "We are one of the largest chapters at the THS Student Union at KTH.",
    "Chapter.Committees": "Committees",
    "Chapter.Committees.description":
      "The backbone of the chapter. For the students by the students.",
    "Chapter.Trustees": "Trustees",
    "Chapter.Trustees.description":
      "Elected members to oversee the chapters daily operations.",
    "Chapter.Events": "Events",
    "Chapter.Events.description":
      "Organized by the committees. Meet new people and learn new things.",
    Documents: "Documents",
    "Documents.Protocols": "Protocols",
    "Documents.Protocols.description":
      "Read meeting protocols from chapter meetings (SM) and board meetings (StyM).",
    "Documents.StatutesBylaws": "Statutes & Bylaws",
    "Documents.StatutesBylaws.description":
      "Read the important documents that govern the operations of the chapter.",
    Contact: "Contact",
    Search: "Search",
  },
  Footer: {
    "follow-us": "Follow us",
  },
  LocaleSwitcher: {
    en: "English",
    sv: "Svenska",
  },
  Common: {
    "read-more": "Read more",
    chapter: "The IT Chapter",
    view: "View",
  },
  NotFound: {
    cta: "Take me back!",
  },
  Theme: "Theme",
  "Theme.Dark": "Dark",
  "Theme.Light": "Light",
  "Theme.System": "System",
} as const;
