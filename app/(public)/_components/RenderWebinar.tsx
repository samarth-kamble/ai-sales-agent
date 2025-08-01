"use client";
import React, { useEffect } from "react";

import { type RenderWebinar } from "@/types";
import { WebinarStatusEnum } from "@prisma/client";
import WebinarUpcomingState from "@/components/WebinarUpcomingState";
import { usePathname, useRouter } from "next/navigation";
import { useAttendeeStore } from "@/hooks/useAttendeeStore";
import { toast } from "sonner";
import { XCircle, Calendar, AlertTriangle } from "lucide-react";

const RenderWebinar = ({
  error,
  apiKey,
  token,
  callId,
  user,
  webinar,
}: RenderWebinar) => {
  const router = useRouter();
  const pathname = usePathname();
  const { attendee } = useAttendeeStore();

  useEffect(() => {
    if (error) {
      toast.error(error);
      router.push(pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
  return (
    <React.Fragment>
      {webinar?.webinarStatus === WebinarStatusEnum.SCHEDULED ? (
        <WebinarUpcomingState webinar={webinar} currentUser={user || null} />
      ) : webinar?.webinarStatus === WebinarStatusEnum.WAITING_ROOM ? (
        <WebinarUpcomingState webinar={webinar} currentUser={user || null} />
      ) : webinar?.webinarStatus === WebinarStatusEnum.LIVE ? (
        <React.Fragment>
          {user?.id === webinar?.presenterId ? (
            // '<LiveStreamState
            //   apiKey={apiKey}
            //   token={token}
            //   callId={callId}
            //   webinar={webinar}
            //   user={user}
            // />'
            ""
          ) : // Only show the participant view if they've registered
          attendee ? (
            // <Participant apiKey={apiKey} token={token} callId={callId} />
            ""
          ) : (
            <WebinarUpcomingState
              webinar={webinar}
              currentUser={user || null}
            />
          )}
        </React.Fragment>
      ) : webinar?.webinarStatus === WebinarStatusEnum.CANCELLED ? (
        // Enhanced cancelled webinar component
        <div className="flex justify-center items-center h-screen p-8">
          <div className="max-w-md w-full">
            {/* Animated background with gradient */}
            <div className="relative bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-2xl p-8 border border-red-200 dark:border-red-800/30 shadow-lg">
              {/* Main content */}
              <div className="relative text-center space-y-6">
                {/* Icon with animation */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center animate-pulse">
                      <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                    </div>
                    {/* Ripple effect */}
                    <div className="absolute inset-0 w-16 h-16 bg-red-200 dark:bg-red-800/20 rounded-full animate-ping opacity-20"></div>
                  </div>
                </div>

                {/* Status badge */}
                <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-4 py-2 rounded-full text-sm font-medium border border-red-200 dark:border-red-800/50">
                  <XCircle className="w-4 h-4" />
                  Webinar Cancelled
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                    {webinar?.title}
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Event Cancelled</span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                    Unfortunately, this webinar has been cancelled by the
                    organizer.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    We apologize for any inconvenience caused. Please check your
                    email for further updates.
                  </p>
                </div>

                {/* Optional action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    onClick={() => router.push("/webinars")}
                  >
                    Browse Other Events
                  </button>
                  <button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    onClick={() => router.back()}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom decorative line */}
            <div className="mt-6 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      ) : (
        <WebinarUpcomingState webinar={webinar} currentUser={user || null} />
      )}
    </React.Fragment>
  );
};

export default RenderWebinar;
