export default {
  HomePage: {
    title: "IT-Sektionen",
    tagline:
      "Som en av de största sektionerna under Tekniska Högskolans Studentkår (THS) vid KTH i Stockholm är vi väldigt glada att se dig!",
    Cards: {
      NewStudent: {
        title: "Nyantagen student",
        content:
          "Är du en nyantagen student? På {link} hittar du all information du kan tänkas behöva inför din tid vid KTH och IT-Sektionen.",
      },
      Education: {
        title: "Utbildningen",
        content:
          "Det finns tre ingenjörsprogram mappade till IT-Sektionen: CINTE, TIDAB and TCOMK. Sektionen finns för att säkerställa att våra medlemmar får bästa möjliga utbildning.",
      },
      Chapter: {
        title: "Sektionen",
        content:
          "Utöver studiebevakning arrangerar sektionen en uppsjö med aktiviteter utanför studierna så som pubar, brädspelskvällar, idrottsevenemang och LAN.",
      },
    },
    News: {
      title: "Senaste nytt",
      "no-news": "Det finns inga nyheter.",
    },
  },
  EducationPage: {
    title: "Utbildning",
    "hero-image-alt":
      "Electrum laboratoriet i Kista från utsidan en molning höstdag.",
    "browse-courses": "Se kurser",
    intro:
      "Våra utbildningar inkluderar civilingenjörsutbildning i Informationsteknik, högskoleingenjörsutbildningar i Datateknik, en internationellt kandidatutbildning i Informations- och kommunikationsteknik samt flera mappade masterprogram.",
    program: {
      CINTE: {
        title: "Civilingenjör i Informationsteknik",
        content: [
          "Civilingenjörsutbildning i Informationsteknik (CINTE) är en femårig utbildning på 300 högskolepoäng.",
          "Den börjar först med en treårig Kandidatutbildning i Informationsteknik (180hp) med obligatoriska baskurser och en del valbara kurser, följt av en tvåårig Mastersutbildning (120hp) inom ett av de valbara Mastersprogrammen som är mappade till Civilingenjörsprogrammet.",
          "Programmet är för dig som vill jobba med framtidens utmaningar inom IT i såväl internationella företag som startupföretag.",
        ],
      },
      TIDAB: {
        title: "Högskoleingenjör i Datateknik",
        content: [
          "Högskoleingenjörsutbildningen i Datateknik (TIDAB) är en treårig utbildning på 180 högskolepoäng.",
          "Den börjar med obligatoriska baskurser under det första året följt av en blandning av obligatoriska och valbara kurser under de två sista åren.",
          "Programmet är för dig som vill utveckla framtidens uppkopplade produkter och programvaror.",
        ],
      },
      TCOMK: {
        title: "Kandidat i Informations- och Kommunikationsteknik",
        content: [
          "Kandidatutbildningen i Informations- och kommunikationsteknik (TCOMK) är en treårig kandidatutbildning på 180 högskolepoäng som är helt på engelska och motsvarar en internationell Bachelor.",
          "Den börjar med obligatoriska baskurser under det första året följt av en blandning av obligatoriska och valbara kurser under de två sista åren. Flera av kurserna läses tillsammans med CINTE.",
          "Eftersom programmet är på ett internationellt program på engelska så kommer de studerande på programmet från flera delar av världen.",
        ],
      },
    },
  },
  Statutes: {
    title: "Stadgar",
    subtitle: "Detta är sektionens stadgar. De är våra styrdokument.",
    toc: "Innehåll",
  },
  Trustees: {
    Board: "Styrelsen",
    "Board.description":
      "Styrelsen ansvarar för att övervaka IT-sektionens verksamhet. Detta innefattar budgetering, uppföljning av studier samt fritidsaktiviteter.",
    Committees: "Nämndrepresentanter",
    "Committees.description":
      "Nämndrepresentanterna representerar sektionens nämnder.",
  },
  NavBar: {
    Home: "Hem",
    Education: "Utbildning",
    "Education.Programmes": "Program",
    "Education.Programmes.description":
      "Våra program innefattar civilingenjörs- och högskoleingenjörsprogram i IT och datateknik.",
    "Education.Courses": "Kurser",
    "Education.Courses.description":
      "Är du nyfiken på vilka kurser du kommer att läsa? Använd kurskatalogen för att ta reda på det!",
    Chapter: "Sektionen",
    "Chapter.About": "Om",
    "Chapter.About.description":
      "Vi är en av de största sektionerna under THS Studentkår vid KTH.",
    "Chapter.Committees": "Sektionsorgan",
    "Chapter.Committees.description":
      "Ryggraden i sektionen. För studenter av studenter.",
    "Chapter.Trustees": "Förtroendevalda",
    "Chapter.Trustees.description":
      "Valda medlemmar av SM som sköter sektionens dagliga verksamhet.",
    "Chapter.Events": "Evenemang",
    "Chapter.Events.description":
      "Arrangeras av nämnderna. Möt nya människor och lär dig nya saker.",
    Documents: "Dokument",
    "Documents.Protocols": "Protokoll",
    "Documents.Protocols.description":
      "Läs mötesprotokoll från sektionsmöten (SM) och styrelsemöten (StyM).",
    "Documents.StatutesBylaws": "Stadgar",
    "Documents.StatutesBylaws.description":
      "Läs de viktiga dokumenten som styr sektionens verksamhet.",
    Contact: "Kontakt",
    Search: "Sök",
  },
  Footer: {
    "follow-us": "Följ oss",
  },
  LocaleSwitcher: {
    en: "English",
    sv: "Svenska",
  },
  Common: {
    "read-more": "Läs mer",
    chapter: "IT-Sektionen",
    view: "Visa",
  },
  NotFound: {
    cta: "Ta mig tillbaka!",
  },
  Theme: "Utseende",
  "Theme.Dark": "Mörkt",
  "Theme.Light": "Ljust",
  "Theme.System": "Enhet",
} as const;
