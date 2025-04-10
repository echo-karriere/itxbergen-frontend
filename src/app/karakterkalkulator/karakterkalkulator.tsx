"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

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
    <div className="flex flex-col items-center justify-center h-auto bg-IXBbg1 p-4">
      <h1 className="text-2xl font-bold mb-4">Karakter Kalkulator</h1>
      <Card className="w-full max-w-xl shadow-lg rounded-2xl p-4 bg-IXBbg2">
        <CardContent className="flex flex-col gap-4 ">
          {courses.map((course, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <div>
                <Label>Emne {index + 1}</Label>
                <Input
                  value={course.code}
                  placeholder="F.eks MAT101"
                  onChange={(e) =>
                    handleCourseChange(index, "code", e.target.value)
                  }
                />
                <div>
                  <Label>Karakter {index + 1}</Label>
                  <Input
                    value={course.grade}
                    placeholder="A-E"
                    onChange={(e) =>
                      handleCourseChange(index, "grade", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="flex gap-4 mt-4">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
