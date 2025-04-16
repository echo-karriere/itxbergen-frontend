"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const gradeValues: Record<string, number> = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
};

interface Course {
  code: string;
  grade: string;
}

export default function KarakterKalkulator() {
  const [courses, setCourses] = useState<Course[]>([{ code: "", grade: "" }]);
  const [average, setAverage] = useState<number | null>(null);

  const handleCourseChange = (
    index: number,
    field: keyof Course,
    value: string,
  ) => {
    const upperValue = field === "grade" ? value.toUpperCase() : value;
    if (
      field === "grade" &&
      !["A", "B", "C", "D", "E", ""].includes(upperValue)
    )
      return;
    const newCourses = [...courses];
    newCourses[index][field] = upperValue;
    setCourses(newCourses);
  };

  const addCourse = () => {
    setCourses([...courses, { code: "", grade: "" }]);
  };

  const calculateAverage = () => {
    const validGrades = courses
      .map((course) => gradeValues[course.grade])
      .filter((val) => typeof val === "number");
    if (validGrades.length === 0) return setAverage(null);
    const total = validGrades.reduce((sum, val) => sum + val, 0);
    setAverage(total / validGrades.length);
  };

  return (
    <div className="min-h-auto bg-IXBbg1 p-6 flex flex-row gap-8 justify-center bg-ix">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Karakter Kalkulator</h1>
        <Card className="w-full shadow-lg rounded-2xl p-6 bg-IXBbg2">
          <CardContent className="flex flex-col gap-4">
            {courses.map((course, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Emne {index + 1}</Label>
                  <Input
                    value={course.code}
                    placeholder="F.eks. INF101"
                    onChange={(e) =>
                      handleCourseChange(index, "code", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Karakter {index + 1}</Label>
                  <Input
                    value={course.grade}
                    maxLength={1}
                    placeholder="A-E"
                    className="uppercase"
                    onChange={(e) =>
                      handleCourseChange(index, "grade", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
            <div className="flex gap-4 mt-4">
              <Button variant="outline" onClick={addCourse}>
                Legg til Fag
              </Button>
              <Button onClick={calculateAverage}>Beregn Gjennomsnitt</Button>
            </div>
            {average !== null && (
              <div className="text-center mt-4 text-lg font-semibold">
                Gjennomsnitt: {average.toFixed(2)}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="w-full h-auto max-w-md bg-IXBbg rounded-2xl p-6 shadow-md text-white">
        <h2 className="text-xl font-bold mb-4">Informasjon</h2>
        <p className="text-base">
          Her kan du fylle inn fag og karakterer for å beregne et gjennomsnitt.
          Hver karakter har en tallverdi:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>A = 5</li>
          <li>B = 4</li>
          <li>C = 3</li>
          <li>D = 2</li>
          <li>E = 1</li>
        </ul>
        <p className="mt-4">
          Resultatet vises etter du trykker på Beregn Gjennomsnitt.
        </p>
      </div>
    </div>
  );
}
