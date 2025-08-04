"use client"

import { Button } from "@/components/ui/button";
import { createEnrolledCourse } from "@/services/EnrolledCourse";
import { useState } from "react";
import { toast } from "sonner";



const EnRolledButton = ({ id }: {id: string}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleEnroll = async () => {
    setIsLoading(true);
    try {
      const enrollData = {
        offeredCourse: id
      };
      
      const res = await createEnrolledCourse(enrollData);

      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }

    } catch (error) {
      toast.error("Failed to enroll in course");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleEnroll} disabled={isLoading}>
      {isLoading ? "Enrolling..." : "Enroll"}
    </Button>
  );
};

export default EnRolledButton;