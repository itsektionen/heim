import { KoppsClient } from "@/lib/kopps";
import { procedure, router } from "@/server/trpc";
import { KoppsStudyYear } from "@/types/kopps";
import { z } from "zod";

export const koppsRouter = router({
  getProgramme: procedure.input(z.string()).query(async ({ input }) => {
    const kopps = new KoppsClient();
    return await kopps.programme(input).get();
  }),
  listSpecializations: procedure
    .input(
      z.object({
        programmeCode: z.string(),
        admissionYear: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const kopps = new KoppsClient("en");
      return kopps
        .programme(input.programmeCode)
        .specializations(input.admissionYear)
        .list();
    }),
  getSpecialization: procedure
    .input(
      z.object({
        programmeCode: z.string(),
        admissionYear: z.number(),
        studyYear: z.number().min(1).max(5).default(1),
      }),
    )
    .query(async ({ input }) => {
      const kopps = new KoppsClient("en");

      return kopps
        .programme(input.programmeCode)
        .specializations(input.admissionYear)
        .get("COMMON", input.studyYear as KoppsStudyYear);
    }),
});
