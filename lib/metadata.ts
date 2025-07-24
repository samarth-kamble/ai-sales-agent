import { Metadata } from "next";

export function constructMetadata({
  title = "Spotlight-AI | AI-powered Sales Agent",
  description = "Spotlight-AI is an AI-powered sales agent that helps you find the best leads and close deals faster.",
  image = "", // Image URL
  icons = "",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@sam_kamble91",
    },
    icons,
    metadataBase: new URL("https://spotlight-ai.vercel.app"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
