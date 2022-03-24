import StudentFunctions from "../components/StudentFunctions";
import StudentTable from "../components/StudentTable";
import { useEffect, useState } from "react";
import { CSVLink, CSVDownload } from "react-csv";

const { useQuery } = require("@apollo/client");
const { STUDENTS } = require("../utils/queries");

const StudentPage = () => {
  const [formattedData, setFormattedData] = useState();
  const { loading, data, error } = useQuery(STUDENTS);

  useEffect(() => {
    if (data) {
      const formatted = data.students.map((student, index) => {
        return { ...student, matchingIndex: index + 1 };
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
      <div>
        <CSVLink data={formattedData}>download csv &nbsp;</CSVLink>
      </div>
    </div>
  );
};

export default StudentPage;
