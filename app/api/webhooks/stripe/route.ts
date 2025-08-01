import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { updateOrderToPaid } from "@/lib/actions/order.actions";

export async function POST(req: NextRequest) {
  const event = await Stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );
  if (event.type === "charge.succeeded") {
    const { object } = event.data;
    await updateOrderToPaid({
      orderId: object.metadata.orderId,
      paymentResult: {
        id: object.id,
        status: "COMPLETED",
        email_address: object.billing_details.email!,
        pricePaid: (object.amount / 100).toFixed(),
      },
    });
    return NextResponse.json({ message: "updateOrderToPaid was successful" });
  }
  return NextResponse.json({ message: "Event is not charge.successed" });
}
