import StudentFunctions from "../components/StudentFunctions";
import StudentTable from "../components/StudentTable";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

const { useQuery } = require("@apollo/client");
const { STUDENTS_COURSES } = require("../utils/queries");

const StudentPage = () => {
  const [formattedData, setFormattedData] = useState();
  const { loading, data, error } = useQuery(STUDENTS_COURSES);
  const courseIdNameMap = {};

  useEffect(() => {
    if (data) {
      data.courses.forEach((course) => {
        courseIdNameMap[course.id] = course.name;
      });
      const formatted = data.students.map((student, index) => {
        return {
          ...student,
          ranking: student.ranking
            .map((courseId) => courseIdNameMap[courseId])
            .join(","),
          allocation: student.allocation.join(","),
          matchingIndex: index + 1,
        };
      });
      setFormattedData(formatted);
    }
  }, [data]);

  return (
    <div>
      <>
        <StudentFunctions
          data={formattedData}
          setFormattedData={setFormattedData}
        />
        <StudentTable loading={loading} error={error} data={formattedData} />
      </>
      <br />
      <div id="csv-wrapper">
        {formattedData ? (
          <CSVLink data={formattedData}>download students csv</CSVLink>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default StudentPage;
