"use client";

import {
  ProgrammeBrowser,
  ProgrammeBrowserContent,
  ProgrammeBrowserHeader,
  ProgrammeSelector,
  ProgrammeSelectorValues,
} from "@/app/education/programmes/programme-browser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const ConditionIcons = {
  Mandatory: <AlertCircleIcon className="text-red-500" />,
  Recommended: <ThumbsUpIcon className="text-amber-400" />,
  "Conditionally Elective": <CircleDotIcon className="text-green-400" />,
};

// NOTE:
// All of the query parameter stuff is dones simply to **preserve** state - NOT manage it.
// It is quite dirty, but using the query parameters as a "mirror" of the state is faster than
// actually managing the state through the query parameters.

// There probably is a better and more "correct" way to do it, but this will do for now.

// There are some missing courses and such since KTH's API doesn't really
// provide that much data, so we will probably have to source it manually.

// Please forgive the weirdness and this long ass comment.

// TODO: Add constraints for 3 year programmes.

const ProgrammesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const p = searchParams.get("p");
  const a = searchParams.get("a");
  const y = searchParams.get("y");
  const studyYear: KoppsStudyYear = y ? (Number(y) as KoppsStudyYear) : 1;
  const admissionYear = a ? Number(a) : new Date().getFullYear();
  const programme = p || "CINTE";

  const [programmeSelectorValues, setProgrammeSelectorValues] =
    useState<ProgrammeSelectorValues>({
      programme,
      studyYear,
      admissionYear,
    });

  const createQueryString = useCallback(
    (pairs: { name: string; value: string }[]) => {
      const params = new URLSearchParams(searchParams.toString());
      pairs.map((pair) => {
        params.set(pair.name, pair.value);
      });

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    const newQueryString = createQueryString([
      { name: "p", value: programmeSelectorValues.programme },
      { name: "a", value: programmeSelectorValues.admissionYear.toString() },
      { name: "y", value: programmeSelectorValues.studyYear.toString() },
    ]);
    router.push(pathname + "?" + newQueryString);
  }, [programmeSelectorValues, createQueryString, pathname, router]);

  const { data: programmeInfo, isLoading: programmeInfoIsLoading } =
    trpc.kopps.getProgramme.useQuery(programmeSelectorValues.programme);
  const { data: programmeDetails, isLoading: programmeDetailsIsLoading } =
    trpc.kopps.getSpecialization.useQuery({
      programmeCode: programmeSelectorValues.programme,
      admissionYear: programmeSelectorValues.admissionYear,
      studyYear: programmeSelectorValues.studyYear,
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
          <div className="flex items-center mb-1 gap-2">
            <h1 className="text-lg font-medium">Course Browser</h1>
            <Badge>Beta</Badge>
          </div>
          <p className="text-muted-foreground mb-6 max-w-prose">
            Browse through the programmes and courses that students at the IT
            Chapter study.
          </p>
          <ProgrammeSelector
            programmes={["CINTE", "TIDAB", "TCOMK"]}
            defaultProgramme={programmeSelectorValues.programme}
            defaultStudyYear={programmeSelectorValues.studyYear}
          />
        </ProgrammeBrowserHeader>
        <ProgrammeBrowserContent>
          <div className="mb-1 flex items-center gap-2">
            {!programmeInfoIsLoading ? (
              <>
                <h2 className="text-4xl font-medium mr-2">
                  {programmeInfo?.programmeCode}
                </h2>
                <Badge>{`${programmeInfo?.credits} ${programmeInfo?.creditUnitAbbr}`}</Badge>
              </>
            ) : (
              <>
                <Skeleton className="h-9 w-24 mr-2" />
                <Skeleton className="h-5.5 w-16" />
              </>
            )}
            {!programmeDetailsIsLoading ? (
              <Badge variant="secondary">{programmeDetails?.campus}</Badge>
            ) : (
              <Skeleton className="h-5.5 w-16" />
            )}
          </div>
          {!programmeInfoIsLoading ? (
            <p className="text-muted-foreground mb-6">
              {programmeInfo?.titleOtherLanguage}
            </p>
          ) : (
            <Skeleton className="h-5 w-1/3 mb-6 mt-3" />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {!programmeDetailsIsLoading ? (
              programmeDetails?.courses.map((course) => (
                <div
                  className={cn(
                    "bg-muted/50 border overflow-hidden relative rounded-md py-3 px-6 flex flex-col pl-6",
                    "before:content-[''] before:absolute before:top-2 before:bottom-2 before:left-2 before:w-1.5 before:bg-muted before:rounded-full",
                    course.condition.en == "Mandatory" && "before:bg-red-500",
                    course.condition.en == "Recommended" &&
                      "before:bg-amber-400",
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
                    className={cn(
                      "flex [&>svg]:size-4 items-center gap-1.5 mb-4",
                    )}
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
              ))
            ) : (
              <>
                {Array.from({ length: 14 }).map((_, i) => (
                  <Skeleton className="h-29" key={`course-skeleton.${i}`} />
                ))}
              </>
            )}
          </div>
        </ProgrammeBrowserContent>
      </ProgrammeBrowser>
    </div>
  );
};

export default ProgrammesPage;
