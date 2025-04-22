import { Button } from "@/components/ui/button";
import { KoppsClient } from "@/lib/kopps";
import { cn } from "@/lib/utils";
import { KoppsStudyYear } from "@/types/kopps";
import {
  AlertCircleIcon,
  CircleDotIcon,
  ExternalLinkIcon,
  ThumbsUpIcon,
} from "lucide-react";
import Link from "next/link";
import { ProgrammeBrowser } from "./programme-browser";

const ConditionIcons = {
  Mandatory: <AlertCircleIcon className="text-red-500" />,
  Recommended: <ThumbsUpIcon className="text-amber-400" />,
  "Conditionally Elective": <CircleDotIcon className="text-green-400" />,
};

const ProgrammesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ p: string; a: string; y: string }>;
}) => {
  const { p, a, y } = await searchParams;
  const studyYear = y ? (Number(y) as KoppsStudyYear) : 1;
  const admissionYear = a ? Number(a) : new Date().getFullYear();
  const programme = p || "CINTE";

  if (!p) {
    return <div> No programme selected</div>;
  }

  const kopps = new KoppsClient("en");
  const programmeInfo = await kopps.programme(p).get();
  const programmeDetails = await kopps
    .programme(programme)
    .specializations(admissionYear)
    .get("COMMON", studyYear);

  return (
    <div>
      <ProgrammeBrowser
        initialProgramme={programme}
        initialStudyYear={studyYear}
      />

      <h2 className="text-4xl font-medium mb-1">
        {programmeInfo.programmeCode}
      </h2>
      <p className="text-muted-foreground mb-6">{programmeInfo.title}</p>
      <div className="flex flex-wrap gap-3">
        {programmeDetails.courses.map((course) => (
          <div
            className="bg-muted/50 border rounded-md py-3 px-6"
            key={course.code}
          >
            <div className="mb-1 flex items-center gap-8">
              <p>{course.name.en}</p>
              <Button className="!pr-0 !mr-0" size="sm" asChild variant="link">
                <Link href={course.url.en}>
                  Read more <ExternalLinkIcon />
                </Link>
              </Button>
            </div>
            <div
              className={cn("flex [&>svg]:size-4 items-center gap-1.5 mb-1")}
            >
              {
                ConditionIcons[
                  course.condition.en as keyof typeof ConditionIcons
                ]
              }
              <p className="text-sm -mb-px text-muted-foreground">
                {course.condition.en}
              </p>
            </div>
            <p className="text-muted-foreground">{`${course.credits} ${course.creditUnitAbbr.en}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgrammesPage;
