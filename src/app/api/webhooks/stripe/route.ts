import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing Stripe key");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-02-24.acacia",
  });

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.error();
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;

  if (!webhookSecret) {
    throw new Error("Missing Stripe webhook key");
  }

  const text = await request.text();
  const event = stripe.webhooks.constructEvent(text, signature, webhookSecret);

  switch (event.type) {
    case "checkout.session.completed": {
    }

    case "checkout.session.async_payment_failed": {
    }
  }

  const paymentIsSuccessfull = event.type === "checkout.session.completed";

  if (paymentIsSuccessfull) {
    const orderId = event.data.object.metadata?.orderId;

    if (!orderId) {
      return NextResponse.json({
        received: true,
      });
    }

    const order = await db.order.update({
      where: {
        id: Number(orderId),
      },
      data: {
        status: "IN_PREPARATION",
      },
      include: {
        restaurant: {
          select: {
            slug: true,
          },
        },
      },
    });
    revalidatePath(`${order.restaurant.slug}/menu`);
  }

  return NextResponse.json({
    received: true,
  });
}
