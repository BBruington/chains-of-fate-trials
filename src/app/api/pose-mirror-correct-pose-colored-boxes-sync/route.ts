import { NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(request: Request) {
  const { channel, event, data } = await request.json();
  console.log("pose-mirror-correct-pose-colored-boxes-sync");
  pusher.trigger(channel, event, data);

  return NextResponse.json({ success: true });
}
