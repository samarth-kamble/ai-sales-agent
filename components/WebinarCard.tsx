import React from "react";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { PiPipeLight } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";

import { type WebinarCard } from "@/types";

const WebinarCard = ({ webinar }: WebinarCard) => {
  return (
    <div className="group flex flex-col gap-4 w-full max-w-[400px] bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/20">
      {/* Thumbnail Section */}
      <Link
        href={`/live-webinar/${webinar.id}`}
        className="relative overflow-hidden rounded-lg"
      >
        <div className="relative">
          <Image
            src={"/darkthumbnail.png"}
            alt="thumbnail"
            width={400}
            height={225}
            className="w-full h-[200px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg" />
        </div>
      </Link>

      {/* Content Section */}
      <div className="flex justify-between items-start gap-3">
        <Link
          href={`/live-webinar/${webinar.id}`}
          className="flex-1 space-y-3 group/link"
        >
          {/* Title and Description */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground leading-tight group-hover/link:text-primary transition-colors duration-200 line-clamp-2">
              {webinar?.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {webinar?.description}
            </p>
          </div>

          {/* Date Section */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 px-2 py-1 bg-muted/50 rounded-md">
              <Calendar size={14} className="text-primary" />
              <span className="font-medium">
                {format(new Date(webinar?.startTime), "dd/MM/yyyy")}
              </span>
            </div>
          </div>
        </Link>

        {/* Pipeline Button */}
        <Link
          href={"/pipeline"}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-background hover:bg-accent hover:border-primary/30 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
          title="View Pipeline"
        >
          <PiPipeLight className="w-4 h-4 text-foreground" />
        </Link>
      </div>
    </div>
  );
};

export default WebinarCard;
