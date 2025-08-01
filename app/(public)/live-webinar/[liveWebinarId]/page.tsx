import React from "react";

import { type LiveWebinar } from "@/types";
import { getWebinarById } from "@/actions/webinar.actions";
import { onAuthenticateUser } from "@/actions/auth.actions";
import RenderWebinar from "../../_components/RenderWebinar";

const LiveWebinarPage = async ({ params, searchParams }: LiveWebinar) => {
  const { liveWebinarId } = await params;
  const { error } = await searchParams;

  const webinarData = await getWebinarById(liveWebinarId);

  if (!webinarData) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center text-lg sm:text-4xl">
        Webinar Not Found
      </div>
    );
  }

  const checkUser = await onAuthenticateUser();

  const apiKey = "process.env.STREAM_API_KEY" as string;
  const token = "process.env.STREAM_TOKEN" as string;
  const callId = "process.env.STREAM_CALL_ID" as string;

  return (
    <div className="w-full min-h-screen mx-auto">
      <RenderWebinar
        apiKey={apiKey}
        token={token}
        callId={callId}
        user={checkUser.user || null}
        webinar={webinarData}
        error={error}
      />
    </div>
  );
};

export default LiveWebinarPage;
