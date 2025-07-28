import React from "react";
import { HomeIcon, WebcamIcon } from "lucide-react";
import { BsStars } from "react-icons/bs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/PageHeader";
import { Webinar } from "@prisma/client";
import { onAuthenticateUser } from "@/actions/auth.actions";
import { redirect } from "next/navigation";
import { getWebinarByPresenterId } from "@/actions/webinar.actions";
import WebinarCard from "@/components/WebinarCard";

const WebinarPage = async () => {
  const checkUser = await onAuthenticateUser();
  if (!checkUser.user) {
    return redirect("/");
  }
  const webinars = await getWebinarByPresenterId(checkUser.user.id);

  // Filter webinars based on current date
  const now = new Date();

  const upcomingWebinars =
    webinars?.filter((webinar: Webinar) => {
      if (!webinar.startTime) return false;
      const webinarDate = new Date(webinar.startTime);
      return webinarDate > now;
    }) || [];

  const endedWebinars =
    webinars?.filter((webinar: Webinar) => {
      if (!webinar.startTime) return false;
      const webinarDate = new Date(webinar.startTime);
      return webinarDate <= now;
    }) || [];

  // Component to render webinar list
  const renderWebinarList = (webinarList: Webinar[], emptyMessage: string) => (
    <>
      {webinarList.length > 0 ? (
        webinarList.map((webinar: Webinar, index: number) => (
          <WebinarCard key={webinar.id || index} webinar={webinar} />
        ))
      ) : (
        <div className="w-full h-[200px] flex justify-center items-center text-primary font-semibold text-2xl col-span-full">
          {emptyMessage}
        </div>
      )}
    </>
  );

  return (
    <Tabs defaultValue={"all"} className="w-full flex flex-col gap-8">
      <PageHeader
        leftIcon={<HomeIcon className="w-3 h-3" />}
        mainIcon={<WebcamIcon className="w-12 h-12" />}
        rightIcon={<BsStars className="w-4 h-4" />}
        heading="The home to all your webinars"
        placeholder="Search webinars..."
      >
        <TabsList className="bg-transparent space-x-3 ">
          <TabsTrigger
            value="all"
            className="bg-secondary opacity-50 data-[state=active]:opacity-100 px-8 py-4"
          >
            All ({webinars?.length || 0})
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className="bg-secondary opacity-50 data-[state=active]:opacity-100 px-8 py-4"
          >
            Upcoming ({upcomingWebinars.length})
          </TabsTrigger>
          <TabsTrigger
            value="ended"
            className="bg-secondary opacity-50 data-[state=active]:opacity-100 px-8 py-4"
          >
            Ended ({endedWebinars.length})
          </TabsTrigger>
        </TabsList>
      </PageHeader>

      {/* All Webinars Tab */}
      <TabsContent
        value="all"
        className="w-full grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 place-items-start place-content-start gap-x-6 gap-y-10"
      >
        {renderWebinarList(webinars || [], "No Webinar Found")}
      </TabsContent>

      {/* Upcoming Webinars Tab */}
      <TabsContent
        value="upcoming"
        className="w-full grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 place-items-start place-content-start gap-x-6 gap-y-10"
      >
        {renderWebinarList(upcomingWebinars, "No Upcoming Webinars")}
      </TabsContent>

      {/* Ended Webinars Tab */}
      <TabsContent
        value="ended"
        className="w-full grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 place-items-start place-content-start gap-x-6 gap-y-10"
      >
        {renderWebinarList(endedWebinars, "No Ended Webinars")}
      </TabsContent>
    </Tabs>
  );
};

export default WebinarPage;
