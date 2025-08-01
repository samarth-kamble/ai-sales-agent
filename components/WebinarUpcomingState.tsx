"use client";

import React, { useState, useCallback } from "react";

import { type WebinarUpcomingState } from "@/types";
import CountdownTimer from "./webinar/CountdownTimer";
import WaitlistComponent from "./webinar/WaitlistComponent";
import { WebinarStatusEnum } from "@prisma/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { changeWebinarStatus } from "@/actions/webinar.actions";
import { Loader2, Calendar } from "lucide-react";

const WebinarUpcomingState = ({
  webinar,
  currentUser,
}: WebinarUpcomingState) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formatDate = useCallback((date: Date | string) => {
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) {
        throw new Error("Invalid date");
      }
      return d.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date";
    }
  }, []);

  const handleStartWebinar = async () => {
    if (loading) return; // Prevent double clicks

    setLoading(true);
    try {
      const res = await changeWebinarStatus(webinar.id, WebinarStatusEnum.LIVE);
      if (!res.success) {
        throw new Error(res.message || "Failed to start webinar");
      }
      toast.success("Webinar started successfully");
      router.refresh();
    } catch (error) {
      console.error("Failed to start webinar:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderWebinarActions = () => {
    switch (webinar.webinarStatus) {
      case WebinarStatusEnum.SCHEDULED:
        return (
          <WaitlistComponent webinarId={webinar.id} webinarStatus="SCHEDULED" />
        );

      case WebinarStatusEnum.WAITING_ROOM:
        return currentUser?.id === webinar?.presenterId ? (
          <Button
            className="w-full max-w-[300px] font-semibold"
            onClick={handleStartWebinar}
            disabled={loading}
            aria-label="Start the webinar"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Starting...
              </>
            ) : (
              "Start Webinar"
            )}
          </Button>
        ) : (
          <WaitlistComponent
            webinarId={webinar.id}
            webinarStatus="WAITING_ROOM"
          />
        );

      case WebinarStatusEnum.CANCELLED:
        return (
          <div className="text-center space-y-2 flex items-center justify-center h-screen">
            <p className="text-xl text-destructive font-semibold">
              Webinar Cancelled
            </p>
            <p className="text-muted-foreground text-sm">
              This webinar has been cancelled by the organizer.
            </p>
          </div>
        );

      case WebinarStatusEnum.ENDED:
        return (
          <div className="text-center space-y-2">
            <Button variant="outline" disabled>
              Webinar Ended
            </Button>
            <p className="text-muted-foreground text-sm">
              This webinar has concluded.
            </p>
          </div>
        );

      default:
        return (
          <p className="text-muted-foreground text-center">
            Unknown webinar status
          </p>
        );
    }
  };

  // Early return if webinar data is invalid
  if (!webinar?.id) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Invalid webinar data</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      <div className="mx-auto max-w-4xl flex flex-col justify-center items-center gap-8 py-10 px-4">
        {/* Header Section */}
        <header className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium border border-border">
            <div className="w-2 h-2 bg-accent-primary rounded-full animate-pulse"></div>
            Upcoming Webinar
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
            You&apos;re a bit early!
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {webinar.title || "Your webinar"} will begin shortly. Get
            comfortable while we count down!
          </p>
        </header>

        {/* Webinar Info Card */}
        <section className="bg-card text-card-foreground rounded-xl shadow-xl p-6 sm:p-8 max-w-2xl w-full border border-border">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              {webinar.title}
            </h2>

            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Calendar className="w-5 h-5" />
              <time
                dateTime={new Date(webinar.startTime).toISOString()}
                className="text-sm font-medium"
              >
                {formatDate(webinar.startTime)}
              </time>
            </div>

            {webinar.description && (
              <p className="text-muted-foreground text-sm leading-relaxed">
                {webinar.description}
              </p>
            )}
          </div>

          {/* Countdown Timer */}
          <CountdownTimer
            target={new Date(webinar.startTime)}
            className="text-center"
            webinarId={webinar.id}
            webinarStatus={webinar.webinarStatus}
          />
        </section>

        {/* Webinar Actions */}
        <section className="space-y-6 w-full h-full flex justify-center items-center flex-col">
          {renderWebinarActions()}
        </section>
      </div>
    </div>
  );
};

export default WebinarUpcomingState;
