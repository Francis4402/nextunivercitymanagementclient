import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyOfferedCourses } from "@/services/OfferedCourse";
import { IOfferedCourseInfo } from "@/types/OfferedCoursetypes";


const OfferedCourses = async () => {

  const offeredCourses = await getMyOfferedCourses();

  

  return (
    <div className="grid sm:grid-cols-2 gap-2 w-full">
      {
        offeredCourses.data.length > 0 && 
        offeredCourses.data.map((courses: IOfferedCourseInfo) => {
          return (
            <Card key={courses._id}>
              <CardHeader>
                <CardTitle>{courses.course.title}</CardTitle>
              </CardHeader>
              <CardContent>

                <div className="flex flex-col gap-2">
                  <p>Section: {courses.section}</p>
                  <p>Days: {courses.days[0]} {courses.days[1]} {courses.days[2]} {courses.days[3]} {courses.days[4]} {courses.days[5]}</p>
                  <p>Start Time: {courses.startTime}</p>
                  <p>End Time: {courses.endTime}</p>
                </div>
                
                <CardAction>
                  <Button>Enroll</Button>
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