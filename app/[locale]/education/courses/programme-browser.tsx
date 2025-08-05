"use client";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useScopedI18n } from "@/locales/client";
import {
  KoppsProgramme,
  KoppsProgrammeSpecialization,
  KoppsStudyYear,
} from "@/types/kopps";
import { createContext, useContext, useEffect, useState } from "react";

export const ProgrammeBrowserContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return children;
};

export type ProgrammeSelectorValues = {
  programme: string;
  studyYear: KoppsStudyYear;
  admissionYear: number;
};

type Programme = {
  info: KoppsProgramme;
  details: KoppsProgrammeSpecialization;
};

interface ProgrammeSelectorContext {
  values: ProgrammeSelectorValues;
  setValues: (
    newValues:
      | ProgrammeSelectorValues
      | ((prev: ProgrammeSelectorValues) => ProgrammeSelectorValues)
  ) => void;
  onValuesChange: (values: ProgrammeSelectorValues) => void;
  programme?: Programme;
  setProgramme: (programme: Programme) => void;
}

const programmeSelectorContext = createContext<
  ProgrammeSelectorContext | undefined
>(undefined);

const useProgrammeSelector = () => {
  const context = useContext(programmeSelectorContext);
  if (!context) {
    throw new Error(
      "useProgrammeSelector must be used within a ProgrammeSelectorContext"
    );
  }

  return context;
};

export const SelectedProgramme = () => {
  const { programme } = useProgrammeSelector();
  return (
    <div className="mb-1 flex items-center gap-2">
      <h2 className="text-4xl font-medium mr-2">
        {programme?.info.programmeCode}
      </h2>
      <Badge>{`${programme?.info.credits} ${programme?.info.creditUnitAbbr}`}</Badge>
      <Badge variant="secondary">{programme?.details.campus}</Badge>
    </div>
  );
};

export const ProgrammeBrowserHeader = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className=" bg-accent/30 -mt-6 -ml-6 -mr-6 p-6 border-b mb-6">
      {children}
    </div>
  );
};

export const ProgrammeSelector = ({
  defaultProgramme,
  defaultStudyYear = 1,
  programmes,
}: {
  defaultProgramme?: string;
  defaultStudyYear?: KoppsStudyYear;
  programmes: string[];
}) => {
  const [programme, setProgramme] = useState<string>(defaultProgramme ?? "");
  const [studyYear, setStudyYear] = useState<KoppsStudyYear>(defaultStudyYear);

  const { setValues } = useProgrammeSelector();

  useEffect(() => {
    if (programme !== "CINTE" && studyYear > 3) {
      setStudyYear(3);
    }
    setValues((prev) => ({
      ...prev,
      programme,
      studyYear,
    }));
  }, [programme, studyYear]);

  const t = useScopedI18n("CoursesPage");

  return (
    <div className="flex items-center gap-2">
      <Select
        onValueChange={setProgramme}
        value={programme}
        defaultValue={programme}>
        <SelectTrigger>
          <SelectValue placeholder={t("select-programme")} />
        </SelectTrigger>
        <SelectContent>
          {programmes.map((programme) => (
            <SelectItem key={programme} value={programme}>
              {programme}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => setStudyYear(Number(value) as KoppsStudyYear)}
        value={studyYear.toString()}
        defaultValue={studyYear.toString()}>
        <SelectTrigger>
          <SelectValue placeholder={t("select-year")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">{t("year") + " 1"}</SelectItem>
          <SelectItem value="2">{t("year") + " 2"}</SelectItem>
          <SelectItem value="3">{t("year") + " 3"}</SelectItem>
          {programme === "CINTE" && (
            <>
              <SelectItem value="4">{t("year") + " 4"}</SelectItem>
              <SelectItem value="5">{t("year") + " 5"}</SelectItem>
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

const ProgrammeBrowser = ({
  defaultValues,
  children,
  onValuesChange,
}: {
  defaultValues?: ProgrammeSelectorValues;
  children: React.ReactNode;
  onValuesChange?: (values: ProgrammeSelectorValues) => void;
}) => {
  const [values, setValues] = useState<ProgrammeSelectorValues>(
    defaultValues || {
      programme: "",
      studyYear: 1,
      admissionYear: new Date().getFullYear(),
    }
  );
  const [programme, setProgramme] = useState<Programme>();

  useEffect(() => {
    onValuesChange?.(values);
  }, [values]);

  return (
    <programmeSelectorContext.Provider
      value={{
        programme,
        setProgramme: (programme) => setProgramme(programme),
        values,
        setValues: (newValuesOrUpdater) => {
          if (typeof newValuesOrUpdater === "function") {
            setValues(newValuesOrUpdater);
          } else {
            setValues((prevValues) => ({
              ...prevValues,
              ...newValuesOrUpdater,
            }));
          }
        },
        onValuesChange: () => {
          onValuesChange?.(values);
        },
      }}>
      {children}
    </programmeSelectorContext.Provider>
  );
};

export { ProgrammeBrowser };
