"use server";

import { prismaClient } from "@/lib/prisma";
import { type WebinarFormState } from "@/types";
import { onAuthenticateUser } from "./auth.actions";
import { combineDateTime } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const createWebinar = async (formData: WebinarFormState) => {
  try {
    const user = await onAuthenticateUser();
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    //  TODO: Check if user has a subscription
    // if (!user.user.subscription) {
    //   return {
    //     status: 402,
    //     message: "Subscription required to create a webinar",
    //   };
    // }

    const presenterId = user.user.id;

    console.log("Creating webinar with data:", formData);

    if (!formData.basicInfo.webinarName) {
      return {
        status: 404,
        message: "Webinar name is required",
      };
    }

    if (!formData.basicInfo.date) {
      return {
        status: 404,
        message: "Webinar date is required",
      };
    }

    if (!formData.basicInfo.time) {
      return {
        status: 404,
        message: "Webinar time is required",
      };
    }

    const combinedDateTime = combineDateTime(
      formData.basicInfo.date,
      formData.basicInfo.time,
      formData.basicInfo.timeFormat || "AM"
    );

    const now = new Date();
    if (combinedDateTime < now) {
      return {
        status: 400,
        message: "Webinar date and time must be in the future",
      };
    }

    const webinar = await prismaClient.webinar.create({
      data: {
        title: formData.basicInfo.webinarName,
        description: formData.basicInfo.description,
        startTime: combinedDateTime,
        tags: formData.cta.tags || [],
        ctaLabel: formData.cta.ctaLabel,
        ctaType: formData.cta.ctaType,
        aiAgentId: formData.cta.aiAgent || null,
        priceId: formData.cta.priceId || null,
        lockChat: formData.additionalInfo.lockChat,
        couponCode: formData.additionalInfo.couponCode
          ? formData.additionalInfo.couponCode
          : null,
        presenterId: presenterId,
        couponEnabled: formData.additionalInfo.couponEnabled || false,
      },
    });

    revalidatePath("/");

    return {
      status: 200,
      message: "Webinar created successfully",
      webinarId: webinar.id,
      webinarLink: `/webinar/${webinar.id}`,
    };
  } catch (error) {
    console.log("Error creating webinar:", error);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};
