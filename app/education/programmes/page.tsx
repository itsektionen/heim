"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";
import { KoppsStudyYear } from "@/types/kopps";
import {
  AlertCircleIcon,
  CircleDotIcon,
  ExternalLinkIcon,
  ThumbsUpIcon,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  ProgrammeBrowser,
  ProgrammeBrowserHeader,
  ProgrammeSelector,
  ProgrammeSelectorValues,
} from "./programme-browser";

const ConditionIcons = {
  Mandatory: <AlertCircleIcon className="text-red-500" />,
  Recommended: <ThumbsUpIcon className="text-amber-400" />,
  "Conditionally Elective": <CircleDotIcon className="text-green-400" />,
};

const conditionColors = {
  Mandatory: "var(--color-red-500)",
  Recommended: "var(--color-amber-500)",
  "Conditionally Elective": "var(--color-green-500)",
};

const ProgrammesPage = () => {
  const searchParams = useSearchParams();
  const [programmeSelectorValues, setProgrammeSelectorValues] =
    useState<ProgrammeSelectorValues>({
      programme: "CINTE",
      studyYear: 1,
      admissionYear: new Date().getFullYear(),
    });

  const p = searchParams.get("p");
  const a = searchParams.get("a");
  const y = searchParams.get("y");
  const studyYear = y ? (Number(y) as KoppsStudyYear) : 1;
  const admissionYear = a ? Number(a) : new Date().getFullYear();
  const programme = p || "CINTE";

  const { data: programmeInfo, isFetching: programmeInfoIsFetching } =
    trpc.kopps.getProgramme.useQuery(programmeSelectorValues.programme);
  const { data: programmeDetails, isFetching: programmeDetailsIsFetching } =
    trpc.kopps.getSpecialization.useQuery({
      programmeCode: programmeSelectorValues.programme,
      admissionYear: programmeSelectorValues.admissionYear,
      studyYear: programmeSelectorValues.studyYear,
      specializationCode: "COMMON",
    });

  return (
    <div>
      <ProgrammeBrowser
        onValuesChange={(values) => {
          setProgrammeSelectorValues(values);
        }}
        defaultValues={programmeSelectorValues}
      >
        <ProgrammeBrowserHeader>
          <p className="text-lg font-medium mb-1">Course Browser</p>
          <p className="text-muted-foreground mb-6 max-w-prose">
            Browse through the programmes and courses that students at the IT
            Chapter study.
          </p>
          <ProgrammeSelector
            programmes={["CINTE", "TIDAB", "TCOMK", "CDATE"]}
            defaultProgramme={programmeSelectorValues.programme}
            defaultStudyYear={studyYear}
          />
        </ProgrammeBrowserHeader>

        <div className="mb-1 flex items-center gap-2">
          <h2 className="text-4xl font-medium mr-2">
            {programmeInfo?.programmeCode}
          </h2>
          <Badge>{`${programmeInfo?.credits} ${programmeInfo?.creditUnitAbbr}`}</Badge>
          <Badge variant="secondary">{programmeDetails?.campus}</Badge>
        </div>
        <p className="text-muted-foreground mb-6">
          {programmeInfo?.titleOtherLanguage}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {programmeDetails?.courses.map((course) => (
            <div
              className={cn(
                "bg-muted/50 border overflow-hidden relative rounded-md py-3 px-6 flex flex-col pl-6",
                "before:content-[''] before:absolute before:top-2 before:bottom-2 before:left-2 before:w-1.5 before:bg-muted before:rounded-full",
                course.condition.en == "Mandatory" && "before:bg-red-500",
                course.condition.en == "Recommended" && "before:bg-amber-400",
                course.condition.en == "Conditionally Elective" &&
                  "before:bg-green-400",
              )}
              key={course.code}
            >
              <div className="flex items-start gap-8">
                <p>{course.name.en}</p>
                <Button
                  className="!pr-0 !mr-0 ml-auto"
                  size="sm"
                  asChild
                  variant="link"
                >
                  <Link href={course.url.en}>
                    Read more <ExternalLinkIcon />
                  </Link>
                </Button>
              </div>
              <div
                className={cn("flex [&>svg]:size-4 items-center gap-1.5 mb-4")}
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
              <p className="text-muted-foreground mt-auto">{`${course.credits} ${course.creditUnitAbbr.en}`}</p>
            </div>
          ))}
        </div>
      </ProgrammeBrowser>
    </div>
  );
};

export default ProgrammesPage;
