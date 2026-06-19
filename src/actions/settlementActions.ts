"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function markSettlementPaid(
  formData: FormData
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const fromUserId =
    formData.get("fromUserId") as string;

  const toUserId =
    formData.get("toUserId") as string;

  const amount = Number(
    formData.get("amount")
  );

  await prisma.settlement.create({
    data: {
      fromUserId,
      toUserId,
      amount,
      isPaid: true,
    },
  });

  revalidatePath("/settlements");
}