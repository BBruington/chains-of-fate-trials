import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";

const webhookSecret: string = process.env.WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const payload = (await req.json()) as object;
  const payloadString = JSON.stringify(payload);

  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixIdTimeStamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixIdTimeStamp || !svixSignature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Create an object of the headers
  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixIdTimeStamp,
    "svix-signature": svixSignature,
  };

  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;
  try {
    // Verify the webhook payload and headers
    evt = wh.verify(payloadString, svixHeaders) as WebhookEvent;
  } catch (_) {
    return new Response("Error occured", {
      status: 400,
    });
  }
  const { id } = evt.data;
  const eventType = evt.type;
  
  // Handle the webhook

  if (eventType === "user.created" || eventType === "user.updated") {
    await prisma.user.upsert({
      where: { clerkId: id },
      create: {
        email: evt.data.email_addresses[0]!.email_address,
        clerkId: id!,
        username: evt.data.username,
        imgUrl: evt.data.image_url,
      },
      update: {
        email: evt.data.email_addresses[0]!.email_address,
        username: evt.data.username,
        imgUrl: evt.data.image_url,
      },
    });
    return new Response("User updated", {
      status: 201,
    });
  }

  if (eventType === "user.deleted") {
    await prisma.user.delete({
      where: { clerkId: id },
    });
    return new Response("User was deleted", {
      status: 200,
    });
  }
}
