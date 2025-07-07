import { getAllSemesters } from "@/services/AcademicSemester"
import { IAcademicSemester } from "@/types/academicsemestertype";


const AcademicSemester = async () => {

  const semesters = await getAllSemesters();

  const semesterData: IAcademicSemester[] = semesters.data;

  return (
    <div>
      {
        semesterData.map((semester, index) => {
          return (
            <div key={index}>
              {semester.name}
            </div>
          )
        })
      }
    </div>
  )
}

export default AcademicSemester