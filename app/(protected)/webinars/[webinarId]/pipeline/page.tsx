/*
    This Page is for the attendee of the webinar and the webinar data of the webinar.
*/

import { getWebinarAttendance } from "@/actions/attendance.actions";
import PageHeader from "@/components/PageHeader";
import { type PipelineIdPage } from "@/types";
import { AttendedTypeEnum } from "@prisma/client";
import { HomeIcon } from "lucide-react";
import React from "react";
import { BsStars } from "react-icons/bs";
import { PiPipeLight } from "react-icons/pi";
import PipelineLayout from "./_components/PipelineLayout";
import { formatColumnTitle } from "@/lib/utils";

const PipelineIdPage = async ({ params }: PipelineIdPage) => {
  const { webinarId } = await params;

  const pipelineData = await getWebinarAttendance(webinarId);

  if (!pipelineData.data) {
    return (
      <div className="text-3xl h-[400px] flex justify-center items-center">
        No Pipeline Found!
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <PageHeader
        leftIcon={<BsStars className="w-4 h-4" />}
        mainIcon={<PiPipeLight className="w-12 h-12" />}
        rightIcon={<HomeIcon className="w-3 h-3" />}
        heading="Keep track of all your customers."
        placeholder="Search Name, Tag or Email"
      />
      <div className="flex overflow-x-auto scrollbar-hide pb-4 gap-4 md:gap-6">
        {Object.entries(pipelineData.data).map(([columnType, columnData]) => (
          <PipelineLayout
            key={columnType}
            title={formatColumnTitle(columnType as AttendedTypeEnum)}
            count={columnData.count}
            users={columnData.users}
            tags={pipelineData.webinarTags}
          />
        ))}
      </div>
    </div>
  );
};

export default PipelineIdPage;
