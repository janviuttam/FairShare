"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function createExpense(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const description = formData.get("description") as string;
  const amount = Number(formData.get("amount"));
  const paidById = formData.get("paidById") as string;
  const groupId = formData.get("groupId") as string;

  await prisma.expense.create({
    data: {
      description,
      amount,
      paidById,
      groupId,
    },
  });

  revalidatePath("/expenses");
}

export async function deleteExpense(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id") as string;

  await prisma.expense.delete({
    where: {
      id,
    },
  });

  revalidatePath("/expenses");
}