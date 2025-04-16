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
  points: string;
  grade: string;
}

export default function Karakterkalkulator() {
  const [courses, setCourses] = useState<Course[]>([
    { code: "", points: "", grade: "" },
  ]);
  const [average, setAverage] = useState<number | null>(null);
  const [totalPoints, setTotalPoints] = useState<number | null>(null);

  const handleCourseChange = (
    index: number,
    field: keyof Course,
    value: string,
  ) => {
    const upperValue = field === "grade" ? value.toUpperCase() : value;
    if (
      field === "grade" &&
      !["A", "B", "C", "D", "E", ""].includes(upperValue)
    ) {
      return;
    }
    const newCourses = [...courses];
    newCourses[index][field] = upperValue;
    setCourses(newCourses);
  };

  const addCourse = () => {
    setCourses([...courses, { code: "", points: "", grade: "" }]);
  };

  const calculateAverage = () => {
    const validCourses = courses.filter(
      (course) =>
        course.grade &&
        gradeValues[course.grade] &&
        course.points &&
        !isNaN(parseFloat(course.points)),
    );

    if (validCourses.length === 0) {
      setAverage(null);
      setTotalPoints(null);
      return;
    }

    let totalWeighted = 0;
    let totalPointsSum = 0;

    validCourses.forEach((course) => {
      const points = parseFloat(course.points);
      const gradeValue = gradeValues[course.grade];
      totalWeighted += points * gradeValue;
      totalPointsSum += points;
    });

    setAverage(totalWeighted / totalPointsSum);
    setTotalPoints(totalPointsSum);
  };

  return (
    <div className="h-auto bg-IXBbg1 p-6">
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {/* Information Box */}
        <div className="order-1 md:order-2 w-full md:w-auto md:max-w-md h-[380px] bg-IXBbg rounded-2xl p-6 shadow-md text-white md:mt-10">
          <h2 className="text-xl font-bold mb-4">Informasjon</h2>
          <p className="text-base">
            Her kan du fylle inn fag, studiepoeng og karakterer for å beregne et
            vektet gjennomsnitt.
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>A = 5</li>
            <li>B = 4</li>
            <li>C = 3</li>
            <li>D = 2</li>
            <li>E = 1</li>
          </ul>
          <p className="mt-4">
            Gjennomsnittet beregnes som: (sum av poeng × karakterverdi) /
            (totale studiepoeng)
          </p>
        </div>

        {/* Calculator Box */}
        <div className="order-2 md:order-1 w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 md text-center">
            Karakterkalkulator
          </h1>
          <Card className="w-full shadow-lg rounded-2xl p-6 bg-IXBbg2">
            <CardContent className="flex flex-col gap-4">
              {courses.map((course, index) => (
                <div key={index} className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Emne {index + 1}</Label>
                    <Input
                      value={course.code}
                      // placeholder="F.eks. INF101"
                      onChange={(e) =>
                        handleCourseChange(index, "code", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Poeng</Label>
                    <Input
                      value={course.points}
                      // placeholder="F.eks. 10"
                      onChange={(e) =>
                        handleCourseChange(index, "points", e.target.value)
                      }
                      type="number"
                      min="0"
                      step="1"
                    />
                  </div>
                  <div>
                    <Label>Karakter</Label>
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
              <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center">
                <Button
                  variant="outline"
                  onClick={addCourse}
                  className="sm:w-auto w-full"
                >
                  Legg til Fag
                </Button>
                <Button onClick={calculateAverage} className="sm:w-auto w-full">
                  Beregn Gjennomsnitt
                </Button>
              </div>
              {average !== null && totalPoints !== null && (
                <div className="text-center mt-4 space-y-2">
                  <div className="text-lg font-semibold">
                    Vektet gjennomsnitt: {average.toFixed(2)}
                  </div>
                  <div className="text-md">
                    Totale studiepoeng: {totalPoints}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
