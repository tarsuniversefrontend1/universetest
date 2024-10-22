"use client"
import HomeTimeline from "@/components/Home/HomeTimeline/HomeTimeline"
import LeftWidget from "@/components/Home/LeftWidget/LeftWidget"
import RightWidget from "@/components/Home/RightWidget/RightWidget"
import UseTitle from "@/hooks/DynamicTitle/useTitle"


const page = () => {
  UseTitle("Universe | Home")
  return (
  
      <div className="flex relative items-start justify-center gap-4">
        <LeftWidget/>
        <HomeTimeline/>
        <RightWidget/>
      </div>
   
  )
}

export default page