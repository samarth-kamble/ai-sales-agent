"use server";

import { prismaClient } from "@/lib/prisma";
import { type WebinarFormState } from "@/types";
import { onAuthenticateUser } from "./auth.actions";
import { combineDateTime } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { WebinarStatusEnum } from "@prisma/client";

export const createWebinar = async (formData: WebinarFormState) => {
  try {
    const user = await onAuthenticateUser();
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    if (!user.user.subscription) {
      return {
        status: 402,
        message: "Subscription required to create a webinar",
      };
    }

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

export const getWebinarByPresenterId = async (presenterId: string) => {
  try {
    const webinars = await prismaClient.webinar.findMany({
      where: {
        presenterId,
      },
      include: {
        presenter: {
          select: {
            name: true,
            stripeCustomerId: true,
            id: true,
          },
        },
      },
    });

    return webinars;
  } catch (error) {
    console.log("Error getting webinars:", error);
    return [];
  }
};

export const getWebinarById = async (webinarId: string) => {
  try {
    const webinar = await prismaClient.webinar.findUnique({
      where: {
        id: webinarId,
      },
      include: {
        presenter: {
          select: {
            id: true,
            name: true,
            stripeConnectId: true,
            profileImage: true,
          },
        },
      },
    });
    return webinar;
  } catch (error) {
    console.error("Error fetching webinar", error);
    throw new Error("Error fetching webinar");
  }
};

export const changeWebinarStatus = async (
  webinarId: string,
  status: WebinarStatusEnum
) => {
  try {
    const webinar = await prismaClient.webinar.update({
      where: {
        id: webinarId,
      },
      data: {
        webinarStatus: status,
      },
    });

    return {
      status: 200,
      success: true,
      message: "Webinar status updated successfully",
      data: webinar,
    };
  } catch (error) {
    console.log("Error updating webinar status:", error);
    return {
      status: 500,
      success: false,
      message: "Internal server error",
    };
  }
};
