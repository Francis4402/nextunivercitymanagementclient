import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyOfferedCourses } from "@/services/OfferedCourse";
import { IOfferedCourseInfo } from "@/types/OfferedCoursetypes";
import EnRolledButton from "../utils/EnRolledButton";
import { getEnrolledCourses } from "@/services/EnrolledCourse";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";



const OfferedCourses = async () => {

  const offeredCourses = await getMyOfferedCourses();

  const enrolledCourses = await getEnrolledCourses();


  return (
    <div className="grid sm:grid-cols-2 gap-2 w-full">
      {
        offeredCourses.data.length > 0 && 
        offeredCourses.data.map((courses: IOfferedCourseInfo) => {
          return (
            <Card key={courses._id}>
              <CardHeader>
                <CardTitle>{courses.course.title}</CardTitle>
                <CardAction>
                  <Badge>
                    {
                      enrolledCourses.data[0].isCompleted === true ? (
                        <span>Complete</span>
                      ): <span>In Progress</span>
                    }
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent>

                <div className="flex flex-col gap-2">
                  <p>Section: {courses.section}</p>
                  <p>Days: {courses.days[0]} {courses.days[1]} {courses.days[2]} {courses.days[3]} {courses.days[4]} {courses.days[5]}</p>
                  <p>Start Time: {courses.startTime}</p>
                  <p>End Time: {courses.endTime}</p>
                </div>
                
                <CardAction>
                  {
                    enrolledCourses.data[0].isEnrolled === true ? (
                      <Button>Enrolled</Button>
                    ) : (
                      <EnRolledButton id={courses._id} />
                    )
                  }
                </CardAction>
              </CardContent>
            </Card>
          )
        })
      }
    </div>
  )
}

export default OfferedCourses