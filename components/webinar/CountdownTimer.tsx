"use client";

import React, { useEffect, useState } from "react";

import { type CountdownTimer } from "@/types";
import { cn } from "@/lib/utils";
import { WebinarStatusEnum } from "@prisma/client";
import { changeWebinarStatus } from "@/actions/webinar.actions";

const CountdownTimer = ({
  target,
  className,
  webinarId,
  webinarStatus,
}: CountdownTimer) => {
  const [isExpired, setIsExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  const splitDigits = (num: number) => {
    const formatted = formatNumber(num);
    return [formatted.charAt(0), formatted.charAt(1)];
  };

  const [days1, days2] = splitDigits(timeLeft.days > 99 ? 99 : timeLeft.days);
  const [hours1, hours2] = splitDigits(timeLeft.hours);
  const [minutes1, minutes2] = splitDigits(timeLeft.minutes);
  const [seconds1, seconds2] = splitDigits(timeLeft.seconds);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const distance = target.getTime() - now.getTime();

      if (distance <= 0) {
        if (!isExpired) {
          setIsExpired(true);

          if (webinarStatus === WebinarStatusEnum.SCHEDULED) {
            const updateStatus = async () => {
              try {
                await changeWebinarStatus(
                  webinarId,
                  WebinarStatusEnum.WAITING_ROOM
                );
              } catch (error) {
                console.log("Error updating webinar status:", error);
              }
            };

            updateStatus();
          }
        }

        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [target, isExpired, webinarId, webinarStatus]);

  if (isExpired) {
    return (
      <div className={cn("text-center", className)}>
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-lg animate-pulse border border-green-500/30">
          <h2 className="text-xl font-bold">🚀 Webinar is Starting!</h2>
          <p className="text-sm opacity-90">Get ready to join...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("text-center", className)}>
      <div className="mb-4">
        <h3 className="text-base font-medium text-gray-300 mb-2">
          Webinar starts in
        </h3>
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6">
        {timeLeft.days > 0 && (
          <>
            <div className="text-center">
              <div className="flex items-center gap-1 mb-2">
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/50 text-white w-10 h-12 sm:w-11 sm:h-14 flex items-center justify-center rounded-lg shadow-lg font-bold text-lg sm:text-xl transform hover:scale-105 transition-all duration-200 hover:border-blue-500/50">
                  {days1}
                </div>
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/50 text-white w-10 h-12 sm:w-11 sm:h-14 flex items-center justify-center rounded-lg shadow-lg font-bold text-lg sm:text-xl transform hover:scale-105 transition-all duration-200 hover:border-blue-500/50">
                  {days2}
                </div>
              </div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Days
              </p>
            </div>
            <div className="text-xl sm:text-2xl text-gray-500 animate-pulse">
              :
            </div>
          </>
        )}

        <div className="text-center">
          <div className="flex items-center gap-1 mb-2">
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/50 text-white w-10 h-12 sm:w-11 sm:h-14 flex items-center justify-center rounded-lg shadow-lg font-bold text-lg sm:text-xl transform hover:scale-105 transition-all duration-200 hover:border-indigo-500/50">
              {hours1}
            </div>
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/50 text-white w-10 h-12 sm:w-11 sm:h-14 flex items-center justify-center rounded-lg shadow-lg font-bold text-lg sm:text-xl transform hover:scale-105 transition-all duration-200 hover:border-indigo-500/50">
              {hours2}
            </div>
          </div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            Hours
          </p>
        </div>

        <div className="text-xl sm:text-2xl text-gray-500 animate-pulse">:</div>

        <div className="text-center">
          <div className="flex items-center gap-1 mb-2">
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/50 text-white w-10 h-12 sm:w-11 sm:h-14 flex items-center justify-center rounded-lg shadow-lg font-bold text-lg sm:text-xl transform hover:scale-105 transition-all duration-200 hover:border-purple-500/50">
              {minutes1}
            </div>
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/50 text-white w-10 h-12 sm:w-11 sm:h-14 flex items-center justify-center rounded-lg shadow-lg font-bold text-lg sm:text-xl transform hover:scale-105 transition-all duration-200 hover:border-purple-500/50">
              {minutes2}
            </div>
          </div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            Minutes
          </p>
        </div>

        <div className="text-xl sm:text-2xl text-gray-500 animate-pulse">:</div>

        <div className="text-center">
          <div className="flex items-center gap-1 mb-2">
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/50 text-white w-10 h-12 sm:w-11 sm:h-14 flex items-center justify-center rounded-lg shadow-lg font-bold text-lg sm:text-xl transform hover:scale-105 transition-all duration-200 hover:border-red-500/50">
              {seconds1}
            </div>
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/50 text-white w-10 h-12 sm:w-11 sm:h-14 flex items-center justify-center rounded-lg shadow-lg font-bold text-lg sm:text-xl transform hover:scale-105 transition-all duration-200 hover:border-red-500/50">
              {seconds2}
            </div>
          </div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            Seconds
          </p>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="max-w-sm mx-auto">
        <div className="bg-slate-800/50 rounded-full h-1.5 overflow-hidden border border-slate-700/50">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full animate-pulse"
            style={{ width: `${Math.max(10, (timeLeft.seconds / 60) * 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Countdown in progress...</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
