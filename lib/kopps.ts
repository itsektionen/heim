// kopps.ts
import {
  KoppsProgrammeSpecialization,
  type KoppsProgramme,
  type KoppsStudyYear,
  type SpecializationsResponse,
} from "@/types/kopps";

const KOPPS_BASE_URL = "https://api.kth.se/api/kopps/v2";

class SpecializationsAPI {
  constructor(
    private programmeCode: string,
    private lang: string,
    private year: number,
    private specCode?: string,
  ) {}

  public async get(
    code: string,
    studyYear: KoppsStudyYear = 1,
  ): Promise<KoppsProgrammeSpecialization> {
    return this.request(
      `/programme/${this.programmeCode}.${code}.${this.year}.${studyYear}`,
    );
  }

  public async list(): Promise<SpecializationsResponse> {
    return this.request(`/programme/${this.programmeCode}.${this.year}`);
  }

  private async request(endpoint: string) {
    const res = await fetch(`${KOPPS_BASE_URL}${endpoint}?l=${this.lang}`);
    return res.json();
  }
}

class ProgrammeAPI {
  constructor(
    private programmeCode: string,
    private lang: string,
  ) {}

  public async get(): Promise<KoppsProgramme> {
    return await this.request(`/programme/${this.programmeCode}`);
  }

  public specializations(year: number) {
    return new SpecializationsAPI(this.programmeCode, this.lang, year);
  }

  private async request(endpoint: string) {
    const res = await fetch(`${KOPPS_BASE_URL}${endpoint}?l=${this.lang}`);
    return res.json();
  }
}

class CourseAPI {
  constructor(
    private code: string,
    private lang: string,
  ) {}

  public async get() {
    const res = await fetch(
      `${KOPPS_BASE_URL}/course/${this.code}?l=${this.lang}`,
    );
    return res.json();
  }
}

export class KoppsClient {
  private lang: string;

  constructor(lang: string = "sv") {
    this.lang = lang;
  }

  public programme(code: string) {
    return new ProgrammeAPI(code, this.lang);
  }

  public course(code: string) {
    return new CourseAPI(code, this.lang);
  }
}
