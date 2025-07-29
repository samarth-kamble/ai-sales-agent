"use server";
import { prismaClient } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
      };
    }

    const userExists = await prismaClient.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    // If user already exists, return them
    if (userExists) {
      return {
        status: 200,
        user: userExists,
      };
    }

    // If user doesn't exist, create a new one
    const newUser = await prismaClient.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        name: user.firstName + " " + user.lastName,
        profileImage: user.imageUrl,
      },
    });

    if (!newUser) {
      return {
        status: 500,
        message: "Failed to create user in the database",
      };
    }

    return {
      status: 201,
      user: newUser,
    };
  } catch (error) {
    console.log("🔴 ERROR:", error);
    return {
      status: 500,
      message: "An error occurred while authenticating the user",
    };
  }
};
