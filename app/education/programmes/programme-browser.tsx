"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KoppsStudyYear } from "@/types/kopps";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProgrammeBrowser = ({
  initialProgramme,
  initialStudyYear = 1,
}: {
  initialProgramme?: string;
  initialStudyYear?: KoppsStudyYear;
}) => {
  const [programme, setProgramme] = useState<string>(initialProgramme ?? "");
  const [studyYear, setStudyYear] = useState<KoppsStudyYear>(initialStudyYear);

  const router = useRouter();
  useEffect(() => {
    router.push("/education/programmes?p=" + programme + "&y=" + studyYear);
  }, [programme, studyYear]);

  return (
    <div className=" bg-accent/30 -mt-6 -ml-6 -mr-6 p-6 border-b mb-6">
      <p className="text-lg font-medium mb-1">Programme Browser</p>
      <p className="text-muted-foreground mb-6 max-w-prose">
        Browse through the programmes and courses that students at the IT
        Chapter study.
      </p>
      <div className="flex items-center gap-2">
        <Select
          onValueChange={setProgramme}
          value={programme}
          defaultValue={programme}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a programme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CINTE">CINTE</SelectItem>
            <SelectItem value="TIDAB">TIDAB</SelectItem>
            <SelectItem value="TIEDB">TIEDB</SelectItem>
            <SelectItem value="TCOMK">TCOMK</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) =>
            setStudyYear(Number(value) as KoppsStudyYear)
          }
          value={studyYear.toString()}
          defaultValue={studyYear.toString()}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a study year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Year 1</SelectItem>
            <SelectItem value="2">Year 2</SelectItem>
            <SelectItem value="3">Year 3</SelectItem>
            <SelectItem value="4">Year 4</SelectItem>
            <SelectItem value="5">Year 5</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export { ProgrammeBrowser };
